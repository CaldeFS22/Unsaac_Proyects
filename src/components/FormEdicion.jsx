
import React, { useState } from 'react';
import { X, Save, UserCheck, Users, Calendar, Trash2, Plus, Search } from 'lucide-react';

export default function EditarCronogramaForm({ cronograma, onClose, onSave }) {
  // Estado del formulario
  const [formData, setFormData] = useState({
    semestre: cronograma?.semestre || '2025-I',
    fechaInicio: cronograma?.fechaInicio || '2025-03-15',
    fechaFin: cronograma?.fechaFin || '2025-07-20',
    estado: cronograma?.estado || 'En borrador',
    tutor: cronograma?.tutor || {
      id: 1,
      nombre: 'Dr. Juan Pérez García',
      email: 'juan.perez@unsaac.edu.pe',
      especialidad: 'Ingeniería de Software'
    }
  });

  // Lista de alumnos asignados
  const [alumnos, setAlumnos] = useState(cronograma?.alumnos || [
    { id: 1, codigo: '191234', nombre: 'María González Quispe', ciclo: '8vo', email: 'maria.gonzalez@unsaac.edu.pe' },
    { id: 2, codigo: '191235', nombre: 'Carlos Huamán Torres', ciclo: '7mo', email: 'carlos.huaman@unsaac.edu.pe' },
    { id: 3, codigo: '191236', nombre: 'Ana Ccari Mamani', ciclo: '8vo', email: 'ana.ccari@unsaac.edu.pe' },
    { id: 4, codigo: '191237', nombre: 'Pedro Sánchez Flores', ciclo: '6to', email: 'pedro.sanchez@unsaac.edu.pe' },
    { id: 5, codigo: '191238', nombre: 'Lucía Vargas Condori', ciclo: '8vo', email: 'lucia.vargas@unsaac.edu.pe' }
  ]);

  // Lista de tutores disponibles (para cambiar tutor)
  const tutoresDisponibles = [
    { id: 1, nombre: 'Dr. Juan Pérez García', especialidad: 'Ingeniería de Software' },
    { id: 2, nombre: 'Dra. María López Condori', especialidad: 'Base de Datos' },
    { id: 3, nombre: 'Mg. Carlos Quispe Huamán', especialidad: 'Redes y Comunicaciones' },
    { id: 4, nombre: 'Dr. Roberto Ccari Torres', especialidad: 'Inteligencia Artificial' }
  ];

  // Estado para búsqueda de alumnos
  const [searchAlumno, setSearchAlumno] = useState('');
  const [showAddAlumno, setShowAddAlumno] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTutorChange = (e) => {
    const tutorId = parseInt(e.target.value);
    const tutorSeleccionado = tutoresDisponibles.find(t => t.id === tutorId);
    setFormData(prev => ({
      ...prev,
      tutor: tutorSeleccionado
    }));
  };

  const eliminarAlumno = (alumnoId) => {
    setAlumnos(prev => prev.filter(a => a.id !== alumnoId));
  };

  const handleSubmit = () => {
    const dataToSave = {
      ...formData,
      alumnos
    };
    onSave(dataToSave);
  };

  const alumnosFiltrados = alumnos.filter(alumno =>
    alumno.nombre.toLowerCase().includes(searchAlumno.toLowerCase()) ||
    alumno.codigo.includes(searchAlumno)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Editar Cronograma</h2>
            <p className="text-sm text-gray-500">Modifica la información del semestre y gestiona asignaciones</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Información del Semestre */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-900" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Información del Semestre</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semestre Académico
                </label>
                <input
                  type="text"
                  name="semestre"
                  value={formData.semestre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2025-I"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="En borrador">En borrador</option>
                  <option value="Publicado">Publicado</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Finalización
                </label>
                <input
                  type="date"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Información del Tutor */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="text-blue-900" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Tutor Asignado</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar Tutor
                </label>
                <select
                  value={formData.tutor.id}
                  onChange={handleTutorChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {tutoresDisponibles.map(tutor => (
                    <option key={tutor.id} value={tutor.id}>
                      {tutor.nombre} - {tutor.especialidad}
                    </option>
                  ))}
                </select>
              </div>

              {/* Información del tutor seleccionado */}
              {formData.tutor && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {formData.tutor.nombre.split(' ')[0][0]}{formData.tutor.nombre.split(' ')[1]?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{formData.tutor.nombre}</p>
                      <p className="text-sm text-gray-600">{formData.tutor.especialidad}</p>
                      {formData.tutor.email && (
                        <p className="text-xs text-gray-500">{formData.tutor.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lista de Alumnos Asignados */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="text-green-700" size={24} />
                <h3 className="text-lg font-bold text-gray-800">
                  Alumnos Asignados ({alumnos.length})
                </h3>
              </div>
              <button
                onClick={() => setShowAddAlumno(!showAddAlumno)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Plus size={18} />
                Agregar Alumno
              </button>
            </div>

            {/* Buscador */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nombre o código..."
                  value={searchAlumno}
                  onChange={(e) => setSearchAlumno(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* Tabla de Alumnos */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto max-h-80">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Código</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nombre</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ciclo</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {alumnosFiltrados.length > 0 ? (
                      alumnosFiltrados.map((alumno) => (
                        <tr key={alumno.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{alumno.codigo}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{alumno.nombre}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{alumno.ciclo}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{alumno.email}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => eliminarAlumno(alumno.id)}
                              className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-colors"
                              title="Eliminar alumno"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          No se encontraron alumnos
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {alumnos.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users size={48} className="mx-auto mb-2 text-gray-300" />
                <p>No hay alumnos asignados a este cronograma</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer con botones */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium flex items-center gap-2"
          >
            <Save size={20} />
            Guardar Cambios
          </button>
        </div>

      </div>
    </div>
  );
}