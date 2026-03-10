const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all approved doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res, next) => {
  try {
    const { specialization, search } = req.query;
    const query = { isApproved: true };

    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }

    let doctors = await Doctor.find(query).populate('user', 'name email phone avatar');

    if (search) {
      doctors = doctors.filter(
        (d) =>
          d.user.name.toLowerCase().includes(search.toLowerCase()) ||
          d.specialization.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctor profile by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email phone avatar');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctor's own profile
// @route   GET /api/doctors/profile/me
// @access  Private (doctor)
const getMyProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id }).populate('user', 'name email phone avatar');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private (doctor)
const updateProfile = async (req, res, next) => {
  try {
    const { specialization, qualification, experience, bio, consultationFee, hospital, address, name, phone } = req.body;

    // Update user info
    await User.findByIdAndUpdate(req.user._id, { name, phone });

    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user._id },
      { specialization, qualification, experience, bio, consultationFee, hospital, address },
      { new: true, runValidators: true }
    ).populate('user', 'name email phone avatar');

    res.json({ success: true, message: 'Profile updated successfully', data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Update availability slots
// @route   PUT /api/doctors/availability
// @access  Private (doctor)
const updateAvailability = async (req, res, next) => {
  try {
    const { availability } = req.body;

    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user._id },
      { availability },
      { new: true }
    );

    res.json({ success: true, message: 'Availability updated successfully', data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all specializations
// @route   GET /api/doctors/specializations
// @access  Public
const getSpecializations = async (req, res, next) => {
  try {
    const specializations = await Doctor.distinct('specialization', { isApproved: true });
    res.json({ success: true, data: specializations });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDoctors, getDoctorById, getMyProfile, updateProfile, updateAvailability, getSpecializations };
