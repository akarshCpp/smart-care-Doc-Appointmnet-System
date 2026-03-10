const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  getMyProfile,
  updateProfile,
  updateAvailability,
  getSpecializations,
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getDoctors);
router.get('/specializations', getSpecializations);
router.get('/profile/me', protect, authorize('doctor'), getMyProfile);
router.put('/profile', protect, authorize('doctor'), updateProfile);
router.put('/availability', protect, authorize('doctor'), updateAvailability);
router.get('/:id', getDoctorById);

module.exports = router;
