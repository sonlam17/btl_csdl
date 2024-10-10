import express from "express";
import Patient from '../models/Patient.js'
const router = express.Router();


// 1. Lấy danh sách tất cả bệnh nhân
router.get('/', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: 'Không thể lấy danh sách bệnh nhân' });
    }
  });
  
  // 2. Lấy thông tin chi tiết của một bệnh nhân theo ID
  router.get('/:id', async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) {
        return res.status(404).json({ error: 'Không tìm thấy bệnh nhân' });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: 'Không thể lấy thông tin bệnh nhân' });
    }
  });
  
  // 3. Thêm mới một bệnh nhân
  router.post('/', async (req, res) => {
    try {
      const newPatient = new Patient(req.body);
      await newPatient.save();
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(500).json({ error: 'Không thể thêm bệnh nhân' });
    }
  });
  
  // 4. Cập nhật thông tin một bệnh nhân theo ID
  router.put('/:id', async (req, res) => {
    try {
      const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPatient) {
        return res.status(404).json({ error: 'Không tìm thấy bệnh nhân' });
      }
      res.status(200).json(updatedPatient);
    } catch (error) {
      res.status(500).json({ error: 'Không thể cập nhật thông tin bệnh nhân' });
    }
  });
  
  // 5. Xóa một bệnh nhân theo ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
      if (!deletedPatient) {
        return res.status(404).json({ error: 'Không tìm thấy bệnh nhân' });
      }
      res.status(200).json({ message: 'Xóa bệnh nhân thành công' });
    } catch (error) {
      res.status(500).json({ error: 'Không thể xóa bệnh nhân' });
    }
  });

export default router;