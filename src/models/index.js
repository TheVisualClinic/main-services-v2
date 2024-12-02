const { sequelize } = require('../config/database.config')
const logger = require('../utils/logger')

// Auth Model
const Users = require('./users.model')
const RefreshToken = require('./refreshToken.model')
const UsersProfile = require('./usersProfile.model')
const UsersContact = require('./usersContact.model')
const UserRole = require('./userRole.model')
const UserPermission = require('./userPermission.model')
const Roles = require('./roles.model')
const Permissions = require('./permissions.model')
const InviteStaff = require('./inviteStaff.model')
const OTPHistory = require('./otpHistory.model')

// Storage Model
const UserAvatars = require('./userAvatar.model')
const PublicStorage = require('./publicStorage.model')
const PageStorage = require('./pageStorage.model')
const BlogStorage = require('./blogStorage.model')

// Main Model
const Category = require('./category.model')
const Tag = require('./tag.model')
const Blog = require('./blog.model')
const BlogContent = require('./blogContent.model')
const TextContent = require('./textContent.model')
const ImageContent = require('./imgContent.model')
const BlogImgStorage = require('./blogImgStorage.model')
const PageImgStorage = require('./pageImgStorage.model')
const BlogTag = require('./blogTag.model')
const BlogCategory = require('./blogCategory.model')
const Service = require('./service.model')
const ServiceContent = require('./serviceContent.model')
const ServiceTextContent = require('./serviceTextContent.model')
const ServiceImageContent = require('./serviceImgContent.model')
const PageServiceFaq = require('./pageServiceFaq.model')
const BaseAboutSection = require('./base-about-section.model')
const BasePartnerSection = require('./base-partner-section.model')
const BaseCaptionSection = require('./base-caption-section.model')
const BaseSocialSection = require('./base-social-section.model')
const PageContact = require('./page-contact.model')
const PageBlogs = require('./page-blogs.model')
const PageReviews = require('./page-reviews.model')
const PageReviewsGroup = require('./page-reviews-group.model')
const PageReviewsGroupItems = require('./page-reviews-group-items.model')
const PagePromotions = require('./page-promotions.model')
const PagePromotionsItem = require('./page-promotions-item.model')
const PagePromotionsItemBenefits = require('./page-promotions-item-benefits.model')
const PageAboutUs = require('./page-about-us.model')
const PageServices = require('./page-services.model')
const PageHome = require('./page-home.model')
const PageMedicalTeam = require('./page-medical-team.model')
const PageMedicalTeamDoctor = require('./page-medical-team-doctor.model')
const PageMedicalTeamDoctorSkills = require('./page-medical-team-doctor-skills.model')
const PageMedicalTeamDoctorSchool = require('./page-medical-team-doctor-school.model')
const PageMedicalTeamDoctorCertificates = require('./page-medical-team-doctor-certificates.model')
const PageMedicalTeamCertificates = require('./page-medical-team-certificates.model')
const PageMedicalTeamPride = require('./page-medical-team-pride.model')

Blog.hasMany(BlogContent, { foreignKey: 'blogId', as: 'contents', onDelete: 'CASCADE' })
BlogContent.belongsTo(Blog, { foreignKey: 'blogId', onDelete: 'CASCADE' })
BlogContent.hasOne(TextContent, {
  foreignKey: 'blogContentId',
  as: 'textContent',
  onDelete: 'CASCADE',
})
TextContent.belongsTo(BlogContent, { foreignKey: 'blogContentId', onDelete: 'CASCADE' })
Blog.hasMany(TextContent, { foreignKey: 'blog_id', as: 'textContents', onDelete: 'CASCADE' })
TextContent.belongsTo(Blog, { foreignKey: 'blog_id', onDelete: 'CASCADE' })
BlogContent.hasOne(ImageContent, {
  foreignKey: 'blogContentId',
  as: 'imageContent',
  onDelete: 'CASCADE',
})
ImageContent.belongsTo(BlogContent, { foreignKey: 'blogContentId', onDelete: 'CASCADE' })
Blog.hasMany(ImageContent, { foreignKey: 'blog_id', as: 'imageContents', onDelete: 'CASCADE' })
ImageContent.belongsTo(Blog, { foreignKey: 'blog_id', onDelete: 'CASCADE' })

