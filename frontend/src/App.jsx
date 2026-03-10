import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// Patient
import DoctorList from './pages/patient/DoctorList';
import DoctorProfile from './pages/patient/DoctorProfile';
import BookAppointment from './pages/patient/BookAppointment';
import MyAppointments from './pages/patient/MyAppointments';
import PatientDashboard from './pages/patient/PatientDashboard';

// Doctor
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorProfileEdit from './pages/doctor/DoctorProfileEdit';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import AvailabilityManager from './pages/doctor/AvailabilityManager';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageDoctors from './pages/admin/ManageDoctors';
import AdminAppointments from './pages/admin/AdminAppointments';

// Layout
import Layout from './components/layout/Layout';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Register />} />

      {/* Patient Routes */}
      <Route path="/doctors" element={<Layout><DoctorList /></Layout>} />
      <Route path="/doctors/:id" element={<Layout><DoctorProfile /></Layout>} />
      <Route
        path="/book/:doctorId"
        element={<ProtectedRoute roles={['patient']}><Layout><BookAppointment /></Layout></ProtectedRoute>}
      />
      <Route
        path="/patient/dashboard"
        element={<ProtectedRoute roles={['patient']}><Layout><PatientDashboard /></Layout></ProtectedRoute>}
      />
      <Route
        path="/patient/appointments"
        element={<ProtectedRoute roles={['patient']}><Layout><MyAppointments /></Layout></ProtectedRoute>}
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor/dashboard"
        element={<ProtectedRoute roles={['doctor']}><Layout><DoctorDashboard /></Layout></ProtectedRoute>}
      />
      <Route
        path="/doctor/profile"
        element={<ProtectedRoute roles={['doctor']}><Layout><DoctorProfileEdit /></Layout></ProtectedRoute>}
      />
      <Route
        path="/doctor/appointments"
        element={<ProtectedRoute roles={['doctor']}><Layout><DoctorAppointments /></Layout></ProtectedRoute>}
      />
      <Route
        path="/doctor/availability"
        element={<ProtectedRoute roles={['doctor']}><Layout><AvailabilityManager /></Layout></ProtectedRoute>}
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute roles={['admin']}><Layout><AdminDashboard /></Layout></ProtectedRoute>}
      />
      <Route
        path="/admin/users"
        element={<ProtectedRoute roles={['admin']}><Layout><ManageUsers /></Layout></ProtectedRoute>}
      />
      <Route
        path="/admin/doctors"
        element={<ProtectedRoute roles={['admin']}><Layout><ManageDoctors /></Layout></ProtectedRoute>}
      />
      <Route
        path="/admin/appointments"
        element={<ProtectedRoute roles={['admin']}><Layout><AdminAppointments /></Layout></ProtectedRoute>}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
