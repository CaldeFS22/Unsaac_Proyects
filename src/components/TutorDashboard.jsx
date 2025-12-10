import React from "react";

export default function TutorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Dashboard del Tutor
        </h1>

        <p className="text-gray-600 mb-6">
          Bienvenido, <span className="font-semibold">{user?.email}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Mis Estudiantes
            </h2>
            <p className="text-sm text-gray-700">
              Ver la lista de estudiantes asignados y su progreso.
            </p>
          </div>

          <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Registrar Sesiones
            </h2>
            <p className="text-sm text-gray-700">
              Registrar tutorías realizadas durante el semestre.
            </p>
          </div>

          <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">
              Horarios
            </h2>
            <p className="text-sm text-gray-700">
              Ver y actualizar tus horarios de tutoría.
            </p>
          </div>

          <div className="p-5 bg-purple-50 border border-purple-200 rounded-xl">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">
              Reportes
            </h2>
            <p className="text-sm text-gray-700">
              Generar reportes de sesiones y actividades.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="mt-8 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
