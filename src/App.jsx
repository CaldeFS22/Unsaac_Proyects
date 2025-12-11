import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PagDenegada from "./components/PagDenegada";
import CreacionUsuarios from "./components/CreacionUsuarios";

// Dashboards de roles
import AdminDashboard from "./components/AdminDashboard";
import EstudianteDashboard from "./components/EstudianteDashboard";
import TutorDashboard from "./components/TutorDashboard";
import VerificadorDashboard from "./components/VerificadorDashboard";

// Módulos internos del AdminDashboard
import SemesterManager from "./components/SemesterManager";
import AssignmentManager from "./components/AssignmentManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* ============================================================
                        RUTAS PARA EL ADMINISTRADOR
        ============================================================ */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Rutas internas del panel admin */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Subrutas del administrador (necesarias para que funcionen los <Link>) */}
        <Route
          path="/admin/semesters"
          element={
            <ProtectedRoute role="ADMIN">
              <SemesterManager />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/assignments"
          element={
            <ProtectedRoute role="ADMIN">
              <AssignmentManager />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="ADMIN">
              <div className="p-8 text-xl font-semibold">Módulo de Reportes (Próximamente)</div>
            </ProtectedRoute>
          }
        />

        {/* ============================================================
                        RUTAS DE OTROS ROLES
        ============================================================ */}

        <Route
          path="/estudiante/dashboard"
          element={
            <ProtectedRoute role="ESTUDIANTE">
              <EstudianteDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tutor/dashboard"
          element={
            <ProtectedRoute role="TUTOR">
              <TutorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/verificador/dashboard"
          element={
            <ProtectedRoute role="VERIFICADOR">
              <VerificadorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Página de Acceso Denegado */}
        <Route path="/acceso-denegado" element={<PagDenegada />} />

        {/* Crear usuarios */}
        <Route path="/creacionusuarios" element={<CreacionUsuarios />} />

        {/* Redirección para rutas inválidas */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
