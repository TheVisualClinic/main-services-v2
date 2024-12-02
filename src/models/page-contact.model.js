const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class PageContact extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     PageContact:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the Page Contact
 *           example: 1
 *         caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: The caption in Thai
 *           example: "ติดต่อเรา"
 *         caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: The caption in English
 *           example: "Contact Us"
 *         title_th:
 *           type: string
 *           nullable: true
 *           description: The title in Thai
 *           example: "ช่องทางการติดต่อ"
 *         title_en:
 *           type: string
 *           nullable: true
 *           description: The title in English
 *           example: "Contact Information"
 *         header_image_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the header image
 *           example: 101
 *         header_image_url:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The URL of the header image
 *           example: "https://example.com/header.jpg"
 *         content_caption_th:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: The content caption in Thai
 *           example: "เนื้อหาเกี่ยวกับเรา"
 *         content_caption_en:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: The content caption in English
 *           example: "About our content"
 *         content_title_th:
 *           type: string
 *           nullable: true
 *           description: The content title in Thai
 *           example: "หัวข้อเนื้อหา"
 *         content_title_en:
 *           type: string
 *           nullable: true
 *           description: The content title in English
 *           example: "Content Title"
 *         address_th:
 *           type: string
 *           nullable: true
 *           description: The address in Thai
 *           example: "123 หมู่บ้าน ABC กรุงเทพฯ"
 *         address_en:
 *           type: string
 *           nullable: true
 *           description: The address in English
 *           example: "123 ABC Village, Bangkok"
 *         phone_number:
 *           type: string
 *           maxLength: 50
 *           nullable: true
 *           description: The phone number
 *           example: "+66-123-456-789"
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 250
 *           nullable: true
 *           description: The email address
 *           example: "contact@example.com"
 *         opening_hours_th:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: The opening hours in Thai
 *           example: "เปิดทุกวัน 9:00 น. - 18:00 น."
 *         opening_hours_en:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: The opening hours in English
 *           example: "Open daily 9:00 AM - 6:00 PM"
 *         google_map:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: The Google Map link or embed URL
 *           example: "https://www.google.com/maps/embed?pb=!1m18..."
 *         social_title_th:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: The social media title in Thai
 *           example: "ติดตามเรา"
 *         social_title_en:
 *           type: string
 *           maxLength: 250
 *           nullable: true
 *           description: The social media title in English
 *           example: "Follow Us"
 *         social_facebook_label:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: The label for the Facebook link
 *           example: "Facebook"
 *         social_facebook_link:
 *           type: string
 *           format: uri
 *           maxLength: 250
 *           nullable: true
 *           description: The Facebook link
 *           example: "https://facebook.com/yourpage"
 *         social_instagram_label:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: The label for the Instagram link
 *           example: "Instagram"
 *         social_instagram_link:
 *           type: string
 *           format: uri
 *           maxLength: 250
 *           nullable: true
 *           description: The Instagram link
 *           example: "https://instagram.com/yourpage"
 *         social_tiktok_label:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: The label for the TikTok link
 *           example: "TikTok"
 *         social_tiktok_link:
 *           type: string
 *           format: uri
 *           maxLength: 250
 *           nullable: true
 *           description: The TikTok link
 *           example: "https://tiktok.com/@yourpage"
 *         social_line_label:
 *           type: string
 *           maxLength: 100
 *           nullable: true
 *           description: The label for the Line link
 *           example: "Line"
 *         social_line_link:
 *           type: string
 *           format: uri
 *           maxLength: 250
 *           nullable: true
 *           description: The Line link
 *           example: "https://line.me/ti/p/yourlineid"
 *       required:
 *         - id
 */

PageContact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caption_th: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    caption_en: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    title_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    header_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    header_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content_caption_th: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    content_caption_en: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    content_title_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content_title_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    opening_hours_th: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    opening_hours_en: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    google_map: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    social_title_th: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    social_title_en: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    social_facebook_label: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    social_facebook_link: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    social_instagram_label: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    social_instagram_link: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    social_tiktok_label: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    social_tiktok_link: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    social_line_label: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    social_line_link: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PageContact',
    tableName: 'page_contact',
    timestamps: false,
    hooks: {
      async afterSync() {
        const count = await PageContact.count()
        if (count === 0) {
          await PageContact.create({})
        }
      },
    },
  }
)

module.exports = PageContact
