const PageMedicalTeamService = require('../services/page-medical-team.services')
const ResponseHandle = require('../utils/responseHandle')

class PageMedicalTeamController {
  // PageMedicalTeam
  static async getPageMedicalTeamDetail(req, res) {
    try {
      const result = await PageMedicalTeamService.getPageMedicalTeamDetail()
      return ResponseHandle.success(res, result, 'Successfully retrieved the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updatePageMedicalTeamDetail(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const result = await PageMedicalTeamService.updatePageMedicalTeamDetail(id, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the data')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getDoctorList(req, res) {
    try {
      const { pageMedicalTeamId } = req.params
      const result = await PageMedicalTeamService.getDoctorList(pageMedicalTeamId)
      return ResponseHandle.success(res, result, 'Successfully retrieved the doctor list')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getCertificatesList(req, res) {
    try {
      const { pageMedicalTeamId } = req.params
      const result = await PageMedicalTeamService.getCertificatesList(pageMedicalTeamId)
      return ResponseHandle.success(res, result, 'Successfully retrieved the certificates list')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async getPrideList(req, res) {
    try {
      const { pageMedicalTeamId } = req.params
      const result = await PageMedicalTeamService.getPrideList(pageMedicalTeamId)
      return ResponseHandle.success(res, result, 'Successfully retrieved the pride list')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  // Certificates
  static async createCertificate(req, res) {
    try {
      const { pageMedicalTeamId } = req.body
      const result = await PageMedicalTeamService.createCertificate(pageMedicalTeamId)
      return ResponseHandle.success(res, result, 'Successfully created the certificate')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateCertificate(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const result = await PageMedicalTeamService.updateCertificate(id, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the certificate')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderCertificate(req, res) {
    try {
      const { id } = req.params
      const { newOrder } = req.body
      const result = await PageMedicalTeamService.reorderCertificate(id, newOrder)
      return ResponseHandle.success(res, result, 'Successfully reordered the certificates')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deleteCertificate(req, res) {
    try {
      const { id } = req.params
      const result = await PageMedicalTeamService.deleteCertificate(id)
      return ResponseHandle.success(res, result, 'Successfully deleted the certificate')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  // Pride
  static async createPride(req, res) {
    try {
      const { pageMedicalTeamId } = req.body
      const result = await PageMedicalTeamService.createPride(pageMedicalTeamId)
      return ResponseHandle.success(res, result, 'Successfully created the pride')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updatePride(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const result = await PageMedicalTeamService.updatePride(id, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the pride')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderPride(req, res) {
    try {
      const { id } = req.params
      const { newOrder } = req.body
      const result = await PageMedicalTeamService.reorderPride(id, newOrder)
      return ResponseHandle.success(res, result, 'Successfully reordered the prides')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deletePride(req, res) {
    try {
      const { id } = req.params
      const result = await PageMedicalTeamService.deletePride(id)
      return ResponseHandle.success(res, result, 'Successfully deleted the pride')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  // Doctor
  static async createDoctor(req, res) {
    try {
      const { pageMedicalTeamId } = req.body
      const result = await PageMedicalTeamService.createDoctor(pageMedicalTeamId)
      return ResponseHandle.success(res, result, 'Successfully created the doctor')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateDoctor(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const result = await PageMedicalTeamService.updateDoctor(id, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the doctor')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderDoctor(req, res) {
    try {
      const { id } = req.params
      const { newOrder } = req.body
      const result = await PageMedicalTeamService.reorderDoctor(id, newOrder)
      return ResponseHandle.success(res, result, 'Successfully reordered the doctors')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deleteDoctor(req, res) {
    try {
      const { id } = req.params
      const result = await PageMedicalTeamService.deleteDoctor(id)
      return ResponseHandle.success(res, result, 'Successfully deleted the doctor')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  // PageMedicalTeamDoctorSkills
  static async createDoctorSkill(req, res) {
    try {
      const { doctorId } = req.params
      const result = await PageMedicalTeamService.createDoctorSkill(doctorId)
      return ResponseHandle.success(res, result, 'Successfully created the doctor skill')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateDoctorSkill(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const result = await PageMedicalTeamService.updateDoctorSkill(id, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the doctor skill')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderDoctorSkill(req, res) {
    try {
      const { id } = req.params
      const { newOrder } = req.body
      const result = await PageMedicalTeamService.reorderDoctorSkill(id, newOrder)
      return ResponseHandle.success(res, result, 'Successfully reordered the doctor skills')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deleteDoctorSkill(req, res) {
    try {
      const { id } = req.params
      const result = await PageMedicalTeamService.deleteDoctorSkill(id)
      return ResponseHandle.success(res, result, 'Successfully deleted the doctor skill')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  // PageMedicalTeamDoctorSchool
  static async createDoctorSchool(req, res) {
    try {
      const { doctorId } = req.params
      const result = await PageMedicalTeamService.createDoctorSchool(doctorId)
      return ResponseHandle.success(res, result, 'Successfully created the doctor school')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateDoctorSchool(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const result = await PageMedicalTeamService.updateDoctorSchool(id, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the doctor school')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderDoctorSchool(req, res) {
    try {
      const { id } = req.params
      const { newOrder } = req.body
      const result = await PageMedicalTeamService.reorderDoctorSchool(id, newOrder)
      return ResponseHandle.success(res, result, 'Successfully reordered the doctor schools')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deleteDoctorSchool(req, res) {
    try {
      const { id } = req.params
      const result = await PageMedicalTeamService.deleteDoctorSchool(id)
      return ResponseHandle.success(res, result, 'Successfully deleted the doctor school')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  // PageMedicalTeamDoctorCertificates
  static async createDoctorCertificate(req, res) {
    try {
      const { doctorId } = req.params
      const result = await PageMedicalTeamService.createDoctorCertificate(doctorId)
      return ResponseHandle.success(res, result, 'Successfully created the doctor certificate')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async updateDoctorCertificate(req, res) {
    try {
      const { id } = req.params
      const updatedData = req.body
      const result = await PageMedicalTeamService.updateDoctorCertificate(id, updatedData)
      return ResponseHandle.success(res, result, 'Successfully updated the doctor certificate')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async reorderDoctorCertificate(req, res) {
    try {
      const { id } = req.params
      const { newOrder } = req.body
      const result = await PageMedicalTeamService.reorderDoctorCertificate(id, newOrder)
      return ResponseHandle.success(res, result, 'Successfully reordered the doctor certificates')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }

  static async deleteDoctorCertificate(req, res) {
    try {
      const { id } = req.params
      const result = await PageMedicalTeamService.deleteDoctorCertificate(id)
      return ResponseHandle.success(res, result, 'Successfully deleted the doctor certificate')
    } catch (error) {
      return ResponseHandle.error(
        res,
        error.status || 500,
        error.message || 'Internal Server Error'
      )
    }
  }
}

module.exports = PageMedicalTeamController
