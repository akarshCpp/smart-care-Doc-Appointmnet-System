const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    timeSlot: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled', 'completed'],
      default: 'pending',
    },
    reason: {
      type: String,
      required: [true, 'Reason for appointment is required'],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    cancelReason: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
appointmentSchema.index({ patient: 1, date: -1 });
appointmentSchema.index({ doctor: 1, date: -1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
