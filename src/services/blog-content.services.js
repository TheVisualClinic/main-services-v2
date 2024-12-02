const { models, sequelize } = require('../models')
const axios = require('axios')
const { Op } = require('sequelize')

class BlogContentService {
  static async getBlogContent(blog_id) {
    try {
      const blog = await models.Blog.findByPk(blog_id, {
        include: [
          {
            model: models.BlogContent,
            as: 'contents',
            include: [
              { model: models.TextContent, as: 'textContent' },
              { model: models.ImageContent, as: 'imageContent' },
            ],
          },
        ],
        order: [[{ model: models.BlogContent, as: 'contents' }, 'order', 'ASC']],
      })

      if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      const formattedContents = blog.contents.map((content) => {
        const baseContent = {
          blog_content_id: content.id,
          content_type: content.content_type,
          order: content.order,
        }

        if (content.content_type === 'TEXT') {
          return {
            ...baseContent,
            content_id: content.textContent?.id || null,
            text_th: content.textContent?.text_th || null,
            text_en: content.textContent?.text_en || null,
            type: content.textContent?.type || null,
          }
        } else if (content.content_type === 'IMAGE' && content.imageContent?.type === 'image') {
          return {
            ...baseContent,
            content_id: content.imageContent?.id || null,
            image_id: content.imageContent?.image_id || null,
            image_url: content.imageContent?.image_url || null,
            alt_text_th: content.imageContent?.alt_text_th || null,
            alt_text_en: content.imageContent?.alt_text_en || null,
            type: content.imageContent?.type || null,
          }
        } else if (content.content_type === 'IMAGE' && content.imageContent?.type === 'image-2') {
          return {
            ...baseContent,
            content_id: content.imageContent?.id || null,
            image_id: content.imageContent?.image_id || null,
            image_url: content.imageContent?.image_url || null,
            alt_text_th: content.imageContent?.alt_text_th || null,
            alt_text_en: content.imageContent?.alt_text_en || null,
            image_2_id: content.imageContent?.image_2_id || null,
            image_2_url: content.imageContent?.image_2_url || null,
            alt_2_text_th: content.imageContent?.alt_2_text_th || null,
            alt_2_text_en: content.imageContent?.alt_2_text_en || null,
            type: content.imageContent?.type || null,
          }
        } else if (content.content_type === 'IMAGE' && content.imageContent?.type === 'image-3') {
          return {
            ...baseContent,
            content_id: content.imageContent?.id || null,
            image_id: content.imageContent?.image_id || null,
            image_url: content.imageContent?.image_url || null,
            alt_text_th: content.imageContent?.alt_text_th || null,
            alt_text_en: content.imageContent?.alt_text_en || null,
            image_2_id: content.imageContent?.image_2_id || null,
            image_2_url: content.imageContent?.image_2_url || null,
            alt_2_text_th: content.imageContent?.alt_2_text_th || null,
            alt_2_text_en: content.imageContent?.alt_2_text_en || null,
            image_3_id: content.imageContent?.image_3_id || null,
            image_3_url: content.imageContent?.image_3_url || null,
            alt_3_text_th: content.imageContent?.alt_3_text_th || null,
            alt_3_text_en: content.imageContent?.alt_3_text_en || null,
            type: content.imageContent?.type || null,
          }
        } else {
          console.warn(`Unsupported content type: ${content.content_type}`)
          return baseContent
        }
      })

      return formattedContents
    } catch (error) {
      console.error('Error in getBlogContent:', error.message)
      throw error
    }
  }

  static async createBlogContent(blog_id, content_type, order, type) {
    try {
      const blogContent = await models.BlogContent.create({
        blog_id,
        content_type,
        order,
      })
      if (content_type === 'TEXT') {
        await models.TextContent.create({
          blog_content_id: blogContent.id,
          blog_id: blog_id,
          type,
          text_th: type === 'bullet' || type === 'numbered' ? '[EMPTY]' : null,
          text_en: type === 'bullet' || type === 'numbered' ? '[EMPTY]' : null,
        })
      } else if (content_type === 'IMAGE') {
        await models.ImageContent.create({
          blog_content_id: blogContent.id,
          blog_id: blog_id,
          type,
        })
      }
      return blogContent
    } catch (error) {
      throw error
    }
  }

