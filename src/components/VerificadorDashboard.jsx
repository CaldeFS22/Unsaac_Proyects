import React from "react";

export default function VerificadorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Dashboard del Verificador
        </h1>

        <p className="text-gray-600 mb-6">
          Bienvenido, <span className="font-semibold">{user?.email}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Revisar Reportes
            </h2>
            <p className="text-sm text-gray-700">
              Validar reportes enviados por los tutores.
            </p>
          </div>

          <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Ver Sesiones
            </h2>
            <p className="text-sm text-gray-700">
              Revisar las sesiones de tutoría realizadas.
            </p>
          </div>

          <div className="p-5 bg-orange-50 border border-orange-200 rounded-xl">
            <h2 className="text-xl font-semibold text-orange-800 mb-2">
              Historial
            </h2>
            <p className="text-sm text-gray-700">
              Acceder al historial de tutorías verificadas.
            </p>
          </div>

          <div className="p-5 bg-red-50 border border-red-200 rounded-xl">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Observaciones
            </h2>
            <p className="text-sm text-gray-700">
              Dejar observaciones y comentarios a los tutores.
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
