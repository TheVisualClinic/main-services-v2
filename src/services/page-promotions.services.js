const { models, sequelize } = require('../models')
const { Op } = require('sequelize')
const axios = require('axios')

class PagePromotionsService {
  static async getPagePromotionsDetail() {
    try {
      const detail = await models.PagePromotions.findOne({
        order: [['id', 'ASC']],
      })

      if (!detail) {
        const error = new Error('Page Promotion not found')
        error.status = 404
        throw error
      }

      return detail
    } catch (error) {
      throw error
    }
  }

  static async updatePagePromotionsDetail(id, updatedData) {
    try {
      const detail = await models.PagePromotions.findOne({ where: { id } })

      if (!detail) {
        const error = new Error('Data not found')
        error.status = 404
        throw error
      }

      await detail.update(updatedData)
      return detail
    } catch (error) {
      throw error
    }
  }

  static async getPromotionList(PagePromotionId, accessToken) {
    try {
      const promotionItems = await models.PagePromotionsItem.findAll({
        where: { page_promotions_id: PagePromotionId },
        order: [['item_order', 'ASC']],
      })

      const userProfiles = await this._fetchUserProfiles(accessToken)
      const promotionsList = promotionItems.map((promotion) =>
        this._mapPromotionsToResponse(promotion, userProfiles)
      )

      return promotionsList
    } catch (error) {
      throw error
    }
  }

  static async getPromotionDetail(promotionId, accessToken) {
    try {
      const promotion = await models.PagePromotionsItem.findOne({
        where: { id: promotionId },
        include: [
          {
            model: models.PagePromotionsItemBenefits,
            as: 'benefits',
            order: [['benefits_order', 'ASC']],
          },
        ],
      })

      if (!promotion) {
        const error = new Error('Promotion not found')
        error.status = 404
        throw error
      }

      console.log(promotion.benefits)

      const userProfiles = await this._fetchUserProfiles(accessToken)
      const promotionDetail = this._mapBenefitsToResponse(promotion, userProfiles)

      return promotionDetail
    } catch (error) {
      throw error
    }
  }

  static async _fetchUserProfiles(accessToken) {
    try {
      const users = await models.Users.findAll({
        attributes: ['user_id', 'username', 'user_status', 'created_at'],
      })

      const result = await Promise.all(
        users.map(async (user) => {
          const [profile, contact, userRole] = await Promise.all([
            models.UsersProfile.findOne({
              where: { user_id: user.user_id },
              attributes: ['first_name', 'last_name', 'nick_name', 'gender', 'avatar_url'],
            }),
            models.UsersContact.findOne({
              where: { user_id: user.user_id },
              attributes: ['email', 'mobile_phone'],
            }),
            models.UserRole.findOne({
              where: { user_id: user.user_id },
              attributes: ['role_id'],
            }),
          ])

          const role = userRole
            ? await models.Roles.findOne({
                where: { role_id: userRole.role_id },
                attributes: ['role_id', 'name'],
              })
            : null

          return {
            ...user.toJSON(),
            profile: profile ? profile.toJSON() : null,
            contact: contact ? contact.toJSON() : null,
            role: role
              ? {
                  role_id: role.role_id,
                  name: role.name,
                }
              : null,
          }
        })
      )

      return result.reduce((acc, user) => {
        acc[user.user_id] = user.profile
        return acc
      }, {})
    } catch (error) {
      throw new Error('Failed to fetch user profiles')
    }
  }

  static _mapPromotionsToResponse(promotion, userProfiles) {
    const public_by = userProfiles[promotion.public_by] || null
    const created_by = userProfiles[promotion.created_by] || null
    const updated_by = userProfiles[promotion.updated_by] || null

    return {
      id: promotion.id,
      page_promotions_id: promotion.page_promotions_id,
      item_order: promotion.item_order,
      item_image_id: promotion.item_image_id,
      item_image_url: promotion.item_image_url,
      title_th: promotion.title_th,
      title_en: promotion.title_en,
      description_th: promotion.description_th,
      description_en: promotion.description_en,
      promotion_price: promotion.promotion_price,
      status: promotion.status,
      public_at: promotion.public_at,
      public_by,
      created_at: promotion.created_at,
      created_by,
      updated_at: promotion.updated_at,
      updated_by,
    }
  }