  static async deleteBlogContent(blog_content_id, blog_id) {
    const transaction = await sequelize.transaction()
    try {
      const content = await models.BlogContent.findOne({
        where: {
          id: blog_content_id,
          blog_id: blog_id,
        },
        transaction,
      })

      if (!content) {
        const error = new Error('Content not found or does not belong to the specified blog')
        error.status = 404
        throw error
      }

      const deletedOrder = content.order

      await content.destroy({ transaction })

      await models.BlogContent.update(
        { order: sequelize.literal('`order` - 1') },
        {
          where: {
            blog_id: blog_id,
            order: { [Op.gt]: deletedOrder },
          },
          transaction,
        }
      )

      await transaction.commit()
      return 'Deleted and order updated successfully'
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  static async updateOrderContent(blog_id, blog_content_id, new_order) {
    try {
      const item = await models.BlogContent.findOne({
        where: {
          id: blog_content_id,
          blog_id: blog_id,
        },
      })

      if (!item) {
        const error = new Error('Content not found')
        error.status = 404
        throw error
      }

      const old_order = item.order

      if (old_order < new_order) {
        await models.BlogContent.update(
          { order: sequelize.literal('`order` - 1') },
          {
            where: {
              blog_id: blog_id,
              order: {
                [Op.gt]: old_order,
                [Op.lte]: new_order,
              },
            },
          }
        )
      } else if (old_order > new_order) {
        await models.BlogContent.update(
          { order: sequelize.literal('`order` + 1') },
          {
            where: {
              blog_id: blog_id,
              order: {
                [Op.gte]: new_order,
                [Op.lt]: old_order,
              },
            },
          }
        )
      }

      item.order = new_order
      await item.save()

      return 'Order updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateTextContent(blog_content_id, content_id, text_th, text_en) {
    try {
      const textContent = await models.TextContent.findOne({
        where: {
          id: content_id,
          blog_content_id: blog_content_id,
        },
      })

      if (!textContent) {
        const error = new Error('TextContent not found')
        error.status = 404
        throw error
      }

      await textContent.update({
        text_th: text_th || textContent.text_th,
        text_en: text_en || textContent.text_en,
      })

      return 'Text content updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateImageContent(
    blog_content_id,
    content_id,
    image_id,
    image_url,
    alt_text_th,
    alt_text_en,
    image_2_id,
    image_2_url,
    alt_2_text_th,
    alt_2_text_en,
    image_3_id,
    image_3_url,
    alt_3_text_th,
    alt_3_text_en
  ) {
    try {
      const imageContent = await models.ImageContent.findOne({
        where: {
          id: content_id,
          blog_content_id: blog_content_id,
        },
      })

      if (!imageContent) {
        const error = new Error('ImageContent not found')
        error.status = 404
        throw error
      }

      const updateData = {}
      if (image_id !== undefined) updateData.image_id = image_id
      if (image_url !== undefined) updateData.image_url = image_url
      if (alt_text_th !== undefined) updateData.alt_text_th = alt_text_th
      if (alt_text_en !== undefined) updateData.alt_text_en = alt_text_en
      if (image_2_id !== undefined) updateData.image_2_id = image_2_id
      if (image_2_url !== undefined) updateData.image_2_url = image_2_url
      if (alt_2_text_th !== undefined) updateData.alt_2_text_th = alt_2_text_th
      if (alt_2_text_en !== undefined) updateData.alt_2_text_en = alt_2_text_en
      if (image_3_id !== undefined) updateData.image_3_id = image_3_id
      if (image_3_url !== undefined) updateData.image_3_url = image_3_url
      if (alt_3_text_th !== undefined) updateData.alt_3_text_th = alt_3_text_th
      if (alt_3_text_en !== undefined) updateData.alt_3_text_en = alt_3_text_en

      await imageContent.update(updateData)

      return 'Image content updated successfully'
    } catch (error) {
      throw error
    }
  }
}

module.exports = BlogContentService
