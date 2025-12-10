import React, { useState } from 'react';
import { UserPlus, UserX, Settings, Search } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin Principal', email: 'admin@uni.edu.pe', role: 'Administrador', status: 'Activo' },
    { id: 2, name: 'María García', email: 'm.garcia@uni.edu.pe', role: 'Tutor', status: 'Activo' },
    { id: 3, name: 'Juan Pérez', email: 'j.perez@uni.edu.pe', role: 'Tutor', status: 'Activo' },
    { id: 4, name: 'Carlos Quispe', email: 'c.quispe@uni.edu.pe', role: 'Estudiante', status: 'Activo' },
    { id: 5, name: 'Luis Ramos', email: 'l.ramos@uni.edu.pe', role: 'Estudiante', status: 'Inactivo' },
  ]);

  const getRoleBadge = (role) => {
    const roleClasses = {
      'Administrador': 'bg-red-100 text-red-800',
      'Tutor': 'bg-green-100 text-green-800',
      'Estudiante': 'bg-blue-100 text-blue-800',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleClasses[role]}`}>{role}</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Gestionar Usuarios</h3>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <UserPlus size={18} />
          Crear Nuevo Usuario
        </button>
      </div>

      <div className="flex mb-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, email o rol..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200">
            <Search size={20} />
          </button>
      </div>

      {/* Tabla de Usuarios */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-50" title="Configurar">
                      <Settings size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50" title="Desactivar">
                      <UserX size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}