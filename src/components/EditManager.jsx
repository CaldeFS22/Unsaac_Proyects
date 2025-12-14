import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Calendar, FileText, Bell, ChevronDown, LogOut, BookOpen, Pen, Trash2, X, Save, Users, UserCog } from 'lucide-react';
import { API_URL } from "../config";

const EditManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [schedules, setSchedules] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isEditTutorModalOpen, setIsEditTutorModalOpen] = useState(false);
    const [isEditStudentsModalOpen, setIsEditStudentsModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [selectedTutor, setSelectedTutor] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const menuItems = [
        { path: '/admin/semesters', label: 'Semesters & Schedules', icon: Calendar },
        { path: '/admin/assignments', label: 'Assignments', icon: BookOpen },
        { path: '/admin/editar', label: 'Ediciones', icon: Pen },
        { path: '/admin/reports', label: 'Reports', icon: FileText },
    ];

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    // =========================================================
    // 🔵 CARGAR DATOS INICIALES DESDE EL BACKEND
    // =========================================================
    const fetchInitialData = async () => {
        try {
            const schedulesRes = await axios.get(`${API_URL}/api/cronogramas/all`);
            setSchedules(schedulesRes.data);
        } catch (error) {
            console.error("Error loading schedules:", error);
            setMessage({ type: 'error', text: 'Error al cargar los cronogramas.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }

        try {
            const tutorsRes = await axios.get(`${API_URL}/api/admin/tutors`);
            setTutors(tutorsRes.data);
        } catch (error) {
            console.error("Error loading tutors:", error);
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const handleEditTutor = (schedule) => {
        setEditingSchedule(schedule);
        setSelectedTutor(schedule.tutor?.id || '');
        setIsEditTutorModalOpen(true);
    };

    const handleEditStudents = (schedule) => {
        setEditingSchedule(schedule);
        setIsEditStudentsModalOpen(true);
    };

    const handleDelete = async (schedule) => {
        if (!window.confirm(`¿Estás seguro de eliminar el cronograma de ${schedule.tutor?.name} para ${schedule.semester}?`)) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/api/admin/schedules/${schedule.id}`);
            setMessage({ type: 'success', text: 'Cronograma eliminado exitosamente.' });
            fetchInitialData();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error deleting schedule:', error);
            setMessage({ type: 'error', text: 'Error al eliminar el cronograma.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleSaveTutor = async () => {
        if (!selectedTutor) {
            setMessage({ type: 'error', text: 'Seleccione un tutor.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }

        try {
            await axios.put(
                `${API_URL}/api/admin/schedules/${editingSchedule.id}/tutor`,
                { tutor_id: selectedTutor }
            );
            setMessage({ type: 'success', text: 'Tutor actualizado exitosamente.' });
            setIsEditTutorModalOpen(false);
            setEditingSchedule(null);
            setSelectedTutor('');
            fetchInitialData();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error updating tutor:', error);
            setMessage({ type: 'error', text: 'Error al actualizar el tutor.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleRemoveStudent = async (studentId) => {
        if (!window.confirm('¿Estás seguro de eliminar este estudiante de la tutoría?')) {
            return;
        }

        try {
            await axios.delete(
                `${API_URL}/api/admin/schedules/${editingSchedule.id}/students/${studentId}`
            );
            setMessage({ type: 'success', text: 'Estudiante eliminado de la tutoría.' });
            fetchInitialData();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error deleting student:', error);
            setMessage({ type: 'error', text: 'Error al eliminar el estudiante.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const closeTutorModal = () => {
        setIsEditTutorModalOpen(false);
        setEditingSchedule(null);
        setSelectedTutor('');
    };

    const closeStudentsModal = () => {
        setIsEditStudentsModalOpen(false);
        setEditingSchedule(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <img src="/logo_UNSAAC.png" alt="Logo UNSAAC" className="w-10 h-10 object-contain" />
                            <img src="/logo_INFORMATICA.png" alt="Logo EPIIS" className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">Sistema de Tutorías - EPIIS</h1>
                            <p className="text-xs text-gray-500">Panel de Administrador</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowProfile(!showProfile)}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">
                                        {user.full_name?.charAt(0) || 'A'}
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden md:block">
                                    {user.full_name || 'Admin'}
                                </span>
                                <ChevronDown size={16} className="text-gray-500" />
                            </button>
                            {showProfile && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <nav className="w-64 bg-white border-r border-gray-200 hidden lg:block">
                    <div className="p-4 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                    isActiveRoute(item.path)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">Gestión de Cronogramas</h2>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar size={18} />
                                <span>Total: {schedules.length} cronogramas</span>
                            </div>
                        </div>

                        {/* Feedback Message */}
                        {message.text && (
                            <div className={`p-4 rounded-lg border ${
                                message.type === 'success' 
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        {/* Schedules Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Cronogramas Registrados</h3>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="p-3 font-medium text-gray-600 text-sm">Tutor</th>
                                                <th className="p-3 font-medium text-gray-600 text-sm">Código</th>
                                                <th className="p-3 font-medium text-gray-600 text-sm">Semestre</th>
                                                <th className="p-3 font-medium text-gray-600 text-sm">Fecha Inicio</th>
                                                <th className="p-3 font-medium text-gray-600 text-sm">Fecha Fin</th>
                                                <th className="p-3 font-medium text-gray-600 text-sm">Estudiantes</th>
                                                <th className="p-3 font-medium text-gray-600 text-sm">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {schedules.map((schedule) => (
                                                <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-3">
                                                        <div className="text-sm font-medium text-gray-800">
                                                            {schedule.tutor?.name || 'Sin tutor'}
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-sm text-gray-600">
                                                        {schedule.tutor?.code || '-'}
                                                    </td>
                                                    <td className="p-3">
                                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                            {schedule.semester}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-sm text-gray-600">
                                                        {schedule.start_date ? formatDate(schedule.start_date) : '-'}
                                                    </td>
                                                    <td className="p-3 text-sm text-gray-600">
                                                        {schedule.end_date ? formatDate(schedule.end_date) : '-'}
                                                    </td>
                                                    <td className="p-3">
                                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                            {schedule.students?.length || 0} estudiantes
                                                        </span>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleEditTutor(schedule)}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                                title="Editar Tutor"
                                                            >
                                                                <UserCog size={14} />
                                                                Tutor
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditStudents(schedule)}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                                                                title="Editar Alumnos"
                                                            >
                                                                <Users size={14} />
                                                                Alumnos
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(schedule)}
                                                                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Edit Tutor Modal */}
            {isEditTutorModalOpen && editingSchedule && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Cambiar Tutor</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Cronograma: {editingSchedule.semester}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {editingSchedule.start_date && editingSchedule.end_date 
                                        ? `${formatDate(editingSchedule.start_date)} - ${formatDate(editingSchedule.end_date)}`
                                        : 'Sin fechas definidas'}
                                </p>
                            </div>
                            <button
                                onClick={closeTutorModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-semibold">Tutor Actual:</span> {editingSchedule.tutor?.name || 'Sin tutor'} {editingSchedule.tutor?.code ? `(${editingSchedule.tutor.code})` : ''}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nuevo Tutor
                                    </label>
                                    <select
                                        value={selectedTutor}
                                        onChange={(e) => setSelectedTutor(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Seleccionar Tutor</option>
                                        {tutors.map(tutor => (
                                            <option key={tutor.id} value={tutor.id}>
                                                {tutor.name} ({tutor.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedTutor && selectedTutor !== editingSchedule.tutor?.id?.toString() && (
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-sm text-green-800">
                                            <span className="font-semibold">Nuevo Tutor:</span> {tutors.find(t => t.id.toString() === selectedTutor)?.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={closeTutorModal}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveTutor}
                                disabled={!selectedTutor || selectedTutor === editingSchedule.tutor?.id?.toString()}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save size={18} />
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Students Modal */}
            {isEditStudentsModalOpen && editingSchedule && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Gestionar Estudiantes</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {editingSchedule.tutor?.name || 'Sin tutor'} - {editingSchedule.semester}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {editingSchedule.start_date && editingSchedule.end_date 
                                        ? `${formatDate(editingSchedule.start_date)} - ${formatDate(editingSchedule.end_date)}`
                                        : 'Sin fechas definidas'}
                                </p>
                            </div>
                            <button
                                onClick={closeStudentsModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-semibold text-gray-800">Estudiantes Asignados</h4>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {editingSchedule.students?.length || 0} estudiantes
                                    </span>
                                </div>

                                {!editingSchedule.students || editingSchedule.students.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                                        <Users size={48} className="mx-auto text-gray-400 mb-4" />
                                        <p>No hay estudiantes asignados a esta tutoría.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {editingSchedule.students.map((student) => (
                                            <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-sm font-semibold">
                                                            {student.name?.charAt(0) || 'E'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">
                                                            {student.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            Código: {student.code || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveStudent(student.id)}
                                                    className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                    title="Eliminar estudiante"
                                                >
                                                    <Trash2 size={14} />
                                                    Eliminar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={closeStudentsModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditManager;