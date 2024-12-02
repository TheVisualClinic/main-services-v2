const { models, sequelize } = require('../models')
const { Op } = require('sequelize')

class PageReviewsService {
  static async getPageReviewsDetail() {
    try {
      const detail = await models.PageReviews.findOne()

      if (!detail) {
        const error = new Error('Data not found')
        error.status = 404
        throw error
      }

      return detail
    } catch (error) {
      throw error
    }
  }

  static async updatePageReviewsDetail(id, updatedData) {
    try {
      const detail = await models.PageReviews.findOne({ where: { id } })

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

  static async getGroupList(reviewPageId) {
    try {
      const reviewGroups = await models.PageReviewsGroup.findAll({
        where: { review_page_id: reviewPageId },
        include: [
          {
            model: models.PageReviewsGroupItems,
            as: 'items',
            attributes: [],
          },
        ],
        attributes: {
          include: [[sequelize.fn('COUNT', sequelize.col('items.id')), 'review_item_count']],
        },
        group: ['PageReviewsGroup.id'],
        order: [['group_order', 'ASC']],
      })

      return reviewGroups
    } catch (error) {
      throw error
    }
  }

  static async getReviewsList(reviewGroupId) {
    try {
      const reviewGroups = await models.PageReviewsGroup.findOne({
        where: { id: reviewGroupId },
      })

      const reviewGroupItems = await models.PageReviewsGroupItems.findAll({
        where: { review_page_group_id: reviewGroupId },
        order: [['item_order', 'ASC']],
      })
      return {
        group_detail: reviewGroups,
        review_list: reviewGroupItems,
      }
    } catch (error) {
      throw error
    }
  }

  static async createGroup(reviewPageId) {
    try {
      const pageReview = await models.PageReviews.findOne({ where: { id: reviewPageId } })

      if (!pageReview) {
        const error = new Error('Page Review not found')
        error.status = 404
        throw error
      }

      const maxOrder = await models.PageReviewsGroup.max('group_order', {
        where: { review_page_id: reviewPageId },
      })

      const group = await models.PageReviewsGroup.create({
        review_page_id: reviewPageId,
        group_order: (maxOrder || 0) + 1,
        group_name_th: 'Default Group Name',
        group_name_en: 'Default Group Name',
      })

      return group
    } catch (error) {
      throw error
    }
  }

  static async updateGroup(groupId, updatedData) {
    try {
      const group = await models.PageReviewsGroup.findOne({ where: { id: groupId } })

      if (!group) {
        const error = new Error('Group not found')
        error.status = 404
        throw error
      }

      await group.update(updatedData)
      return group
    } catch (error) {
      throw error
    }
  }

  static async reorderGroup(groupId, newOrder) {
    try {
      const group = await models.PageReviewsGroup.findOne({ where: { id: groupId } })

      if (!group) {
        const error = new Error('Group not found')
        error.status = 404
        throw error
      }

      const currentOrder = group.group_order

      if (currentOrder === newOrder) {
        return group
      }

      await sequelize.transaction(async (transaction) => {
        if (currentOrder < newOrder) {
          await models.PageReviewsGroup.update(
            { group_order: sequelize.literal('group_order - 1') },
            {
              where: {
                review_page_id: group.review_page_id,
                group_order: { [Op.gt]: currentOrder, [Op.lte]: newOrder },
              },
              transaction,
            }
          )
        } else {
          await models.PageReviewsGroup.update(
            { group_order: sequelize.literal('group_order + 1') },
            {
              where: {
                review_page_id: group.review_page_id,
                group_order: { [Op.gte]: newOrder, [Op.lt]: currentOrder },
              },
              transaction,
            }
          )
        }

        await group.update({ group_order: newOrder }, { transaction })
      })

      return group
    } catch (error) {
      throw error
    }
  }

  static async deleteGroup(groupId) {
    try {
      const group = await models.PageReviewsGroup.findOne({ where: { id: groupId } })

      if (!group) {
        const error = new Error('Group not found')
        error.status = 404
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        await group.destroy({ transaction })

        await models.PageReviewsGroup.update(
          { group_order: sequelize.literal('group_order - 1') },
          {
            where: {
              review_page_id: group.review_page_id,
              group_order: { [Op.gt]: group.group_order },
            },
            transaction,
          }
        )
      })

      return { message: 'Group deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  static async createGroupItem(groupId) {
    try {
      const group = await models.PageReviewsGroup.findOne({ where: { id: groupId } })

      if (!group) {
        const error = new Error('Group not found')
        error.status = 404
        throw error
      }

      const maxOrder = await models.PageReviewsGroupItems.max('item_order', {
        where: { review_page_group_id: groupId },
      })

      const item = await models.PageReviewsGroupItems.create({
        review_page_group_id: groupId,
        item_order: (maxOrder || 0) + 1,
        item_image_id: null,
        item_image_url: null,
      })

      return item
    } catch (error) {
      throw error
    }
  }

  static async updateGroupItem(itemId, updatedData) {
    try {
      const item = await models.PageReviewsGroupItems.findOne({ where: { id: itemId } })

      if (!item) {
        const error = new Error('Item not found')
        error.status = 404
        throw error
      }

      await item.update(updatedData)
      return item
    } catch (error) {
      throw error
    }
  }

  static async reorderGroupItem(itemId, newOrder) {
    try {
      const item = await models.PageReviewsGroupItems.findOne({ where: { id: itemId } })

      if (!item) {
        const error = new Error('Item not found')
        error.status = 404
        throw error
      }

      const currentOrder = item.item_order

      if (currentOrder === newOrder) {
        return item
      }

      await sequelize.transaction(async (transaction) => {
        if (currentOrder < newOrder) {
          await models.PageReviewsGroupItems.update(
            { item_order: sequelize.literal('item_order - 1') },
            {
              where: {
                review_page_group_id: item.review_page_group_id,
                item_order: { [Op.gt]: currentOrder, [Op.lte]: newOrder },
              },
              transaction,
            }
          )
        } else {
          await models.PageReviewsGroupItems.update(
            { item_order: sequelize.literal('item_order + 1') },
            {
              where: {
                review_page_group_id: item.review_page_group_id,
                item_order: { [Op.gte]: newOrder, [Op.lt]: currentOrder },
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

  static async deleteGroupItem(itemId) {
    try {
      const item = await models.PageReviewsGroupItems.findOne({ where: { id: itemId } })

      if (!item) {
        const error = new Error('Item not found')
        error.status = 404
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        await item.destroy({ transaction })

        await models.PageReviewsGroupItems.update(
          { item_order: sequelize.literal('item_order - 1') },
          {
            where: {
              review_page_group_id: item.review_page_group_id,
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
}

module.exports = PageReviewsService
