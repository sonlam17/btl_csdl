import express from 'express';
import Visit from '../models/Visit.js'; 
import Nurse from '../models/Nurse.js'; 
import Doctor from '../models/Doctor.js'; 
import Patient from '../models/Patient.js'; 
import Medication from '../models/Medication.js'; 

const router = express.Router();
router.get('/diagnosis-summary/:month/:year', async (req, res) => {
  const { month, year } = req.params;

  // Lấy ngày đầu và cuối của tháng
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  try {
    const result = await Visit.aggregate([
      {
        $match: {
          visit_date: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: "$diagnosis", // Nhóm theo chẩn đoán
          patient_count: { $addToSet: "$patient_id" }, // Lưu danh sách bệnh nhân
          patients: {
            $push: {
              patient_id: "$patient_id",
              visit_date: "$visit_date"
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          patient_count: { $size: "$patient_count" }, // Đếm số bệnh nhân
          patients: "$patients"
        }
      },
      {
        $sort: { patient_count: -1 } // Sắp xếp theo số bệnh nhân giảm dần
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy dữ liệu' });
  }
});
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
    const { patient_id, doctor_id, nurse_id, prescriptions, diagnosis} = req.body;

    // Kiểm tra sự tồn tại của bệnh nhân
    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return res.status(404).json({ error: 'Bệnh nhân không tồn tại' });
    }

    // Kiểm tra sự tồn tại của bác sĩ
    const doctor = await Doctor.findById(doctor_id);
    if (!doctor) {
      return res.status(404).json({ error: 'Bác sĩ không tồn tại' });
    }

    // Kiểm tra sự tồn tại của y tá
    const nurse = await Nurse.findById(nurse_id);
    if (!nurse) {
      return res.status(404).json({ error: 'Y tá không tồn tại' });
    }

    // Kiểm tra sự tồn tại của các loại thuốc trong mảng prescriptions
    for (const prescription of prescriptions) {
      const medication = await Medication.findById(prescription.medication_id);
      if (!medication) {
        return res.status(404).json({ error: `Thuốc với ID ${prescription.medication_id} không tồn tại` });
      }
    }
    const previousVisit = await Visit.findOne({
      patient_id: patient_id,
      diagnosis: diagnosis
    });

    if (previousVisit) {
      // Nếu có lần khám trước với bác sĩ khác, trả lỗi
      if (previousVisit.doctor_id.toString() !== doctor_id) {
        return res.status(400).json({
          error: 'Bệnh nhân đã khám bệnh này với bác sĩ khác trước đó. Không thể thay đổi bác sĩ'
        });
      }
    }

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
    const { patient_id, doctor_id, nurse_id, prescriptions } = req.body;

    // Kiểm tra sự tồn tại của bệnh nhân
    const patient = await Patient.findById(patient_id);
    if (!patient) {
      return res.status(404).json({ error: 'Bệnh nhân không tồn tại' });
    }

    // Kiểm tra sự tồn tại của bác sĩ
    const doctor = await Doctor.findById(doctor_id);
    if (!doctor) {
      return res.status(404).json({ error: 'Bác sĩ không tồn tại' });
    }

    // Kiểm tra sự tồn tại của y tá
    const nurse = await Nurse.findById(nurse_id);
    if (!nurse) {
      return res.status(404).json({ error: 'Y tá không tồn tại' });
    }

    // Kiểm tra sự tồn tại của các loại thuốc trong mảng prescriptions
    for (const prescription of prescriptions) {
      const medication = await Medication.findById(prescription.medication_id);
      if (!medication) {
        return res.status(404).json({ error: `Thuốc với ID ${prescription.medication_id} không tồn tại` });
      }
    }

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
