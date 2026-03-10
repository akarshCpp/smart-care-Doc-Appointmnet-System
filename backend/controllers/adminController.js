const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (admin)
const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalDoctors, totalAppointments, pendingDoctors, pendingAppointments] = await Promise.all([
      User.countDocuments({ role: 'patient' }),
      Doctor.countDocuments({ isApproved: true }),
      Appointment.countDocuments(),
      Doctor.countDocuments({ isApproved: false }),
      Appointment.countDocuments({ status: 'pending' }),
    ]);

    const appointmentsByStatus = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalDoctors,
        totalAppointments,
        pendingDoctors,
        pendingAppointments,
        appointmentsByStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (admin)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/toggle
// @access  Private (admin)
const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}`, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Get pending doctor approvals
// @route   GET /api/admin/doctors/pending
// @access  Private (admin)
const getPendingDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ isApproved: false }).populate('user', 'name email phone createdAt');
    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve/reject doctor
// @route   PUT /api/admin/doctors/:id/approve
// @access  Private (admin)
const approveDoctor = async (req, res, next) => {
  try {
    const { isApproved } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { isApproved }, { new: true }).populate('user', 'name email');
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    res.json({
      success: true,
      message: `Doctor ${isApproved ? 'approved' : 'rejected'}`,
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all doctors (admin)
// @route   GET /api/admin/doctors
// @access  Private (admin)
const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email phone isActive createdAt').sort({ createdAt: -1 });
    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats, getAllUsers, toggleUserStatus, getPendingDoctors, approveDoctor, getAllDoctors };