  static _mapBenefitsToResponse(promotion, userProfiles) {
    const public_by = userProfiles[promotion.public_by] || null
    const created_by = userProfiles[promotion.created_by] || null
    const updated_by = userProfiles[promotion.updated_by] || null

    return {
      id: promotion.id,
      page_promotions_id: promotion.page_promotions_id,
      item_order: promotion.item_order,
      item_image_id: promotion.item_image_id,
      item_image_url: promotion.item_image_url,
      title_th: promotion.title_th,
      title_en: promotion.title_en,
      description_th: promotion.description_th,
      description_en: promotion.description_en,
      promotion_price: promotion.promotion_price,
      status: promotion.status,
      public_at: promotion.public_at,
      public_by,
      created_at: promotion.created_at,
      created_by,
      updated_at: promotion.updated_at,
      updated_by,
      benefits: promotion.benefits.sort((a, b) => a.benefits_order - b.benefits_order),
    }
  }

  static async createPromotionItem(pagePromotionsId, createBy) {
    try {
      const pagePromotion = await models.PagePromotions.findOne({ where: { id: pagePromotionsId } })

      if (!pagePromotion) {
        const error = new Error('Page Promotion not found')
        error.status = 404
        throw error
      }

      const maxOrder = await models.PagePromotionsItem.max('item_order', {
        where: { page_promotions_id: pagePromotionsId },
      })

      const item = await models.PagePromotionsItem.create({
        page_promotions_id: Number(pagePromotionsId),
        item_order: (maxOrder || 0) + 1,
        item_image_id: null,
        item_image_url: null,
        title_th: `Draft Promotion ${(maxOrder || 0) + 1} TH`,
        title_en: `Draft Promotion ${(maxOrder || 0) + 1} EN`,
        description_th: null,
        description_en: null,
        promotion_price: 0,
        created_by: createBy.userId,
      })

      return item
    } catch (error) {
      throw error
    }
  }

  static async updatePromotionItem(itemId, updatedData, createBy) {
    try {
      const item = await models.PagePromotionsItem.findOne({ where: { id: itemId } })

      if (!item) {
        const error = new Error('Item not found')
        error.status = 404
        throw error
      }

      const { status } = updatedData

      const dataToUpdate = {
        ...updatedData,
        ...(status === 'public' && {
          status: 'public',
          public_at: new Date(),
          public_by: createBy.userId,
        }),
      }

      await item.update(dataToUpdate)
      return item
    } catch (error) {
      throw error
    }
  }

  static async reorderPromotionItem(itemId, newOrder) {
    try {
      const item = await models.PagePromotionsItem.findOne({ where: { id: itemId } })

      if (!item) {
        const error = new Error('Item not found')
        error.status = 404
        throw error
      }

      const oldOrder = item.item_order

      await sequelize.transaction(async (transaction) => {
        if (newOrder < oldOrder) {
          await models.PagePromotionsItem.update(
            { item_order: sequelize.literal('item_order + 1') },
            {
              where: {
                page_promotions_id: item.page_promotions_id,
                item_order: {
                  [Op.gte]: newOrder,
                  [Op.lt]: oldOrder,
                },
                id: { [Op.ne]: itemId },
              },
              transaction,
            }
          )
        } else if (newOrder > oldOrder) {
          await models.PagePromotionsItem.update(
            { item_order: sequelize.literal('item_order - 1') },
            {
              where: {
                page_promotions_id: item.page_promotions_id,
                item_order: {
                  [Op.lte]: newOrder,
                  [Op.gt]: oldOrder,
                },
                id: { [Op.ne]: itemId },
              },
              transaction,
            }
          )
        }

        await item.update({ item_order: newOrder }, { transaction })
      })

      return item
    } catch (error) {
      throw error
    }
  }

