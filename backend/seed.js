const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Doctor.deleteMany({});
  await Appointment.deleteMany({});

  // Create admin
  const admin = await User.create({
    name: 'System Admin',
    email: 'admin@smartcare.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1-000-000-0000',
  });
  console.log('Admin created:', admin.email);

  // Create patient
  const patient = await User.create({
    name: 'John Patient',
    email: 'patient@smartcare.com',
    password: 'patient123',
    role: 'patient',
    phone: '+1-111-111-1111',
  });
  console.log('Patient created:', patient.email);

  // Create doctors
  const doctorUsers = [
    { name: 'Dr. Emily Carter', email: 'doctor@smartcare.com', password: 'doctor123', phone: '+1-222-222-2222' },
    { name: 'Dr. Michael Chen', email: 'mchen@smartcare.com', password: 'doctor123', phone: '+1-333-333-3333' },
    { name: 'Dr. Sarah Johnson', email: 'sjohnson@smartcare.com', password: 'doctor123', phone: '+1-444-444-4444' },
  ];

  const doctorSpecializations = [
    {
      specialization: 'Cardiology', qualification: 'MBBS, MD (Cardiology)', experience: 12,
      bio: 'Specialist in heart diseases with over 12 years experience.', consultationFee: 150,
      hospital: 'City Heart Hospital', isApproved: true,
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
        { day: 'Wednesday', startTime: '09:00', endTime: '13:00', slotDuration: 30 },
        { day: 'Friday', startTime: '14:00', endTime: '18:00', slotDuration: 30 },
      ],
    },
    {
      specialization: 'Dermatology', qualification: 'MBBS, MD (Dermatology)', experience: 8,
      bio: 'Expert dermatologist specializing in skin diseases and cosmetic procedures.', consultationFee: 120,
      hospital: 'Skin Care Clinic', isApproved: true,
      availability: [
        { day: 'Tuesday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
        { day: 'Thursday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      ],
    },
    {
      specialization: 'Pediatrics', qualification: 'MBBS, DCH', experience: 15,
      bio: 'Dedicated pediatrician caring for children from birth to 18 years.', consultationFee: 100,
      hospital: "Children's Care Hospital", isApproved: true,
      availability: [
        { day: 'Monday', startTime: '08:00', endTime: '12:00', slotDuration: 30 },
        { day: 'Tuesday', startTime: '14:00', endTime: '18:00', slotDuration: 30 },
        { day: 'Saturday', startTime: '09:00', endTime: '13:00', slotDuration: 30 },
      ],
    },
  ];

  const createdDoctorUsers = [];
  for (const du of doctorUsers) {
    const u = await User.create({ ...du, role: 'doctor' });
    createdDoctorUsers.push(u);
  }

  const createdDoctors = [];
  for (let i = 0; i < createdDoctorUsers.length; i++) {
    const d = await Doctor.create({ user: createdDoctorUsers[i]._id, ...doctorSpecializations[i] });
    createdDoctors.push(d);
  }
  console.log('Doctors created:', createdDoctorUsers.map(d => d.email).join(', '));

  // Create sample appointment
  await Appointment.create({
    patient: patient._id,
    doctor: createdDoctors[0]._id,
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    timeSlot: { startTime: '10:00', endTime: '10:30' },
    reason: 'Routine cardiac checkup',
    status: 'approved',
  });

  console.log('Sample appointment created');
  console.log('\n✅ Database seeded successfully!');
  console.log('\n📋 Login credentials:');
  console.log('  Admin:   admin@smartcare.com / admin123');
  console.log('  Doctor:  doctor@smartcare.com / doctor123');
  console.log('  Patient: patient@smartcare.com / patient123');

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
