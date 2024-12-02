const { models } = require('../models')
const { Op } = require('sequelize')
const axios = require('axios')
const FormData = require('form-data')

class PageStorageService {
  static async getPageStorage(page = 1, pageSize = 10, search = '') {
    try {
      const offset = (page - 1) * pageSize
      const limit = pageSize
      const whereCondition = search ? { image_name: { [Op.like]: `%${search}%` } } : {}

      const { count, rows: pagesImg } = await models.PageImgStorage.findAndCountAll({
        where: whereCondition,
        order: [['id', 'DESC']],
        offset,
        limit,
      })
      return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        pagesImg,
      }
    } catch (error) {
      throw error
    }
  }

  static async createImage(req, accessToken) {
    let uploadedImageId = null

    try {
      const response = await this.callPageStorageSingleUpload(req, accessToken)

      if (response.status !== 'success') {
        throw new Error('Failed to upload image to storage provider')
      }

      uploadedImageId = response.data.image_id

      const originalName = response.data.image_original_name
      const imageNameWithoutExtension = originalName.split('.').slice(0, -1).join('.')

      const imageData = {
        image_id: uploadedImageId,
        image_url: response.data.image_url,
        image_name: imageNameWithoutExtension,
      }
      const imagePage = await models.PageImgStorage.create(imageData)
      return imagePage
    } catch (error) {
      if (uploadedImageId) {
        await this.callPageStorageSingleDelete(uploadedImageId, accessToken)
      }
      throw error
    }
  }

  static async updateNewImageName(id, new_image_name) {
    try {
      const pageImg = await models.PageImgStorage.findByPk(id)

      if (!pageImg) {
        const error = new Error('Page image not found')
        error.status = 404
        throw error
      }
      await pageImg.update({ image_name: new_image_name })
      return pageImg
    } catch (error) {
      throw error
    }
  }

  static async deleteImage(id, accessToken) {
    try {
      const pageImg = await models.PageImgStorage.findByPk(id)
      if (!pageImg) {
        throw new Error('Page image not found')
      }

      await this.callPageStorageSingleDelete(pageImg.image_id, accessToken)
      await pageImg.destroy()
      return { message: 'Page image deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  static async callPageStorageSingleUpload(req, accessToken) {
    try {
      const image_file = req.file
      const { image_name } = req.body

      const formData = new FormData()
      formData.append('file', image_file.buffer, image_file.originalname)
      formData.append('file_name', image_name)

      const { data: response } = await axios.post(
        `${process.env.STORAGE_PROVIDER_URL}/api/page/images/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ...formData.getHeaders(),
          },
        }
      )
      return response
    } catch (error) {
      throw error
    }
  }

  static async callPageStorageSingleDelete(image_id, accessToken) {
    try {
      const { data: response } = await axios.delete(
        `${process.env.STORAGE_PROVIDER_URL}/api/page/images/delete`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: { image_id },
        }
      )
      return response
    } catch (error) {
      throw error
    }
  }
}

module.exports = PageStorageService