Blog.belongsToMany(Tag, { through: BlogTag, foreignKey: 'blog_id', as: 'tags' })
Tag.belongsToMany(Blog, { through: BlogTag, foreignKey: 'tag_id', as: 'blogs' })

BlogTag.belongsTo(Blog, { foreignKey: 'blog_id' })
BlogTag.belongsTo(Tag, { foreignKey: 'tag_id' })

Blog.belongsToMany(Category, { through: BlogCategory, as: 'categories', foreignKey: 'blog_id' })
Category.belongsToMany(Blog, { through: BlogCategory, as: 'blogs', foreignKey: 'category_id' })

BlogCategory.belongsTo(Blog, { foreignKey: 'blog_id' })
BlogCategory.belongsTo(Category, { foreignKey: 'tag_id' })

Service.hasMany(ServiceContent, {
  foreignKey: 'service_id',
  as: 'service_content',
  onDelete: 'CASCADE',
})
ServiceContent.belongsTo(Service, { foreignKey: 'service_id', onDelete: 'CASCADE' })

ServiceContent.hasOne(ServiceTextContent, {
  foreignKey: 'service_content_id',
  as: 'service_text_content',
  onDelete: 'CASCADE',
})
ServiceTextContent.belongsTo(ServiceContent, {
  foreignKey: 'service_content_id',
  onDelete: 'CASCADE',
})

ServiceContent.hasOne(ServiceImageContent, {
  foreignKey: 'service_content_id',
  as: 'service_image_content',
  onDelete: 'CASCADE',
})
ServiceImageContent.belongsTo(ServiceContent, {
  foreignKey: 'service_content_id',
  onDelete: 'CASCADE',
})

Service.hasMany(ServiceTextContent, {
  foreignKey: 'service_id',
  as: 'service_text_content',
  onDelete: 'CASCADE',
})
ServiceTextContent.belongsTo(Service, { foreignKey: 'service_id', onDelete: 'CASCADE' })

Service.hasMany(ServiceImageContent, {
  foreignKey: 'service_id',
  as: 'service_image_content',
  onDelete: 'CASCADE',
})
ServiceImageContent.belongsTo(Service, { foreignKey: 'service_id', onDelete: 'CASCADE' })

Service.hasMany(PageServiceFaq, {
  foreignKey: 'service_id',
  as: 'faqs',
  onDelete: 'CASCADE',
})
PageServiceFaq.belongsTo(Service, { foreignKey: 'service_id', onDelete: 'CASCADE' })

// Establish relationships between PageReviews, PageReviewsGroup, and PageReviewsGroupItems
// PageReviews has many PageReviewsGroup
PageReviews.hasMany(PageReviewsGroup, {
  foreignKey: 'review_page_id',
  as: 'groups',
  onDelete: 'CASCADE',
})
PageReviewsGroup.belongsTo(PageReviews, {
  foreignKey: 'review_page_id',
  as: 'review',
  onDelete: 'CASCADE',
})

// PageReviewsGroup has many PageReviewsGroupItems
PageReviewsGroup.hasMany(PageReviewsGroupItems, {
  foreignKey: 'review_page_group_id',
  as: 'items',
  onDelete: 'CASCADE',
})
PageReviewsGroupItems.belongsTo(PageReviewsGroup, {
  foreignKey: 'review_page_group_id',
  as: 'group',
  onDelete: 'CASCADE',
})

// PagePromotions has many PagePromotionsItem
PagePromotions.hasMany(PagePromotionsItem, {
  foreignKey: 'page_promotions_id',
  as: 'items',
  onDelete: 'CASCADE',
})
PagePromotionsItem.belongsTo(PagePromotions, {
  foreignKey: 'page_promotions_id',
  as: 'promotion',
  onDelete: 'CASCADE',
})

// PagePromotionsItem has many PagePromotionsItemBenefits
PagePromotionsItem.hasMany(PagePromotionsItemBenefits, {
  foreignKey: 'page_promotions_item_id',
  as: 'benefits',
  onDelete: 'CASCADE',
})
PagePromotionsItemBenefits.belongsTo(PagePromotionsItem, {
  foreignKey: 'page_promotions_item_id',
  as: 'item',
  onDelete: 'CASCADE',
})

