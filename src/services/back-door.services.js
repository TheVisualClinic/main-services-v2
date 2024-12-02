const { models, sequelize } = require('../models')
const { Op } = require('sequelize')

class BackDoorService {
  static async checkBlogOrder() {
    try {
      const duplicates = await models.BlogContent.findAll({
        attributes: ['blog_id', 'order'],
        group: ['blog_id', 'order'],
        having: sequelize.literal('COUNT(*) > 1'),
        raw: true,
      })

      return duplicates
    } catch (error) {
      console.error('Error in checkBlogOrder:', error)
      throw error
    }
  }

  static async adjustBlogsDuplicateOrders() {
    const transaction = await sequelize.transaction()
    try {
      // ค้นหา blog_id และ order ที่ซ้ำกัน
      const duplicates = await models.BlogContent.findAll({
        attributes: ['blog_id', 'order'],
        group: ['blog_id', 'order'],
        having: sequelize.literal('COUNT(*) > 1'),
        raw: true,
      })

      // หากไม่มี order ซ้ำ ให้หยุดการทำงาน
      if (duplicates.length === 0) {
        return 'No duplicate orders found.'
      }

      // เก็บ blog_id ที่มี order ซ้ำ
      const blogIdsWithDuplicates = [...new Set(duplicates.map((dup) => dup.blog_id))]

      // ดึงข้อมูลทั้งหมดที่เกี่ยวข้อง
      const contents = await models.BlogContent.findAll({
        where: {
          blog_id: { [Op.in]: blogIdsWithDuplicates },
        },
        order: [
          ['blog_id', 'ASC'],
          ['order', 'ASC'],
        ],
      })

      // รีเซ็ต order ใหม่
      const updatedContents = []
      let currentBlogId = null
      let newOrder = 1

      for (const content of contents) {
        if (content.blog_id !== currentBlogId) {
          currentBlogId = content.blog_id
          newOrder = 1 // รีเซ็ต order ใหม่
        }

        content.order = newOrder
        updatedContents.push(content)
        newOrder++
      }

      // บันทึกการเปลี่ยนแปลงกลับไปยังฐานข้อมูล
      for (const content of updatedContents) {
        await models.BlogContent.update(
          { order: content.order },
          { where: { id: content.id }, transaction }
        )
      }

      await transaction.commit()
      return 'Order has been successfully adjusted.'
    } catch (error) {
      await transaction.rollback()
      console.error('Error in adjustDuplicateOrders:', error)
      throw error
    }
  }

  static async checkServicesOrder() {
    try {
      const duplicates = await models.ServiceContent.findAll({
        attributes: ['blog_id', 'order'],
        group: ['blog_id', 'order'],
        having: sequelize.literal('COUNT(*) > 1'),
        raw: true,
      })

      return duplicates
    } catch (error) {
      console.error('Error in checkServicesOrder:', error)
      throw error
    }
  }
}

module.exports = BackDoorService
