const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.config')

class Blog extends Model {}

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "Primary key, auto-incremented ID"
 *           example: 1
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: "UUID of the user who created the blog"
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         title_th:
 *           type: string
 *           description: "Title of the blog in Thai"
 *           example: "หัวข้อบทความภาษาไทย"
 *         title_en:
 *           type: string
 *           description: "Title of the blog in English"
 *           example: "Blog Title in English"
 *         description_th:
 *           type: string
 *           description: "Content of the blog in Thai"
 *           example: "เนื้อหาบทความภาษาไทย"
 *         description_en:
 *           type: string
 *           description: "Content of the blog in English"
 *           example: "Blog content in English"
 *         author_fullname:
 *           type: string
 *           description: "Full name of the author"
 *           example: "John Doe"
 *         author_nickname:
 *           type: string
 *           description: "Nickname of the author"
 *           example: "Johnny"
 *         author_description:
 *           type: string
 *           description: "Description or bio of the author"
 *           example: "An experienced writer specializing in travel blogs."
 *         author_url:
 *           type: string
 *           format: url
 *           description: "URL link to the author's profile or website"
 *           example: "https://www.example.com/author/johndoe"
 *         header_image_id:
 *           type: integer
 *           description: "ID of the header image"
 *           example: 101
 *         header_image_url:
 *           type: string
 *           format: url
 *           description: "URL to the header image for the blog post"
 *           example: "https://www.example.com/images/header.jpg"
 *         header_image_caption:
 *           type: string
 *           maxLength: 100
 *           description: "Caption for the header image"
 *           example: "A beautiful sunrise over the mountains"
 *         cover_image_id:
 *           type: integer
 *           description: "ID of the cover image"
 *           example: 102
 *         cover_image_url:
 *           type: string
 *           format: url
 *           description: "URL to the cover image for the blog post"
 *           example: "https://www.example.com/images/cover.jpg"
 *         cover_image_caption:
 *           type: string
 *           maxLength: 100
 *           description: "Caption for the cover image"
 *           example: "A scenic view of the countryside"
 *         time_to_read:
 *           type: integer
 *           description: "Estimated time to read the blog in minutes"
 *           example: 5
 *         status:
 *           type: string
 *           enum: ["draft", "public", "unpublic"]
 *           description: "Publication status of the blog"
 *           example: "draft"
 *         keyword_search_th:
 *           type: string
 *           description: "Keywords for Thai search optimization"
 *           example: "บทความ, ความงาม, การเดินทาง"
 *         keyword_search_en:
 *           type: string
 *           description: "Keywords for English search optimization"
 *           example: "beauty, travel, blog"
 *         public_at:
 *           type: string
 *           format: date-time
 *           description: "Date and time when the blog was made public"
 *           example: "2024-10-27T00:00:00Z"
 *         table_of_content:
 *           type: boolean
 *           description: "Indicates if the blog includes a table of contents"
 *           example: true
 *         slug_th:
 *           type: string
 *           description: "URL-friendly identifier for the blog"
 *           example: "blog-title-in-thai"
 *         slug_en:
 *           type: string
 *           description: "URL-friendly identifier for the blog"
 *           example: "blog-title-in-english"
 *         category_id:
 *           type: integer
 *           description: "ID of the category assigned to the blog"
 *           example: 10
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the blog was created"
 *           example: "2024-10-27T12:00:00Z"
 *         last_update:
 *           type: string
 *           format: date-time
 *           description: "Timestamp when the blog was last updated"
 *           example: "2024-10-30T15:30:00Z"
 *       required:
 *         - user_id
 *         - status
 *         - table_of_content
 */

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    title_th: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    author_fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author_nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    author_url: {
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
    header_image_caption: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cover_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cover_image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover_image_caption: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    time_to_read: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('draft', 'public', 'unpublic'),
      allowNull: false,
      defaultValue: 'draft',
    },
    keyword_search_th: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keyword_search_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    public_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    table_of_content: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    slug_th: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug_en: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'last_update',
    hooks: {
      beforeCreate: (blog) => {
        blog.slug_th = blog.slug_th || generateDraftSlugTh()
        blog.slug_en = blog.slug_en || generateDraftSlugEn()
        blog.keyword_search_th = `${blog.title_th || ''} ${blog.description_th || ''}`.trim()
        blog.keyword_search_en = `${blog.title_en || ''} ${blog.description_en || ''}`.trim()
      },
      beforeUpdate: (blog) => {
        blog.keyword_search_th = `${blog.title_th || ''} ${blog.description_th || ''}`.trim()
        blog.keyword_search_en = `${blog.title_en || ''} ${blog.description_en || ''}`.trim()
      },
    },
  }
)

const generateDraftSlugTh = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `draft-th-${year}${month}${day}${hours}${minutes}${seconds}`
}

const generateDraftSlugEn = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `draft-en-${year}${month}${day}${hours}${minutes}${seconds}`
}

module.exports = Blog
