import React, { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function SemesterManagement() {
  const [semesters, setSemesters] = useState([
    { id: 1, name: '2025-II', startDate: '01/08/2025', endDate: '31/12/2025', status: 'Activo' },
    { id: 2, name: '2025-I', startDate: '01/03/2025', endDate: '31/07/2025', status: 'Cerrado' },
    { id: 3, name: '2024-II', startDate: '01/08/2024', endDate: '31/12/2024', status: 'Cerrado' },
  ]);
  const [showModal, setShowModal] = useState(false);

  // Funciones placeholder (se deben conectar al backend)
  const handleCreateSemester = () => {
    // Lógica para abrir el modal o formulario de creación
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Activo':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle size={14} /> Activo</span>;
      case 'Cerrado':
        return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 flex items-center gap-1"><XCircle size={14} /> Cerrado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestionar Semestres</h3>
        <button
          onClick={handleCreateSemester}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Nuevo Semestre
        </button>
      </div>

      {/* Tabla de Semestres */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Fin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {semesters.map((semester) => (
              <tr key={semester.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{semester.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{semester.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{semester.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(semester.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50" title="Editar">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50" title="Eliminar/Cerrar">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder para Modal de Creación */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h4 className="text-lg font-bold mb-4">Crear Nuevo Semestre</h4>
            <p className="text-sm text-gray-600">Formulario para ingresar nombre, fechas de inicio y fin.</p>
            <button 
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}