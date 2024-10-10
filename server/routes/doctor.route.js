// doctors.js
import express from 'express';
import Doctor from '../models/Doctor.js'; // Đường dẫn tới model Doctor

const router = express.Router();

// 1. Lấy danh sách tất cả bác sĩ
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy danh sách bác sĩ' });
  }
});

// 2. Lấy thông tin chi tiết của một bác sĩ theo ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Không tìm thấy bác sĩ' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy thông tin bác sĩ' });
  }
});

// 3. Thêm mới một bác sĩ
router.post('/', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: 'Không thể thêm bác sĩ' });
  }
});

// 4. Cập nhật thông tin một bác sĩ theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Không tìm thấy bác sĩ' });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: 'Không thể cập nhật thông tin bác sĩ' });
  }
});

// 5. Xóa một bác sĩ theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Không tìm thấy bác sĩ' });
    }
    res.status(200).json({ message: 'Xóa bác sĩ thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Không thể xóa bác sĩ' });
  }
});

export default router;
