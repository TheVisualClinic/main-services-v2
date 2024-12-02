const { models, sequelize } = require('../models')
const { Op } = require('sequelize')

class PageMedicalTeamService {
  static async getPageMedicalTeamDetail() {
    try {
      const detail = await models.PageMedicalTeam.findOne({
        order: [['id', 'ASC']],
      })

      if (!detail) {
        const error = new Error('Data not found')
        error.status = 404
        throw error
      }

      return detail
    } catch (error) {
      throw error
    }
  }

  static async updatePageMedicalTeamDetail(id, updatedData) {
    try {
      const detail = await models.PageMedicalTeam.findOne({ where: { id: { [Op.eq]: id } } })

      if (!detail) {
        const error = new Error(`Data not found`)
        error.status = 404
        throw error
      }

      await detail.update(updatedData)

      return detail
    } catch (error) {
      throw error
    }
  }

  static async getDoctorList(pageMedicalTeamId) {
    try {
      if (!pageMedicalTeamId) {
        const error = new Error('Page Medical Team ID is required')
        error.status = 400
        throw error
      }

      const doctors = await models.PageMedicalTeamDoctor.findAll({
        where: { page_medical_team_id: pageMedicalTeamId },
        include: [
          {
            model: models.PageMedicalTeamDoctorSkills,
            as: 'skills',
            separate: true,
            order: [['skill_order', 'ASC']],
          },
          {
            model: models.PageMedicalTeamDoctorSchool,
            as: 'schools',
            separate: true,
            order: [['school_order', 'ASC']],
          },
          {
            model: models.PageMedicalTeamDoctorCertificates,
            as: 'certificates',
            separate: true,
            order: [['certificate_order', 'ASC']],
          },
        ],
        order: [['doctor_order', 'ASC']],
      })

      return doctors
    } catch (error) {
      throw error
    }
  }

  static async getCertificatesList(pageMedicalTeamId) {
    try {
      if (!pageMedicalTeamId) {
        const error = new Error('Page Medical Team ID is required')
        error.status = 400
        throw error
      }

      const certificates = await models.PageMedicalTeamCertificates.findAll({
        where: { page_medical_team_id: pageMedicalTeamId },
        order: [['certificate_order', 'ASC']],
      })

      return certificates
    } catch (error) {
      throw error
    }
  }

  static async getPrideList(pageMedicalTeamId) {
    try {
      if (!pageMedicalTeamId) {
        const error = new Error('Page Medical Team ID is required')
        error.status = 400
        throw error
      }

      const prides = await models.PageMedicalTeamPride.findAll({
        where: { page_medical_team_id: pageMedicalTeamId },
        order: [['pride_order', 'ASC']],
      })

      return prides
    } catch (error) {
      throw error
    }
  }

  // CRUD for Certificates
  static async createCertificate(pageMedicalTeamId) {
    try {
      if (!pageMedicalTeamId) {
        const error = new Error('Page Medical Team ID is required')
        error.status = 400
        throw error
      }

      const maxOrder = await models.PageMedicalTeamCertificates.max('certificate_order', {
        where: { page_medical_team_id: { [Op.eq]: pageMedicalTeamId } },
      })

      return await models.PageMedicalTeamCertificates.create({
        page_medical_team_id: pageMedicalTeamId,
        certificate_order: maxOrder ? maxOrder + 1 : 1,
      })
    } catch (error) {
      throw error
    }
  }

  static async updateCertificate(id, updatedData) {
    try {
      const certificate = await models.PageMedicalTeamCertificates.findOne({
        where: { id: { [Op.eq]: id } },
      })

      if (!certificate) {
        const error = new Error('Certificate not found')
        error.status = 404
        throw error
      }

      await certificate.update(updatedData)
      return certificate
    } catch (error) {
      throw error
    }
  }

