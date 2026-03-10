# 🏥 Smart Care - Doctor Appointment System

A full-stack MERN application for managing doctor appointments with role-based access control.

## 🚀 Tech Stack

- **Frontend**: React.js 18, React Router v6, Axios, react-hot-toast
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT (JSON Web Tokens), bcryptjs
- **Validation**: express-validator

---

## 📂 Project Structure

```
smart-care/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Login, Register, GetMe
│   │   ├── doctorController.js   # Doctor CRUD & availability
│   │   ├── appointmentController.js
│   │   ├── adminController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js               # protect + authorize
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── adminRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── seed.js                   # Demo data seeder
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   └── layout/
        │       ├── Navbar.jsx
        │       └── Layout.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── patient/
        │   │   ├── PatientDashboard.jsx
        │   │   ├── DoctorList.jsx
        │   │   ├── DoctorProfile.jsx
        │   │   ├── BookAppointment.jsx
        │   │   └── MyAppointments.jsx
        │   ├── doctor/
        │   │   ├── DoctorDashboard.jsx
        │   │   ├── DoctorAppointments.jsx
        │   │   ├── DoctorProfileEdit.jsx
        │   │   └── AvailabilityManager.jsx
        │   └── admin/
        │       ├── AdminDashboard.jsx
        │       ├── ManageUsers.jsx
        │       ├── ManageDoctors.jsx
        │       └── AdminAppointments.jsx
        ├── services/
        │   └── api.js            # Axios instance
        ├── App.jsx
        ├── index.js
        └── index.css
```

---

## ⚙️ Setup & Run Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
# Install backend dependencies
cd smart-care/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartcare
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Seed the Database (Optional but recommended)

```bash
cd backend
node seed.js
```

This creates demo users:
| Role    | Email                     | Password   |
|---------|---------------------------|------------|
| Admin   | admin@smartcare.com       | admin123   |
| Doctor  | doctor@smartcare.com      | doctor123  |
| Patient | patient@smartcare.com     | patient123 |

### 4. Run Backend

```bash
cd backend
npm run dev    # development with nodemon
# or
npm start      # production
```

Backend runs on: http://localhost:5000

### 5. Run Frontend

```bash
cd frontend
npm start
```

Frontend runs on: http://localhost:3000

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login |
| GET | /api/auth/me | Private | Current user |

### Doctors
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/doctors | Public | List approved doctors |
| GET | /api/doctors/specializations | Public | Get all specializations |
| GET | /api/doctors/:id | Public | Doctor detail |
| GET | /api/doctors/profile/me | Doctor | Own profile |
| PUT | /api/doctors/profile | Doctor | Update profile |
| PUT | /api/doctors/availability | Doctor | Update availability |

### Appointments
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/appointments | Patient | Book appointment |
| GET | /api/appointments/my | Patient | My appointments |
| GET | /api/appointments/doctor | Doctor | Doctor's appointments |
| GET | /api/appointments/all | Admin | All appointments |
| PUT | /api/appointments/:id/status | Doctor | Approve/Reject |
| PUT | /api/appointments/:id/cancel | Patient | Cancel |
| PUT | /api/appointments/:id/reschedule | Patient | Reschedule |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/admin/stats | Admin | Dashboard stats |
| GET | /api/admin/users | Admin | All users |
| PUT | /api/admin/users/:id/toggle | Admin | Toggle user status |
| GET | /api/admin/doctors | Admin | All doctors |
| GET | /api/admin/doctors/pending | Admin | Pending approvals |
| PUT | /api/admin/doctors/:id/approve | Admin | Approve/Reject doctor |

---

## 🔐 Role-Based Access

| Feature | Patient | Doctor | Admin |
|---------|---------|--------|-------|
| Browse doctors | ✅ | ✅ | ✅ |
| Book appointment | ✅ | ❌ | ❌ |
| Cancel/Reschedule | ✅ | ❌ | ❌ |
| View own appointments | ✅ | ✅ | ✅ |
| Approve/Reject appointments | ❌ | ✅ | ❌ |
| Set availability | ❌ | ✅ | ❌ |
| Approve doctors | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |
| View all appointments | ❌ | ❌ | ✅ |

---

## 🛡️ Security Features

- JWT authentication with expiry
- Passwords hashed with bcrypt (10 salt rounds)
- Role-based route protection
- Input validation with express-validator
- CORS enabled
- Account deactivation support

---

## 📸 Features Walkthrough

1. **Patient** registers → browses doctors by specialization → views doctor profile → books appointment slot → views appointment history → can cancel/reschedule
2. **Doctor** registers (pending admin approval) → sets availability → approves/rejects patient bookings → marks appointments complete
3. **Admin** logs in → views dashboard stats → approves doctor registrations → manages user accounts → monitors all appointments

---

Built with ❤️ using the MERN Stack