// Relationships for PageMedicalTeam
PageMedicalTeam.hasMany(PageMedicalTeamPride, {
  foreignKey: 'page_medical_team_id',
  as: 'prides',
  onDelete: 'CASCADE',
})
PageMedicalTeamPride.belongsTo(PageMedicalTeam, {
  foreignKey: 'page_medical_team_id',
  as: 'medicalTeam',
  onDelete: 'CASCADE',
})

PageMedicalTeam.hasMany(PageMedicalTeamCertificates, {
  foreignKey: 'page_medical_team_id',
  as: 'certificates',
  onDelete: 'CASCADE',
})
PageMedicalTeamCertificates.belongsTo(PageMedicalTeam, {
  foreignKey: 'page_medical_team_id',
  as: 'medicalTeam',
  onDelete: 'CASCADE',
})

PageMedicalTeam.hasMany(PageMedicalTeamDoctor, {
  foreignKey: 'page_medical_team_id',
  as: 'doctors',
  onDelete: 'CASCADE',
})
PageMedicalTeamDoctor.belongsTo(PageMedicalTeam, {
  foreignKey: 'page_medical_team_id',
  as: 'medicalTeam',
  onDelete: 'CASCADE',
})

// Relationships for PageMedicalTeamDoctor
PageMedicalTeamDoctor.hasMany(PageMedicalTeamDoctorSkills, {
  foreignKey: 'page_medical_team_doctor_id',
  as: 'skills',
  onDelete: 'CASCADE',
})
PageMedicalTeamDoctorSkills.belongsTo(PageMedicalTeamDoctor, {
  foreignKey: 'page_medical_team_doctor_id',
  as: 'doctor',
  onDelete: 'CASCADE',
})

PageMedicalTeamDoctor.hasMany(PageMedicalTeamDoctorSchool, {
  foreignKey: 'page_medical_team_doctor_id',
  as: 'schools',
  onDelete: 'CASCADE',
})
PageMedicalTeamDoctorSchool.belongsTo(PageMedicalTeamDoctor, {
  foreignKey: 'page_medical_team_doctor_id',
  as: 'doctor',
  onDelete: 'CASCADE',
})

PageMedicalTeamDoctor.hasMany(PageMedicalTeamDoctorCertificates, {
  foreignKey: 'page_medical_team_doctor_id',
  as: 'certificates',
  onDelete: 'CASCADE',
})
PageMedicalTeamDoctorCertificates.belongsTo(PageMedicalTeamDoctor, {
  foreignKey: 'page_medical_team_doctor_id',
  as: 'doctor',
  onDelete: 'CASCADE',
})

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true })
  } catch (error) {
    logger.error('Unable to synchronize the models:', error)
  }
}

module.exports = {
  sequelize,
  models: {
    Users,
    RefreshToken,
    UsersProfile,
    UsersContact,
    UserRole,
    UserPermission,
    Roles,
    Permissions,
    InviteStaff,
    OTPHistory,
    UserAvatars,
    PublicStorage,
    PageStorage,
    BlogStorage,
    Category,
    Tag,
    Blog,
    BlogContent,
    TextContent,
    ImageContent,
    BlogImgStorage,
    PageImgStorage,
    BlogTag,
    BlogCategory,
    Service,
    ServiceContent,
    ServiceImageContent,
    ServiceTextContent,
    PageServiceFaq,
    BaseAboutSection,
    BasePartnerSection,
    BaseCaptionSection,
    BaseSocialSection,
    PageContact,
    PageBlogs,
    PageReviews,
    PageReviewsGroup,
    PageReviewsGroupItems,
    PagePromotions,
    PagePromotionsItem,
    PagePromotionsItemBenefits,
    PageAboutUs,
    PageServices,
    PageHome,
    PageMedicalTeam,
    PageMedicalTeamDoctor,
    PageMedicalTeamDoctorSkills,
    PageMedicalTeamDoctorSchool,
    PageMedicalTeamDoctorCertificates,
    PageMedicalTeamCertificates,
    PageMedicalTeamPride,
  },
  syncModels,
}
