const express = require('express');
const router = express.Router();
const {
  getStats,
  getAllUsers,
  toggleUserStatus,
  getPendingDoctors,
  approveDoctor,
  getAllDoctors,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.put('/users/:id/toggle', toggleUserStatus);
router.get('/doctors', getAllDoctors);
router.get('/doctors/pending', getPendingDoctors);
router.put('/doctors/:id/approve', approveDoctor);

module.exports = router;