  static async reorderCertificate(id, newOrder) {
    try {
      const certificate = await models.PageMedicalTeamCertificates.findOne({ where: { id } })

      if (!certificate) {
        const error = new Error('Certificate not found')
        error.status = 404
        throw error
      }

      const oldOrder = certificate.certificate_order

      if (newOrder < 1) {
        const error = new Error('New order is out of range')
        error.status = 400
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        if (newOrder < oldOrder) {
          await models.PageMedicalTeamCertificates.update(
            { certificate_order: sequelize.literal('certificate_order + 1') },
            {
              where: {
                page_medical_team_id: certificate.page_medical_team_id,
                certificate_order: {
                  [Op.gte]: newOrder,
                  [Op.lt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        } else if (newOrder > oldOrder) {
          await models.PageMedicalTeamCertificates.update(
            { certificate_order: sequelize.literal('certificate_order - 1') },
            {
              where: {
                page_medical_team_id: certificate.page_medical_team_id,
                certificate_order: {
                  [Op.lte]: newOrder,
                  [Op.gt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        }

        await certificate.update({ certificate_order: newOrder }, { transaction })
      })

      return certificate
    } catch (error) {
      throw error
    }
  }

  static async deleteCertificate(id) {
    try {
      const certificate = await models.PageMedicalTeamCertificates.findOne({
        where: { id },
      })

      if (!certificate) {
        const error = new Error('Certificate not found')
        error.status = 404
        throw error
      }

      const pageMedicalTeamId = certificate.page_medical_team_id

      await certificate.destroy()

      const certificates = await models.PageMedicalTeamCertificates.findAll({
        where: { page_medical_team_id: pageMedicalTeamId },
        order: [['certificate_order', 'ASC']],
      })

      await Promise.all(
        certificates.map((item, index) => item.update({ certificate_order: index + 1 }))
      )

      return true
    } catch (error) {
      throw error
    }
  }

  // CRUD for Pride
  static async createPride(pageMedicalTeamId) {
    try {
      if (!pageMedicalTeamId) {
        const error = new Error('Page Medical Team ID is required')
        error.status = 400
        throw error
      }

      const maxOrder = await models.PageMedicalTeamPride.max('pride_order', {
        where: { page_medical_team_id: { [Op.eq]: pageMedicalTeamId } },
      })

      return await models.PageMedicalTeamPride.create({
        page_medical_team_id: pageMedicalTeamId,
        pride_order: maxOrder ? maxOrder + 1 : 1,
      })
    } catch (error) {
      throw error
    }
  }

  static async updatePride(id, updatedData) {
    try {
      const pride = await models.PageMedicalTeamPride.findOne({
        where: { id: { [Op.eq]: id } },
      })

      if (!pride) {
        const error = new Error('Pride not found')
        error.status = 404
        throw error
      }

      await pride.update(updatedData)
      return pride
    } catch (error) {
      throw error
    }
  }

  static async reorderPride(id, newOrder) {
    try {
      const pride = await models.PageMedicalTeamPride.findOne({ where: { id } })

      if (!pride) {
        const error = new Error('Pride not found')
        error.status = 404
        throw error
      }

      const oldOrder = pride.pride_order

      if (newOrder < 1) {
        const error = new Error('New order is out of range')
        error.status = 400
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        if (newOrder < oldOrder) {
          await models.PageMedicalTeamPride.update(
            { pride_order: sequelize.literal('pride_order + 1') },
            {
              where: {
                page_medical_team_id: pride.page_medical_team_id,
                pride_order: {
                  [Op.gte]: newOrder,
                  [Op.lt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        } else if (newOrder > oldOrder) {
          await models.PageMedicalTeamPride.update(
            { pride_order: sequelize.literal('pride_order - 1') },
            {
              where: {
                page_medical_team_id: pride.page_medical_team_id,
                pride_order: {
                  [Op.lte]: newOrder,
                  [Op.gt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        }

        await pride.update({ pride_order: newOrder }, { transaction })
      })

      return pride
    } catch (error) {
      throw error
    }
  }

  static async deletePride(id) {
    try {
      const pride = await models.PageMedicalTeamPride.findOne({
        where: { id },
      })

      if (!pride) {
        const error = new Error('Pride not found')
        error.status = 404
        throw error
      }

      const pageMedicalTeamId = pride.page_medical_team_id

      await pride.destroy()

      const prides = await models.PageMedicalTeamPride.findAll({
        where: { page_medical_team_id: pageMedicalTeamId },
        order: [['pride_order', 'ASC']],
      })

      await Promise.all(prides.map((item, index) => item.update({ pride_order: index + 1 })))

      return true
    } catch (error) {
      throw error
    }
  }

  // CRUD for Doctor
  static async createDoctor(pageMedicalTeamId) {
    try {
      if (!pageMedicalTeamId) {
        const error = new Error('Page Medical Team ID is required')
        error.status = 400
        throw error
      }

      const maxOrder = await models.PageMedicalTeamDoctor.max('doctor_order', {
        where: { page_medical_team_id: { [Op.eq]: pageMedicalTeamId } },
      })

      return await models.PageMedicalTeamDoctor.create({
        page_medical_team_id: pageMedicalTeamId,
        doctor_order: maxOrder ? maxOrder + 1 : 1,
      })
    } catch (error) {
      throw error
    }
  }

  static async updateDoctor(id, updatedData) {
    try {
      const doctor = await models.PageMedicalTeamDoctor.findOne({
        where: { id: { [Op.eq]: id } },
      })

      if (!doctor) {
        const error = new Error('Doctor not found')
        error.status = 404
        throw error
      }

      await doctor.update(updatedData)
      return doctor
    } catch (error) {
      throw error
    }
  }

  static async reorderDoctor(id, newOrder) {
    try {
      const doctor = await models.PageMedicalTeamDoctor.findOne({ where: { id } })

      if (!doctor) {
        const error = new Error('Doctor not found')
        error.status = 404
        throw error
      }

      const oldOrder = doctor.doctor_order

      if (newOrder < 1) {
        const error = new Error('New order is out of range')
        error.status = 400
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        if (newOrder < oldOrder) {
          await models.PageMedicalTeamDoctor.update(
            { doctor_order: sequelize.literal('doctor_order + 1') },
            {
              where: {
                page_medical_team_id: doctor.page_medical_team_id,
                doctor_order: {
                  [Op.gte]: newOrder,
                  [Op.lt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        } else if (newOrder > oldOrder) {
          await models.PageMedicalTeamDoctor.update(
            { doctor_order: sequelize.literal('doctor_order - 1') },
            {
              where: {
                page_medical_team_id: doctor.page_medical_team_id,
                doctor_order: {
                  [Op.lte]: newOrder,
                  [Op.gt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        }

        await doctor.update({ doctor_order: newOrder }, { transaction })
      })

      return doctor
    } catch (error) {
      throw error
    }
  }

  static async deleteDoctor(id) {
    try {
      const doctor = await models.PageMedicalTeamDoctor.findOne({
        where: { id },
      })

      if (!doctor) {
        const error = new Error('Doctor not found')
        error.status = 404
        throw error
      }

      const pageMedicalTeamId = doctor.page_medical_team_id

      await doctor.destroy()

      const doctors = await models.PageMedicalTeamDoctor.findAll({
        where: { page_medical_team_id: pageMedicalTeamId },
        order: [['doctor_order', 'ASC']],
      })

      await Promise.all(doctors.map((item, index) => item.update({ doctor_order: index + 1 })))

      return true
    } catch (error) {
      throw error
    }
  }

  // CRUD for DoctorSkills
  static async createDoctorSkill(doctorId) {
    try {
      if (!doctorId) {
        const error = new Error('Doctor ID is required')
        error.status = 400
        throw error
      }

      const maxOrder = await models.PageMedicalTeamDoctorSkills.max('skill_order', {
        where: { page_medical_team_doctor_id: { [Op.eq]: doctorId } },
      })

      return await models.PageMedicalTeamDoctorSkills.create({
        page_medical_team_doctor_id: doctorId,
        skill_order: maxOrder ? maxOrder + 1 : 1,
      })
    } catch (error) {
      throw error
    }
  }

  static async updateDoctorSkill(id, updatedData) {
    try {
      const skill = await models.PageMedicalTeamDoctorSkills.findOne({
        where: { id: { [Op.eq]: id } },
      })
      if (!skill) {
        const error = new Error('Doctor Skill not found')
        error.status = 404
        throw error
      }

      await skill.update(updatedData)
      return skill
    } catch (error) {
      throw error
    }
  }

  static async reorderDoctorSkill(id, newOrder) {
    try {
      const skill = await models.PageMedicalTeamDoctorSkills.findOne({ where: { id } })

      if (!skill) {
        const error = new Error('Doctor Skill not found')
        error.status = 404
        throw error
      }

      const oldOrder = skill.skill_order

      if (newOrder < 1) {
        const error = new Error('New order is out of range')
        error.status = 400
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        if (newOrder < oldOrder) {
          await models.PageMedicalTeamDoctorSkills.update(
            { skill_order: sequelize.literal('skill_order + 1') },
            {
              where: {
                page_medical_team_doctor_id: skill.page_medical_team_doctor_id,
                skill_order: {
                  [Op.gte]: newOrder,
                  [Op.lt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        } else if (newOrder > oldOrder) {
          await models.PageMedicalTeamDoctorSkills.update(
            { skill_order: sequelize.literal('skill_order - 1') },
            {
              where: {
                page_medical_team_doctor_id: skill.page_medical_team_doctor_id,
                skill_order: {
                  [Op.lte]: newOrder,
                  [Op.gt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        }

        await skill.update({ skill_order: newOrder }, { transaction })
      })

      return skill
    } catch (error) {
      throw error
    }
  }

  static async deleteDoctorSkill(id) {
    try {
      const skill = await models.PageMedicalTeamDoctorSkills.findOne({
        where: { id },
      })

      if (!skill) {
        const error = new Error('Doctor Skill not found')
        error.status = 404
        throw error
      }

      const pageMedicalTeamDoctorId = skill.page_medical_team_doctor_id

      await skill.destroy()

      const skills = await models.PageMedicalTeamDoctorSkills.findAll({
        where: { page_medical_team_doctor_id: pageMedicalTeamDoctorId },
        order: [['skill_order', 'ASC']],
      })

      await Promise.all(skills.map((item, index) => item.update({ skill_order: index + 1 })))

      return true
    } catch (error) {
      throw error
    }
  }

  // CRUD for DoctorSchool
  static async createDoctorSchool(doctorId) {
    try {
      if (!doctorId) {
        const error = new Error('Doctor ID is required')
        error.status = 400
        throw error
      }

      const maxOrder = await models.PageMedicalTeamDoctorSchool.max('school_order', {
        where: { page_medical_team_doctor_id: { [Op.eq]: doctorId } },
      })

      return await models.PageMedicalTeamDoctorSchool.create({
        page_medical_team_doctor_id: doctorId,
        school_order: maxOrder ? maxOrder + 1 : 1,
      })
    } catch (error) {
      throw error
    }
  }

  static async updateDoctorSchool(id, updatedData) {
    try {
      const school = await models.PageMedicalTeamDoctorSchool.findOne({
        where: { id: { [Op.eq]: id } },
      })
      if (!school) {
        const error = new Error('Doctor School not found')
        error.status = 404
        throw error
      }

      await school.update(updatedData)
      return school
    } catch (error) {
      throw error
    }
  }

  static async reorderDoctorSchool(id, newOrder) {
    try {
      const school = await models.PageMedicalTeamDoctorSchool.findOne({ where: { id } })

      if (!school) {
        const error = new Error('Doctor School not found')
        error.status = 404
        throw error
      }

      const oldOrder = school.school_order

      if (newOrder < 1) {
        const error = new Error('New order is out of range')
        error.status = 400
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        if (newOrder < oldOrder) {
          await models.PageMedicalTeamDoctorSchool.update(
            { school_order: sequelize.literal('school_order + 1') },
            {
              where: {
                page_medical_team_doctor_id: school.page_medical_team_doctor_id,
                school_order: {
                  [Op.gte]: newOrder,
                  [Op.lt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        } else if (newOrder > oldOrder) {
          await models.PageMedicalTeamDoctorSchool.update(
            { school_order: sequelize.literal('school_order - 1') },
            {
              where: {
                page_medical_team_doctor_id: school.page_medical_team_doctor_id,
                school_order: {
                  [Op.lte]: newOrder,
                  [Op.gt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        }

        await school.update({ school_order: newOrder }, { transaction })
      })

      return school
    } catch (error) {
      throw error
    }
  }

  static async deleteDoctorSchool(id) {
    try {
      const school = await models.PageMedicalTeamDoctorSchool.findOne({
        where: { id },
      })

      if (!school) {
        const error = new Error('Doctor School not found')
        error.status = 404
        throw error
      }

      const pageMedicalTeamDoctorId = school.page_medical_team_doctor_id

      await school.destroy()

      const schools = await models.PageMedicalTeamDoctorSchool.findAll({
        where: { page_medical_team_doctor_id: pageMedicalTeamDoctorId },
        order: [['school_order', 'ASC']],
      })

      await Promise.all(schools.map((item, index) => item.update({ school_order: index + 1 })))

      return true
    } catch (error) {
      throw error
    }
  }

  // CRUD for DoctorCertificates
  static async createDoctorCertificate(doctorId) {
    try {
      if (!doctorId) {
        const error = new Error('Doctor ID is required')
        error.status = 400
        throw error
      }

      const maxOrder = await models.PageMedicalTeamDoctorCertificates.max('certificate_order', {
        where: { page_medical_team_doctor_id: { [Op.eq]: doctorId } },
      })

      return await models.PageMedicalTeamDoctorCertificates.create({
        page_medical_team_doctor_id: doctorId,
        certificate_order: maxOrder ? maxOrder + 1 : 1,
      })
    } catch (error) {
      throw error
    }
  }

  static async updateDoctorCertificate(id, updatedData) {
    try {
      const certificate = await models.PageMedicalTeamDoctorCertificates.findOne({
        where: { id: { [Op.eq]: id } },
      })
      if (!certificate) {
        const error = new Error('Doctor Certificate not found')
        error.status = 404
        throw error
      }

      await certificate.update(updatedData)
      return certificate
    } catch (error) {
      throw error
    }
  }

  static async reorderDoctorCertificate(id, newOrder) {
    try {
      const certificate = await models.PageMedicalTeamDoctorCertificates.findOne({ where: { id } })

      if (!certificate) {
        const error = new Error('Doctor Certificate not found')
        error.status = 404
        throw error
      }

      const oldOrder = certificate.certificate_order

      if (newOrder < 1) {
        const error = new Error('New order is out of range')
        error.status = 400
        throw error
      }

      await sequelize.transaction(async (transaction) => {
        if (newOrder < oldOrder) {
          await models.PageMedicalTeamDoctorCertificates.update(
            { certificate_order: sequelize.literal('certificate_order + 1') },
            {
              where: {
                page_medical_team_doctor_id: certificate.page_medical_team_doctor_id,
                certificate_order: {
                  [Op.gte]: newOrder,
                  [Op.lt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        } else if (newOrder > oldOrder) {
          await models.PageMedicalTeamDoctorCertificates.update(
            { certificate_order: sequelize.literal('certificate_order - 1') },
            {
              where: {
                page_medical_team_doctor_id: certificate.page_medical_team_doctor_id,
                certificate_order: {
                  [Op.lte]: newOrder,
                  [Op.gt]: oldOrder,
                },
                id: { [Op.ne]: id },
              },
              transaction,
            }
          )
        }

        await certificate.update({ certificate_order: newOrder }, { transaction })
      })

      return certificate
    } catch (error) {
      throw error
    }
  }

  static async deleteDoctorCertificate(id) {
    try {
      const certificate = await models.PageMedicalTeamDoctorCertificates.findOne({
        where: { id },
      })

      if (!certificate) {
        const error = new Error('Doctor Certificate not found')
        error.status = 404
        throw error
      }

      const pageMedicalTeamDoctorId = certificate.page_medical_team_doctor_id

      await certificate.destroy()

      const certificates = await models.PageMedicalTeamDoctorCertificates.findAll({
        where: { page_medical_team_doctor_id: pageMedicalTeamDoctorId },
        order: [['certificate_order', 'ASC']],
      })

      await Promise.all(
        certificates.map((item, index) => item.update({ certificate_order: index + 1 }))
      )

      return true
    } catch (error) {
      throw error
    }
  }
}

module.exports = PageMedicalTeamService
