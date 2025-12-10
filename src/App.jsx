import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import EstudianteDashboard from "./components/EstudianteDashboard";
import TutorDashboard from "./components/TutorDashboard";
import VerificadorDashboard from "./components/VerificadorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PagDenegada from "./components/PagDenegada";
import CreacionUsuarios from "./components/CreacionUsuarios";

// SUBPÁGINAS DIRECTAS DEL ADMIN (CONTROLADAS DESDE AdminDashboard)
import SemesterManagement from "./components/SemesterManagement";
import UserManagement from "./components/UserManagement";
import AssignmentManagement from "./components/AssignmentManagement";
import ReportsView from "./components/ReportsView";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* SUBRUTAS DEL ADMIN (para navegación directa por URL) */}
        <Route
          path="/admin/semestres"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/asignar"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reportes"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ESTUDIANTE */}
        <Route
          path="/estudiante/dashboard"
          element={
            <ProtectedRoute role="ESTUDIANTE">
              <EstudianteDashboard />
            </ProtectedRoute>
          }
        />

        {/* TUTOR */}
        <Route
          path="/tutor/dashboard"
          element={
            <ProtectedRoute role="TUTOR">
              <TutorDashboard />
            </ProtectedRoute>
          }
        />

        {/* VERIFICADOR */}
        <Route
          path="/verificador/dashboard"
          element={
            <ProtectedRoute role="VERIFICADOR">
              <VerificadorDashboard />
            </ProtectedRoute>
          }
        />

        {/* ACCESO DENEGADO */}
        <Route path="/acceso-denegado" element={<PagDenegada />} />

        {/* CREACIÓN DE USUARIOS */}
        <Route path="/creacionusuarios" element={<CreacionUsuarios />} />

        {/* RUTAS NO EXISTENTES */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
