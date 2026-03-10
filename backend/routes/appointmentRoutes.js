const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment,
  getAllAppointments,
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post(
  '/',
  protect,
  authorize('patient'),
  [
    body('doctorId').notEmpty().withMessage('Doctor ID is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
    body('reason').trim().notEmpty().withMessage('Reason is required'),
  ],
  validate,
  bookAppointment
);

router.get('/my', protect, authorize('patient'), getMyAppointments);
router.get('/doctor', protect, authorize('doctor'), getDoctorAppointments);
router.get('/all', protect, authorize('admin'), getAllAppointments);
router.put('/:id/status', protect, authorize('doctor'), updateAppointmentStatus);
router.put('/:id/cancel', protect, authorize('patient'), cancelAppointment);
router.put('/:id/reschedule', protect, authorize('patient'), rescheduleAppointment);

module.exports = router;
