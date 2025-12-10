import React from "react";

export default function EstudianteDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Dashboard del Estudiante
        </h1>

        <p className="text-gray-600 mb-6">
          Hola, <span className="font-semibold">{user?.email}</span>
        </p>

        <div className="space-y-4">

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-1">Tutorías Pendientes</h2>
            <p className="text-sm text-gray-700">
              Aquí aparecerán las tutorías programadas que aún no completas.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 mb-1">Tutorías Completadas</h2>
            <p className="text-sm text-gray-700">
              Aquí podrás ver el historial de tus tutorías realizadas.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-lg font-semibold text-yellow-800 mb-1">Constancias</h2>
            <p className="text-sm text-gray-700">
              Descarga las constancias emitidas por tus tutores.
            </p>
          </div>

        </div>

        <button
          onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
          className="mt-8 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
