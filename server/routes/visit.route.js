import express from 'express';
import Visit from '../models/Visit.js'; 

const router = express.Router();

// 1. Lấy danh sách tất cả lần thăm khám
router.get('/', async (req, res) => {
  try {
    const visits = await Visit.find()
      .populate('patient_id')
      .populate('doctor_id')
      .populate('nurse_id')
      .populate('prescriptions.medication_id'); // Populate các thông tin liên quan

    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy danh sách lần thăm khám' });
  }
});

// 2. Lấy thông tin chi tiết của một lần thăm khám theo ID
router.get('/:id', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate('patient_id')
      .populate('doctor_id')
      .populate('nurse_id')
      .populate('prescriptions.medication_id');

    if (!visit) {
      return res.status(404).json({ error: 'Không tìm thấy lần thăm khám' });
    }
    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy thông tin lần thăm khám' });
  }
});

// 3. Thêm mới một lần thăm khám
router.post('/', async (req, res) => {
  try {
    const newVisit = new Visit(req.body);
    await newVisit.save();
    res.status(201).json(newVisit);
  } catch (error) {
    res.status(500).json({ error: 'Không thể thêm lần thăm khám' });
  }
});

// 4. Cập nhật thông tin một lần thăm khám theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedVisit = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVisit) {
      return res.status(404).json({ error: 'Không tìm thấy lần thăm khám' });
    }
    res.status(200).json(updatedVisit);
  } catch (error) {
    res.status(500).json({ error: 'Không thể cập nhật thông tin lần thăm khám' });
  }
});

// 5. Xóa một lần thăm khám theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedVisit = await Visit.findByIdAndDelete(req.params.id);
    if (!deletedVisit) {
      return res.status(404).json({ error: 'Không tìm thấy lần thăm khám' });
    }
    res.status(200).json({ message: 'Xóa lần thăm khám thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Không thể xóa lần thăm khám' });
  }
});

export default router;
