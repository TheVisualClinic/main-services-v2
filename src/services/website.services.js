const { models } = require('../models')
const { Op } = require('sequelize')

class WebsiteService {
  static async getFooterData() {
    try {
      const result = await models.PageContact.findOne({
        attributes: [
          'phone_number',
          'email',
          'social_facebook_label',
          'social_facebook_link',
          'social_instagram_label',
          'social_instagram_link',
          'social_tiktok_label',
          'social_tiktok_link',
          'social_line_label',
          'social_line_link',
        ],
        order: [['id', 'DESC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getContactPageData() {
    try {
      const result = await models.PageContact.findOne({
        attributes: [
          'caption_th',
          'caption_en',
          'title_th',
          'title_en',
          'header_image_url',
          'content_caption_th',
          'content_caption_en',
          'content_title_th',
          'content_title_en',
          'address_th',
          'address_en',
          'opening_hours_th',
          'opening_hours_en',
          'google_map',
          'social_title_th',
          'social_title_en',
        ],
        order: [['id', 'DESC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getReviewsPageData() {
    try {
      const result = await models.PageReviews.findOne({
        attributes: [
          'caption_th',
          'caption_en',
          'title_th',
          'title_en',
          'header_image_url',
          'top_review_image_url',
          'top_review_message_th',
          'top_review_message_en',
          'top_review_rating',
          'top_review_caption_th',
          'top_review_caption_en',
          'top_review_nick_name_th',
          'top_review_nick_name_en',
          'top_review_shot_message_th',
          'top_review_shot_message_en',
          'reviews_section_caption_th',
          'reviews_section_caption_en',
        ],
        order: [['id', 'DESC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getReviewsBannerData() {
    try {
      const result = await models.PageReviews.findOne({
        attributes: [
          'sub_review_caption_th',
          'sub_review_caption_en',
          'sub_review_1_rating',
          'sub_review_1_message_th',
          'sub_review_1_message_en',
          'sub_review_1_nick_name_th',
          'sub_review_1_nick_name_en',
          'sub_review_2_rating',
          'sub_review_2_message_th',
          'sub_review_2_message_en',
          'sub_review_2_nick_name_th',
          'sub_review_2_nick_name_en',
          'sub_review_3_rating',
          'sub_review_3_message_th',
          'sub_review_3_message_en',
          'sub_review_3_nick_name_th',
          'sub_review_3_nick_name_en',
        ],
        order: [['id', 'DESC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getReviewList() {
    try {
      const reviewGroups = await models.PageReviewsGroup.findAll({
        attributes: ['group_name_th', 'group_name_en'],
        include: [
          {
            model: models.PageReviewsGroupItems,
            as: 'items',
            attributes: ['item_image_url'],
            separate: true,
            order: [['item_order', 'ASC']],
          },
        ],
        order: [['group_order', 'ASC']],
      })

      return reviewGroups
    } catch (error) {
      throw error
    }
  }

  static async getBlogsPageData() {
    try {
      const result = await models.PageBlogs.findOne({
        attributes: ['header_image_url'],
        order: [['id', 'DESC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getSocialBannerData() {
    try {
      const baseSocial = await models.BaseSocialSection.findOne({
        attributes: ['background_url'],
        order: [['id', 'DESC']],
      })

      const pageContact = await models.PageContact.findOne({
        attributes: ['social_title_th', 'social_title_en'],
        order: [['id', 'DESC']],
      })

      return {
        background_url: baseSocial.background_url,
        social_title_th: pageContact.social_title_th,
        social_title_en: pageContact.social_title_en,
      }
    } catch (error) {
      throw error
    }
  }

  static async getLastPromotions() {
    try {
      const result = await models.PagePromotionsItem.findAll({
        where: {
          status: 'public',
        },
        attributes: [
          'item_image_url',
          'title_th',
          'title_en',
          'description_th',
          'description_en',
          'promotion_price',
        ],
        include: [
          {
            model: models.PagePromotionsItemBenefits,
            as: 'benefits',
            attributes: ['text_th', 'text_en'],
            separate: true,
            order: [['benefits_order', 'ASC']],
          },
        ],
        order: [['id', 'DESC']],
        limit: 5,
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getAboutOurServices() {
    try {
      const result = await models.Service.findAll({
        where: {
          status: 'public',
        },
        attributes: ['service_name_th', 'service_name_en', 'slug_th', 'slug_en'],
        order: [['id', 'DESC']],
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getBlogTagsList() {
    try {
      const blogTagIds = await models.BlogTag.findAll({
        attributes: ['tag_id'],
        group: ['tag_id'],
        raw: true,
      })

      const tagIds = blogTagIds.map((tag) => tag.tag_id)

      const tagList = await models.Tag.findAll({
        where: {
          id: tagIds,
        },
        attributes: ['id', 'name'],
      })

      return tagList
    } catch (error) {
      throw error
    }
  }

  static async getBlogList(search = '', limit = 12, offset = 0) {
    try {
      const isTagSearch = search.startsWith('#')
      let blogs

      if (isTagSearch) {
        const tagText = search.slice(1)
        const tag = await models.Tag.findOne({
          where: { name: tagText },
          attributes: ['id'],
        })

        if (!tag) {
          return []
        }

        const blogTags = await models.BlogTag.findAll({
          where: { tag_id: tag.id },
          attributes: ['blog_id'],
        })

        const blogIds = blogTags.map((blogTag) => blogTag.blog_id)

        if (blogIds.length === 0) {
          return []
        }

        blogs = await models.Blog.findAll({
          where: {
            id: blogIds,
            status: 'public',
          },
          attributes: [
            'cover_image_url',
            'title_th',
            'title_en',
            'description_th',
            'description_en',
            'slug_th',
            'slug_en',
          ],
          include: [
            {
              model: models.Tag,
              as: 'tags',
              attributes: ['name'],
              through: {
                attributes: [],
              },
            },
          ],
          limit,
          offset,
          order: [['id', 'DESC']],
        })
      } else {
        blogs = await models.Blog.findAll({
          where: {
            status: 'public',
            [Op.or]: [
              { title_th: { [Op.like]: `%${search}%` } },
              { title_en: { [Op.like]: `%${search}%` } },
              { description_th: { [Op.like]: `%${search}%` } },
              { description_en: { [Op.like]: `%${search}%` } },
            ],
          },
          attributes: [
            'cover_image_url',
            'title_th',
            'title_en',
            'description_th',
            'description_en',
            'slug_th',
            'slug_en',
          ],
          include: [
            {
              model: models.Tag,
              as: 'tags',
              attributes: ['name'],
              through: {
                attributes: [],
              },
            },
          ],
          limit,
          offset,
          order: [['id', 'DESC']],
        })
      }

      return blogs
    } catch (error) {
      throw error
    }
  }

  static async getBlogDetailBySlug(slug) {
    try {
      const blog = await models.Blog.findOne({
        where: { status: 'public', [Op.or]: [{ slug_th: slug }, { slug_en: slug }] },
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
          const formattedContent = {}
          if (content.content_type === 'TEXT') {
            formattedContent.text_th = content.textContent?.text_th || null
            formattedContent.text_en = content.textContent?.text_en || null
            formattedContent.type = content.textContent?.type || null
          } else if (content.content_type === 'IMAGE' && content.imageContent?.type === 'image') {
            formattedContent.image_url = content.imageContent?.image_url || null
            formattedContent.alt_text_th = content.imageContent?.alt_text_th || null
            formattedContent.alt_text_en = content.imageContent?.alt_text_en || null
            formattedContent.type = content.imageContent?.type || null
          } else if (content.content_type === 'IMAGE' && content.imageContent?.type === 'image-2') {
            formattedContent.image_url = content.imageContent?.image_url || null
            formattedContent.alt_text_th = content.imageContent?.alt_text_th || null
            formattedContent.alt_text_en = content.imageContent?.alt_text_en || null
            formattedContent.image_2_url = content.imageContent?.image_2_url || null
            formattedContent.alt_2_text_th = content.imageContent?.alt_2_text_th || null
            formattedContent.alt_2_text_en = content.imageContent?.alt_2_text_en || null
            formattedContent.type = content.imageContent?.type || null
          } else if (content.content_type === 'IMAGE' && content.imageContent?.type === 'image-3') {
            formattedContent.image_url = content.imageContent?.image_url || null
            formattedContent.alt_text_th = content.imageContent?.alt_text_th || null
            formattedContent.alt_text_en = content.imageContent?.alt_text_en || null
            formattedContent.image_2_url = content.imageContent?.image_2_url || null
            formattedContent.alt_2_text_th = content.imageContent?.alt_2_text_th || null
            formattedContent.alt_2_text_en = content.imageContent?.alt_2_text_en || null
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

      return {
        title_th: blog.title_th,
        title_en: blog.title_en,
        header_image_url: blog.header_image_url,
        create_add: blog.create_add,
        author: {
          full_name: blog.author_fullname,
          nick_name: blog.author_nickname,
          author_url: blog.author_url,
        },
        time_to_read: blog.time_to_read,
        public_at: blog.public_at,
        contents: formattedContents,
      }
    } catch (error) {
      console.error('Error fetching blog preview:', error.message)
      throw error
    }
  }

  static async getLastArticle(notSlug = '', limit = 8) {
    try {
      const blogs = await models.Blog.findAll({
        where: {
          status: 'public',
          [Op.and]: [{ slug_th: { [Op.ne]: notSlug } }, { slug_en: { [Op.ne]: notSlug } }],
        },
        attributes: [
          'id',
          'cover_image_url',
          'title_th',
          'title_en',
          'description_th',
          'description_en',
          'slug_th',
          'slug_en',
        ],
        limit,
        order: [['id', 'DESC']],
      })

      return blogs
    } catch (error) {
      throw error
    }
  }

  static async getPromotionsPageData() {
    try {
      const result = await models.PagePromotions.findOne({
        attributes: ['caption_th', 'caption_en', 'title_th', 'title_en'],
        order: [['id', 'DESC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getCaptionBannerData() {
    try {
      const result = await models.BaseCaptionSection.findOne({
        attributes: ['background_url', 'title_th', 'title_en', 'content_th', 'content_en'],
        order: [['id', 'ASC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getPromotionsList() {
    try {
      const result = await models.PagePromotionsItem.findAll({
        where: {
          status: 'public',
        },
        attributes: [
          'item_image_url',
          'title_th',
          'title_en',
          'description_th',
          'description_en',
          'promotion_price',
        ],
        include: [
          {
            model: models.PagePromotionsItemBenefits,
            attributes: ['text_th', 'text_en'],
            as: 'benefits',
            separate: true,
            order: [['benefits_order', 'ASC']],
          },
        ],
        order: [['item_order', 'ASC']],
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getHomePageData() {
    try {
      const result = await models.PageHome.findOne({
        attributes: [
          'hero_image_url',
          'hero_slogan_th',
          'hero_slogan_en',
          'hero_content_th',
          'hero_content_en',
          'section_medical_team_caption_th',
          'section_medical_team_caption_en',
          'section_medical_team_title_th',
          'section_medical_team_title_en',
          'middle_image_url',
          'section_vdo_slogan',
          'section_vdo_content_th',
          'section_vdo_content_en',
          'section_vdo_link',
          'section_services_caption_th',
          'section_services_caption_en',
          'section_services_title_th',
          'section_services_title_en',
        ],
        order: [['id', 'ASC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getAboutBannerData() {
    try {
      const result = await models.BaseAboutSection.findOne({
        attributes: [
          'background_url',
          'caption_th',
          'caption_en',
          'title_th',
          'title_en',
          'icon_1_url',
          'icon_1_caption_th',
          'icon_1_caption_en',
          'icon_2_url',
          'icon_2_caption_th',
          'icon_2_caption_en',
          'icon_3_url',
          'icon_3_caption_th',
          'icon_3_caption_en',
        ],
        order: [['id', 'ASC']],
      })
      return result
    } catch (error) {
      throw error
    }
  }

  static async getServicesList() {
    try {
      const services = await models.Service.findAll({
        where: {
          status: 'public',
        },
        attributes: [
          'service_name_th',
          'service_name_en',
          'service_price',
          'cover_description_th',
          'cover_description_en',
          'cover_image_url',
          'slug_th',
          'slug_en',
          'category_id',
        ],
        order: [['id', 'ASC']],
      })

      const categories = await models.Category.findAll({
        attributes: ['id', 'name_th', 'name_en'],
      })

      const result = services.map((service) => {
        const category = categories.find((cat) => cat.id === service.category_id)
        return {
          ...service.toJSON(),
          category: category || null,
        }
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getDoctorList() {
    try {
      const result = await models.PageMedicalTeamDoctor.findAll({
        attributes: [
          'doctor_image_url',
          'name_prefix_th',
          'name_prefix_en',
          'first_name_th',
          'first_name_en',
          'last_name_th',
          'last_name_en',
          'nick_name_th',
          'nick_name_en',
        ],
        order: [['doctor_order', 'ASC']],
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getServicesPageData() {
    try {
      const result = await models.PageServices.findOne({
        attributes: ['caption_th', 'caption_en', 'title_th', 'title_en'],
        order: [['id', 'DESC']],
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getPartnerBannerData() {
    try {
      const result = await models.BasePartnerSection.findOne({
        attributes: ['title_th', 'title_en', 'image_sm_url', 'image_md_url', 'image_lg_url'],
        order: [['id', 'DESC']],
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getAboutUsPageData() {
    try {
      const result = await models.PageAboutUs.findOne({
        attributes: [
          'caption_th',
          'caption_en',
          'slogan',
          'description_th',
          'description_en',
          'header_image_url',
          'about_clinic_image_url',
          'about_clinic_title_th',
          'about_clinic_title_en',
          'about_clinic_content_th',
          'about_clinic_content_en',
          'about_clinic_year_of_service',
          'about_clinic_total_service',
          'about_clinic_satisfied_customers',
          'section_medical_team_caption_th',
          'section_medical_team_caption_en',
          'section_medical_team_title_th',
          'section_medical_team_title_en',
        ],
        order: [['id', 'DESC']],
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getMedicalTeamPageData() {
    try {
      const result = await models.PageMedicalTeam.findOne({
        attributes: [
          'caption_th',
          'caption_en',
          'title_th',
          'title_en',
          'header_image_url',
          'section_certificates_caption_th',
          'section_certificates_caption_en',
          'section_certificates_title_th',
          'section_certificates_title_en',
          'section_certificates_main_image_url',
          'section_pride_caption_th',
          'section_pride_caption_en',
          'section_pride_title_th',
          'section_pride_title_en',
        ],
        include: [
          {
            model: models.PageMedicalTeamCertificates,
            as: 'certificates',
            attributes: ['image_url'],
            separate: true,
            order: [['certificate_order', 'ASC']],
          },
          {
            model: models.PageMedicalTeamPride,
            as: 'prides',
            attributes: ['image_url'],
            separate: true,
            order: [['pride_order', 'ASC']],
          },
        ],
        order: [['id', 'DESC']],
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getDoctorDetailList() {
    try {
      const result = await models.PageMedicalTeamDoctor.findAll({
        attributes: [
          'doctor_image_url',
          'name_prefix_th',
          'name_prefix_en',
          'first_name_th',
          'first_name_en',
          'last_name_th',
          'last_name_en',
          'nick_name_th',
          'nick_name_en',
          'doctor_slogan_th',
          'doctor_slogan_en',
        ],
        include: [
          {
            model: models.PageMedicalTeamDoctorSkills,
            as: 'skills',
            attributes: ['text_th', 'text_en'],
            separate: true,
            order: [['skill_order', 'ASC']],
          },
          {
            model: models.PageMedicalTeamDoctorSchool,
            as: 'schools',
            attributes: ['text_th', 'text_en'],
            separate: true,
            order: [['school_order', 'ASC']],
          },
          {
            model: models.PageMedicalTeamDoctorCertificates,
            as: 'certificates',
            attributes: ['text_th', 'text_en'],
            separate: true,
            order: [['certificate_order', 'ASC']],
          },
        ],
        order: [['doctor_order', 'ASC']],
      })

      return result
    } catch (error) {
      throw error
    }
  }

  static async getServiceDetailBySlug(slug) {
    try {
      const service = await models.Service.findOne({
        where: { [Op.or]: [{ slug_th: slug }, { slug_en: slug }] },
        attributes: ['id', 'header_image_url'],
        include: [
          {
            model: models.ServiceContent,
            as: 'service_content',
            include: [
              { model: models.ServiceTextContent, as: 'service_text_content' },
              { model: models.ServiceImageContent, as: 'service_image_content' },
            ],
          },
        ],
        order: [[{ model: models.ServiceContent, as: 'service_content' }, 'order', 'ASC']],
      })

      if (!service) {
        const error = new Error(`Service with slug "${slug}" not found`)
        error.status = 404
        throw error
      }

      let formattedContents = []
      try {
        formattedContents = service.service_content.map((content) => {
          const formattedContent = {}
          if (content.content_type === 'TEXT') {
            formattedContent.text_th = content.service_text_content?.text_th || null
            formattedContent.text_en = content.service_text_content?.text_en || null
            formattedContent.type = content.service_text_content?.type || null
          } else if (
            content.content_type === 'IMAGE' &&
            content.service_image_content?.type === 'image'
          ) {
            formattedContent.image_url = content.service_image_content?.image_url || null
            formattedContent.alt_text_th = content.service_image_content?.alt_text_th || null
            formattedContent.alt_text_en = content.service_image_content?.alt_text_en || null
            formattedContent.type = content.service_image_content?.type || null
          } else if (
            content.content_type === 'IMAGE' &&
            content.service_image_content?.type === 'image-2'
          ) {
            formattedContent.image_url = content.service_image_content?.image_url || null
            formattedContent.alt_text_th = content.service_image_content?.alt_text_th || null
            formattedContent.alt_text_en = content.service_image_content?.alt_text_en || null
            formattedContent.image_2_url = content.service_image_content?.image_2_url || null
            formattedContent.alt_2_text_th = content.service_image_content?.alt_2_text_th || null
            formattedContent.alt_2_text_en = content.service_image_content?.alt_2_text_en || null
            formattedContent.type = content.service_image_content?.type || null
          } else if (
            content.content_type === 'IMAGE' &&
            content.service_image_content?.type === 'image-3'
          ) {
            formattedContent.image_url = content.service_image_content?.image_url || null
            formattedContent.alt_text_th = content.service_image_content?.alt_text_th || null
            formattedContent.alt_text_en = content.service_image_content?.alt_text_en || null
            formattedContent.image_2_url = content.service_image_content?.image_2_url || null
            formattedContent.alt_2_text_th = content.service_image_content?.alt_2_text_th || null
            formattedContent.alt_2_text_en = content.service_image_content?.alt_2_text_en || null
            formattedContent.image_3_url = content.service_image_content?.image_3_url || null
            formattedContent.alt_3_text_th = content.service_image_content?.alt_3_text_th || null
            formattedContent.alt_3_text_en = content.service_image_content?.alt_3_text_en || null
            formattedContent.type = content.service_image_content?.type || null
          }
          return formattedContent
        })
      } catch (error) {
        throw error
      }

      const faqs = await models.PageServiceFaq.findAll({
        attributes: ['faq_order', 'title_th', 'title_en', 'description_th', 'description_en'],
        where: {
          service_id: service.id,
        },
        order: [['faq_order', 'ASC']],
      })

      return {
        id: service.id,
        service_name_th: service.service_name_th,
        service_name_en: service.service_name_en,
        header_image_id: service.header_image_id,
        header_image_url: service.header_image_url,
        contents: formattedContents,
        faq_list: faqs,
      }
    } catch (error) {
      throw error
    }
  }

  static async getServicesSitemap() {
    try {
      const services = await models.Service.findAll({
        where: {
          status: 'public',
        },
        attributes: ['slug_th', 'slug_en', 'public_at'],
        order: [['id', 'DESC']],
      })
      return services
    } catch (error) {
      throw error
    }
  }

  static async getBlogsSitemap() {
    try {
      const blogs = await models.Blog.findAll({
        where: {
          status: 'public',
        },
        attributes: ['slug_th', 'slug_en', 'public_at'],
        order: [['id', 'DESC']],
      })
      return blogs
    } catch (error) {
      throw error
    }
  }
}

module.exports = WebsiteService
