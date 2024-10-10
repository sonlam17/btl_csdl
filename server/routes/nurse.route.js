// nurses.js
import express from 'express';
import Nurse from '../models/Nurse.js'; // Đường dẫn tới model Nurse

const router = express.Router();

// 1. Lấy danh sách tất cả y tá
router.get('/', async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.status(200).json(nurses);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy danh sách y tá' });
  }
});

// 2. Lấy thông tin chi tiết của một y tá theo ID
router.get('/:id', async (req, res) => {
  try {
    const nurse = await Nurse.findById(req.params.id);
    if (!nurse) {
      return res.status(404).json({ error: 'Không tìm thấy y tá' });
    }
    res.status(200).json(nurse);
  } catch (error) {
    res.status(500).json({ error: 'Không thể lấy thông tin y tá' });
  }
});

// 3. Thêm mới một y tá
router.post('/', async (req, res) => {
  try {
    const newNurse = new Nurse(req.body);
    await newNurse.save();
    res.status(201).json(newNurse);
  } catch (error) {
    res.status(500).json({ error: 'Không thể thêm y tá' });
  }
});

// 4. Cập nhật thông tin một y tá theo ID
router.put('/:id', async (req, res) => {
  try {
    const updatedNurse = await Nurse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNurse) {
      return res.status(404).json({ error: 'Không tìm thấy y tá' });
    }
    res.status(200).json(updatedNurse);
  } catch (error) {
    res.status(500).json({ error: 'Không thể cập nhật thông tin y tá' });
  }
});

// 5. Xóa một y tá theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNurse = await Nurse.findByIdAndDelete(req.params.id);
    if (!deletedNurse) {
      return res.status(404).json({ error: 'Không tìm thấy y tá' });
    }
    res.status(200).json({ message: 'Xóa y tá thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Không thể xóa y tá' });
  }
});

export default router;
