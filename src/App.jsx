import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddMedication from "./pages/AddMedication";
import UploadPrescription from "./pages/UploadPrescription";
import GeneratePrescription from "./pages/GeneratePrescription";
import AddDrug from "./pages/AddDrug";
import Contact from "./pages/Contact";
import CalendarView from "./pages/CalendarView";
import HistoryLog from "./pages/HistoryLog";
import RefillTracker from "./pages/RefillTracker";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorLogin from "./pages/DoctorLogin";
import PatientLogin from "./pages/PatientLogin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import ViewPatientHistory from "./pages/ViewPatientHistory";


// ✅ Simplified Role-Based Route Protection (no Firebase login check)
const RoleProtectedRoute = ({ children, role }) => {
  const currentRole = localStorage.getItem("userRole");
  if (currentRole !== role) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/patient-login" element={<PatientLogin />} />

          {/* Patient Routes */}
          <Route
            path="/patient-dashboard"
            element={
              <RoleProtectedRoute role="patient">
                <PatientDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/add-medication"
            element={
              <RoleProtectedRoute role="patient">
                <AddMedication />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <RoleProtectedRoute role="patient">
                <CalendarView />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/history-log"
            element={
              <RoleProtectedRoute role="patient">
                <HistoryLog />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/refill-tracker"
            element={
              <RoleProtectedRoute role="patient">
                <RefillTracker />
              </RoleProtectedRoute>
            }
          />

          {/* Doctor Routes */}
          <Route
            path="/doctor-dashboard"
            element={
              <RoleProtectedRoute role="doctor">
                <DoctorDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/add-drug"
            element={
              <RoleProtectedRoute role="doctor">
                <AddDrug />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/generate"
            element={
              <RoleProtectedRoute role="doctor">
                <GeneratePrescription />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <RoleProtectedRoute role="doctor">
                <UploadPrescription />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/view-patient-history"
            element={
              <RoleProtectedRoute role="doctor">
                <ViewPatientHistory />
              </RoleProtectedRoute>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