  static async deletePromotionItem(itemId) {
    try {
      const item = await models.PagePromotionsItem.findOne({ where: { id: itemId } })

      if (!item) {
        const error = new Error('Item not found')
        error.status = 404
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        await item.destroy({ transaction })

        await models.PagePromotionsItem.update(
          { item_order: sequelize.literal('item_order - 1') },
          {
            where: {
              page_promotions_id: item.page_promotions_id,
              item_order: { [Op.gt]: item.item_order },
            },
            transaction,
          }
        )
      })

      return { message: 'Item deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  static async createPromotionBenefit(pagePromotionsItemId) {
    try {
      const item = await models.PagePromotionsItem.findOne({ where: { id: pagePromotionsItemId } })

      if (!item) {
        const error = new Error('Promotion Item not found')
        error.status = 404
        throw error
      }

      const maxOrder = await models.PagePromotionsItemBenefits.max('benefits_order', {
        where: { page_promotions_item_id: pagePromotionsItemId },
      })

      const benefit = await models.PagePromotionsItemBenefits.create({
        page_promotions_item_id: pagePromotionsItemId,
        benefits_order: (maxOrder || 0) + 1,
        text_th: 'Default Benefit TH',
        text_en: 'Default Benefit EN',
      })

      return benefit
    } catch (error) {
      throw error
    }
  }

  static async updatePromotionBenefit(benefitId, updatedData) {
    try {
      const benefit = await models.PagePromotionsItemBenefits.findOne({ where: { id: benefitId } })

      if (!benefit) {
        const error = new Error('Benefit not found')
        error.status = 404
        throw error
      }

      await benefit.update(updatedData)
      return benefit
    } catch (error) {
      throw error
    }
  }

  static async reorderPromotionBenefit(benefitId, newOrder) {
    try {
      const benefit = await models.PagePromotionsItemBenefits.findOne({ where: { id: benefitId } })

      if (!benefit) {
        const error = new Error('Benefit not found')
        error.status = 404
        throw error
      }

      const oldOrder = benefit.benefits_order

      await sequelize.transaction(async (transaction) => {
        if (newOrder < oldOrder) {
          await models.PagePromotionsItemBenefits.update(
            { benefits_order: sequelize.literal('benefits_order + 1') },
            {
              where: {
                page_promotions_item_id: benefit.page_promotions_item_id,
                benefits_order: {
                  [Op.gte]: newOrder,
                  [Op.lt]: oldOrder,
                },
                id: { [Op.ne]: benefitId },
              },
              transaction,
            }
          )
        } else if (newOrder > oldOrder) {
          await models.PagePromotionsItemBenefits.update(
            { benefits_order: sequelize.literal('benefits_order - 1') },
            {
              where: {
                page_promotions_item_id: benefit.page_promotions_item_id,
                benefits_order: {
                  [Op.lte]: newOrder,
                  [Op.gt]: oldOrder,
                },
                id: { [Op.ne]: benefitId },
              },
              transaction,
            }
          )
        }

        await benefit.update({ benefits_order: newOrder }, { transaction })
      })

      return benefit
    } catch (error) {
      throw error
    }
  }

  static async deletePromotionBenefit(benefitId) {
    try {
      const benefit = await models.PagePromotionsItemBenefits.findOne({ where: { id: benefitId } })

      if (!benefit) {
        const error = new Error('Benefit not found')
        error.status = 404
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        await benefit.destroy({ transaction })

        await models.PagePromotionsItemBenefits.update(
          { benefits_order: sequelize.literal('benefits_order - 1') },
          {
            where: {
              page_promotions_item_id: benefit.page_promotions_item_id,
              benefits_order: { [Op.gt]: benefit.benefits_order },
            },
            transaction,
          }
        )
      })

      return { message: 'Benefit deleted successfully' }
    } catch (error) {
      throw error
    }
  }
}

module.exports = PagePromotionsService
