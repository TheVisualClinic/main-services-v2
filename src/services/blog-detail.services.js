const { models, sequelize } = require('../models')
const axios = require('axios')
const { Op } = require('sequelize')

class BlogDetailService {
  static async getBlogDetail(accessToken, blog_id) {
    try {
      const blog = await models.Blog.findByPk(blog_id)

      if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      let created_by = null
      try {
        const { data: response } = await axios.get(
          `${process.env.IDP_PROVIDER_URL}/api/users/by?id=${blog.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        created_by = response.data.profile || null
      } catch (error) {
        throw error
      }

      const tagList = await models.BlogTag.findAll({
        attributes: ['tag_id'],
        where: {
          blog_id,
        },
      })

      const tagListArray = tagList.map((tag) => tag.tag_id)
      return {
        id: blog.id,
        slug_th: blog.slug_th,
        slug_en: blog.slug_en,
        title_th: blog.title_th,
        title_en: blog.title_en,
        header_image_id: blog.header_image_id,
        header_image_url: blog.header_image_url,
        header_image_caption: blog.header_image_caption,
        cover_image_id: blog.cover_image_id,
        cover_image_url: blog.cover_image_url,
        cover_image_caption: blog.cover_image_caption,
        user_id: blog.user_id,
        created_by,
        status: blog.status,
        create_add: blog.create_add,
        last_update: blog.last_update,
        description_th: blog.description_th,
        description_en: blog.description_en,
        category_id: blog.category_id,
        tag_list: tagListArray,
        author: {
          full_name: blog.author_fullname,
          nick_name: blog.author_nickname,
          description: blog.author_description,
          author_url: blog.author_url,
        },
        time_to_read: blog.time_to_read,
        public_at: blog.public_at,
        table_of_content: blog.table_of_content,
      }
    } catch (error) {
      throw error
    }
  }

  static async updateBlogStatus(blog_id, new_status) {
    try {
      const blog = await models.Blog.findByPk(blog_id)
      if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      const updateData = { status: new_status }
      if (new_status === 'public') {
        updateData.public_at = new Date()
      }
      await blog.update(updateData)
      return 'Blog Status updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateHeaderImage(blog_id, header_image_id, header_image_url) {
    try {
      const blog = await models.Blog.findByPk(blog_id)
      if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      await blog.update({
        header_image_id,
        header_image_url,
      })

      return 'Header Image updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateCoverImage(blog_id, cover_image_id, cover_image_url) {
    try {
      const blog = await models.Blog.findByPk(blog_id)
      if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      await blog.update({
        cover_image_id,
        cover_image_url,
      })

      return 'Cover Image updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async updateSlug(blog_id, new_slug_th, new_slug_en) {
    try {
      const slugFormat = (slug) => {
        return slug
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z0-9ก-๙\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      }
      const formattedSlugTh = slugFormat(new_slug_th)
      const formattedSlugEn = slugFormat(new_slug_en)

      const existingBlogWithSlug = await models.Blog.findOne({
        where: { slug_th: formattedSlugTh, slug_th: formattedSlugEn },
      })
      if (existingBlogWithSlug) {
        const error = new Error('Slug is already in use')
        error.status = 409
        throw error
      }

      const blog = await models.Blog.findByPk(blog_id)
      if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      blog.slug_th = formattedSlugTh
      blog.slug_en = formattedSlugEn
      await blog.save()
      return blog
    } catch (error) {
      throw error
    }
  }

  static async updateSetting(blog_id, tag_names = null, category_id = null) {
    const createdTags = []
    const existingTags = []

    try {
      await models.BlogTag.destroy({
        where: { blog_id },
      })
      if (category_id) {
        const blog = await models.Blog.findByPk(blog_id)
        if (!blog) {
          throw new Error(`Blog with ID "${blog_id}" not found`)
        }
        blog.category_id = category_id
        await blog.save()
      }

      if (Array.isArray(tag_names) && tag_names.length > 0) {
        for (const name of tag_names) {
          let tag = await models.Tag.findOne({
            where: { name },
          })

          if (!tag) {
            tag = await models.Tag.create({ name })
            createdTags.push({ id: tag.id, name: tag.name })
          } else {
            existingTags.push({ id: tag.id, name: tag.name })
          }
          await models.BlogTag.create({
            blog_id,
            tag_id: tag.id,
          })
        }
      }
      const allTags = [...createdTags, ...existingTags]
      return {
        message: 'Tags and category updated successfully',
        Tag_lists: allTags,
        category: category_id,
      }
    } catch (error) {
      throw error
    }
  }

  static async updateTitle(
    blog_id,
    title_th,
    title_en,
    description_th,
    description_en,
    time_to_read,
    author_fullname,
    author_nickname,
    author_description,
    author_url
  ) {
    try {
      const blog = await models.Blog.findByPk(blog_id)
      if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
      }

      await blog.update({
        title_th,
        title_en,
        description_th,
        description_en,
        time_to_read,
        author_fullname,
        author_nickname,
        author_description,
        author_url,
      })

      return 'Blog Title updated successfully'
    } catch (error) {
      throw error
    }
  }

  static async getBlogPreview(accessToken, slug) {
    try {
      const blog = await models.Blog.findOne({
        where: { [Op.or]: [{ slug_th: slug }, { slug_en: slug }] },
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
        const error = new Error(`Blog with slug "${slug}" not found`)
        error.status = 404
        throw error
      }

      let formattedContents = []
      try {
        formattedContents = blog.contents.map((content) => {
          const formattedContent = {
            blog_content_id: content.id,
            content_type: content.content_type,
            order: content.order,
          }
          if (content.content_type === 'TEXT') {
            formattedContent.content_id = content.textContent?.id || null
            formattedContent.text_th = content.textContent?.text_th || null
            formattedContent.text_en = content.textContent?.text_en || null
            formattedContent.type = content.textContent?.type || null
          } else if (content.content_type === 'IMAGE') {
            formattedContent.content_id = content.imageContent?.id || null
            formattedContent.image_id = content.imageContent?.image_id || null
            formattedContent.image_url = content.imageContent?.image_url || null
            formattedContent.alt_text_th = content.imageContent?.alt_text_th || null
            formattedContent.alt_text_en = content.imageContent?.alt_text_en || null
            formattedContent.image_2_id = content.imageContent?.image_2_id || null
            formattedContent.image_2_url = content.imageContent?.image_2_url || null
            formattedContent.alt_2_text_th = content.imageContent?.alt_2_text_th || null
            formattedContent.alt_2_text_en = content.imageContent?.alt_2_text_en || null
            formattedContent.image_3_id = content.imageContent?.image_3_id || null
            formattedContent.image_3_url = content.imageContent?.image_3_url || null
            formattedContent.alt_3_text_th = content.imageContent?.alt_3_text_th || null
            formattedContent.alt_3_text_en = content.imageContent?.alt_3_text_en || null
            formattedContent.type = content.imageContent?.type || null
          }
          return formattedContent
        })
      } catch (error) {
        console.error('Error formatting blog contents:', error.message)
        throw new Error('Failed to format blog contents')
      }

      let created_by = null
      try {
        const { data: response } = await axios.get(
          `${process.env.IDP_PROVIDER_URL}/api/users/by?id=${blog.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        created_by = response.data.profile || null
      } catch (axiosError) {
        console.error('Failed to fetch author details:', axiosError.message)
        created_by = null
      }

      return {
        id: blog.id,
        title_th: blog.title_th,
        title_en: blog.title_en,
        header_image_id: blog.header_image_id,
        header_image_url: blog.header_image_url,
        header_image_caption: blog.header_image_caption,
        user_id: blog.user_id,
        created_by,
        status: blog.status,
        create_add: blog.create_add,
        last_update: blog.last_update,
        description_th: blog.description_th,
        description_en: blog.description_en,
        category_id: blog.category_id,
        author: {
          full_name: blog.author_fullname,
          nick_name: blog.author_nickname,
          description: blog.author_description,
          author_url: blog.author_url,
        },
        time_to_read: blog.time_to_read,
        public_at: blog.public_at,
        table_of_content: blog.table_of_content,
        contents: formattedContents,
      }
    } catch (error) {
      console.error('Error fetching blog preview:', error.message)
      throw error
    }
  }
}

module.exports = BlogDetailService
