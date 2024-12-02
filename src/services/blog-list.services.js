const { models, sequelize } = require('../models')
const axios = require('axios')
const { Op } = require('sequelize')

class BlogListService {
  static async getBloglist(accessToken, page, pageSize, year, search = '') {
    try {
      const offset = (page - 1) * pageSize
      const limit = pageSize
      const whereCondition = this._buildWhereCondition(year, search)
      const { count, rows: blogs } = await models.Blog.findAndCountAll({
        where: whereCondition,
        order: [['id', 'DESC']],
        offset,
        limit,
      })
      const userProfiles = await this._fetchUserProfiles(accessToken)
      const blogList = blogs.map((blog) => this._mapBlogToResponse(blog, userProfiles))
      const totalPages = Math.ceil(count / pageSize)
      return {
        totalItems: count,
        totalPages,
        currentPage: page,
        pageSize,
        blogs: blogList,
      }
    } catch (error) {
      throw error
    }
  }

  static _buildWhereCondition(year, search) {
    const whereCondition = {}
    if (year) {
      whereCondition.create_at = sequelize.where(
        sequelize.fn('YEAR', sequelize.col('create_at')),
        year
      )
    }
    if (search) {
      whereCondition[Op.or] = [
        { title_th: { [Op.like]: `%${search}%` } },
        { title_en: { [Op.like]: `%${search}%` } },
        { description_th: { [Op.like]: `%${search}%` } },
        { description_en: { [Op.like]: `%${search}%` } },
      ]
    }
    return whereCondition
  }

  static async _fetchUserProfiles(accessToken) {
    try {
      const { data: response } = await axios.get(`${process.env.IDP_PROVIDER_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data.reduce((acc, user) => {
        acc[user.user_id] = user.profile
        return acc
      }, {})
    } catch (error) {
      throw new Error('Failed to fetch user profiles')
    }
  }

  static _mapBlogToResponse(blog, userProfiles) {
    const created_by = userProfiles[blog.user_id] || null
    return {
      id: blog.id,
      title_th: blog.title_th,
      title_en: blog.title_en,
      user_id: blog.user_id,
      created_by,
      status: blog.status,
      create_at: blog.create_at,
      last_update: blog.last_update,
      description_th: blog.description_th,
      description_en: blog.description_en,
    }
  }

  static async createDraftBlog(user_id) {
    try {
      // const mockDate = new Date()
      // mockDate.setFullYear(2023)

      const blog = await models.Blog.create({
        user_id,
        // create_at: mockDate,
        status: 'draft',
      })
      return { blog_id: blog.id }
    } catch (error) {
      throw error
    }
  }

  static async deleteBlogById(blog_id) {
    try {
      const blog = await models.Blog.findByPk(blog_id)
      if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      await blog.destroy()
      return 'Blog and related contents deleted successfully'
    } catch (error) {
      throw error
    }
  }

  static async getFilterYearsList() {
    try {
      const years = await models.Blog.findAll({
        attributes: [
          [sequelize.fn('YEAR', sequelize.col('create_at')), 'year'],
          [sequelize.fn('COUNT', sequelize.col('*')), 'blogs_count'],
        ],
        group: [sequelize.fn('YEAR', sequelize.col('create_at'))],
        order: [[sequelize.fn('YEAR', sequelize.col('create_at')), 'ASC']],
      })
      return years
    } catch (error) {
      throw error
    }
  }

  static async duplicateBlog(blog_id, user_id) {
    const transaction = await sequelize.transaction()
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
          {
            model: models.Tag,
            as: 'tags',
            through: { attributes: [] },
          },
        ],
        transaction,
      })

      if (!blog) {
        await transaction.rollback()
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      const newBlog = await models.Blog.create(
        {
          title_th: `${blog.title_th} (Copy)`,
          title_en: `${blog.title_en} (Copy)`,
          description_th: blog.description_th,
          description_en: blog.description_en,
          status: 'draft',
          header_image_id: blog.header_image_id,
          header_image_url: blog.header_image_url,
          header_image_caption: blog.header_image_caption,
          cover_image_id: blog.cover_image_id,
          cover_image_url: blog.cover_image_url,
          cover_image_caption: blog.cover_image_caption,
          user_id: user_id,
          author_fullname: blog.author_fullname,
          author_nickname: blog.author_nickname,
          author_description: blog.author_description,
          author_url: blog.author_url,
          time_to_read: blog.time_to_read,
          public_at: blog.public_at,
          table_of_content: blog.table_of_content,
          category_id: blog.category_id,
        },
        { transaction }
      )

      const blogTags = blog.tags.map((tag) => ({
        blog_id: newBlog.id,
        tag_id: tag.id,
      }))

      await models.BlogTag.bulkCreate(blogTags, { transaction })

      for (const content of blog.contents) {
        const newContent = await models.BlogContent.create(
          {
            blog_id: newBlog.id,
            content_type: content.content_type,
            order: content.order,
          },
          { transaction }
        )
        if (content.content_type === 'TEXT') {
          await models.TextContent.create(
            {
              blog_content_id: newContent.id,
              blog_id: newContent.blog_id,
              text_th: content.textContent?.text_th || null,
              text_en: content.textContent?.text_en || null,
              type: content.textContent?.type || 'text',
            },
            { transaction }
          )
        } else if (content.content_type === 'IMAGE') {
          await models.ImageContent.create(
            {
              blog_content_id: newContent.id,
              blog_id: newContent.blog_id,
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
              type: content.imageContent?.type || 'image',
            },
            { transaction }
          )
        }
      }

      await transaction.commit()
      return newBlog
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = BlogListService
