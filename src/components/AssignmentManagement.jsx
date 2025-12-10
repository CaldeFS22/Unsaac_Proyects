import React, { useState } from 'react';
import { Search, UserPlus, FileUp, Zap } from 'lucide-react';

export default function AssignmentManagement() {
  const [students, setStudents] = useState([
    { id: 101, code: '20230001', name: 'Carlos Quispe', tutor: 'Sin asignar', state: 'Pendiente' },
    { id: 102, code: '20230002', name: 'Luisa Flores', tutor: 'María García', state: 'Asignado' },
    // ... más estudiantes
  ]);
  const [tutors, setTutors] = useState([
    { id: 1, name: 'María García', capacity: 10, assigned: 1 },
    { id: 2, name: 'Juan Castillo', capacity: 12, assigned: 0 },
  ]);

  return (
    <div className="space-y-8">
      {/* Opciones de Asignación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-blue-500 text-white rounded-xl p-4 hover:bg-blue-600 transition-all flex flex-col items-center justify-center gap-2">
          <UserPlus size={24} />
          <span className="font-semibold">Asignación Individual</span>
          <span className="text-xs text-blue-100">Asignar 1 estudiante</span>
        </button>
        <button className="bg-orange-500 text-white rounded-xl p-4 hover:bg-orange-600 transition-all flex flex-col items-center justify-center gap-2">
          <FileUp size={24} />
          <span className="font-semibold">Carga Masiva (CSV)</span>
          <span className="text-xs text-orange-100">Importar lista de asignaciones</span>
        </button>
        <button className="bg-teal-500 text-white rounded-xl p-4 hover:bg-teal-600 transition-all flex flex-col items-center justify-center gap-2">
          <Zap size={24} />
          <span className="font-semibold">Asignación Automática</span>
          <span className="text-xs text-teal-100">Usar algoritmo de balanceo</span>
        </button>
      </div>

      {/* Lista de Estudiantes para Asignar */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Estudiantes Pendientes / Asignados</h3>
        <div className="flex mb-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200">
            <Search size={20} />
          </button>
        </div>

        {/* Tabla simplificada */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor Asignado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-code text-gray-900">{student.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.tutor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.state === 'Asignado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {student.state}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      {student.state === 'Asignado' ? 'Reasignar' : 'Asignar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}