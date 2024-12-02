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
      const result = await models.PageReviews.findAll()
      return result
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
      const result1 = await models.BaseSocialSection.findOne({
        attributes: ['background_url'],
        order: [['id', 'DESC']],
      })

      return result1
    } catch (error) {
      throw error
    }
  }
}

module.exports = WebsiteService
