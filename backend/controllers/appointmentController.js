const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Book appointment
// @route   POST /api/appointments
// @access  Private (patient)
const bookAppointment = async (req, res, next) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isApproved) {
      return res.status(404).json({ success: false, message: 'Doctor not found or not approved' });
    }

    // Check for conflicting appointments
    const conflict = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      'timeSlot.startTime': timeSlot.startTime,
      status: { $in: ['pending', 'approved'] },
    });

    if (conflict) {
      return res.status(400).json({ success: false, message: 'This time slot is already booked' });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date: new Date(date),
      timeSlot,
      reason,
    });

    await appointment.populate([
      { path: 'patient', select: 'name email phone' },
      { path: 'doctor', populate: { path: 'user', select: 'name email' } },
    ]);

    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient's appointments
// @route   GET /api/appointments/my
// @access  Private (patient)
const getMyAppointments = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { patient: req.user._id };
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name email avatar' } })
      .sort({ date: -1 });

    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctor's appointments
// @route   GET /api/appointments/doctor
// @access  Private (doctor)
const getDoctorAppointments = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor profile not found' });

    const { status, date } = req.query;
    const query = { doctor: doctor._id };
    if (status) query.status = status;
    if (date) query.date = new Date(date);

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone avatar')
      .sort({ date: -1 });

    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status (doctor)
// @route   PUT /api/appointments/:id/status
// @access  Private (doctor)
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const doctor = await Doctor.findOne({ user: req.user._id });

    const appointment = await Appointment.findOne({ _id: req.params.id, doctor: doctor._id });
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    appointment.status = status;
    if (req.body.notes) appointment.notes = req.body.notes;
    await appointment.save();

    res.json({ success: true, message: `Appointment ${status}`, data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel appointment (patient)
// @route   PUT /api/appointments/:id/cancel
// @access  Private (patient)
const cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id, patient: req.user._id });
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (['cancelled', 'completed'].includes(appointment.status)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel this appointment' });
    }

    appointment.status = 'cancelled';
    appointment.cancelReason = req.body.cancelReason || '';
    await appointment.save();

    res.json({ success: true, message: 'Appointment cancelled', data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Reschedule appointment (patient)
// @route   PUT /api/appointments/:id/reschedule
// @access  Private (patient)
const rescheduleAppointment = async (req, res, next) => {
  try {
    const { date, timeSlot } = req.body;
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.user._id,
      status: { $in: ['pending', 'approved'] },
    });

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found or cannot be rescheduled' });
    }

    // Check for conflict at new time
    const conflict = await Appointment.findOne({
      _id: { $ne: req.params.id },
      doctor: appointment.doctor,
      date: new Date(date),
      'timeSlot.startTime': timeSlot.startTime,
      status: { $in: ['pending', 'approved'] },
    });

    if (conflict) {
      return res.status(400).json({ success: false, message: 'This time slot is already booked' });
    }

    appointment.date = new Date(date);
    appointment.timeSlot = timeSlot;
    appointment.status = 'pending';
    await appointment.save();

    res.json({ success: true, message: 'Appointment rescheduled', data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments (admin)
// @route   GET /api/appointments/all
// @access  Private (admin)
const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate({ path: 'doctor', populate: { path: 'user', select: 'name email' } })
      .sort({ createdAt: -1 });

    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment,
  getAllAppointments,
};
