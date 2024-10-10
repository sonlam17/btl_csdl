// medications.js
import express from 'express';
import Medication from '../models/Medication.js'; // Đường dẫn tới model Medication

const router = express.Router();

// 1. Lấy danh sách tất cả thuốc
router.get('/', async (req, res) => {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy danh sách thuốc' });
  }
});

// 2. Lấy thông tin chi tiết của một thuốc theo ID
router.get('/:id', async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    if (!medication) {
      return res.status(404).json({ error: 'Không tìm thấy thuốc' });
    }
    res.status(200).json(medication);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy thông tin thuốc' });
  }
});

// 3. Thêm mới một thuốc
router.post('/', async (req, res) => {
  try {
    const newMedication = new Medication(req.body);
    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (error) {
    res.status(500).json({ error: 'Không thể thêm thuốc' });
  }
});

// 4. Cập nhật thông tin một thuốc theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedMedication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMedication) {
      return res.status(404).json({ error: 'Không tìm thấy thuốc' });
    }
    res.status(200).json(updatedMedication);
  } catch (error) {
    res.status(500).json({ error: 'Không thể cập nhật thông tin thuốc' });
  }
});

// 5. Xóa một thuốc theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMedication = await Medication.findByIdAndDelete(req.params.id);
    if (!deletedMedication) {
      return res.status(404).json({ error: 'Không tìm thấy thuốc' });
    }
    res.status(200).json({ message: 'Xóa thuốc thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Không thể xóa thuốc' });
  }
});

export default router;
