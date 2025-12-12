import { API_URL } from "../config";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, FileText, Bell, ChevronDown, LogOut, BookOpen, Pen, Trash2, X, Save, Plus } from 'lucide-react';

const EditManager = () => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [schedules, setSchedules] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [scheduleItems, setScheduleItems] = useState([]);

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
        return window.location.pathname === path;
    };

    useEffect(() => {
        fetchAllSchedules();
    }, []);

    const fetchAllSchedules = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/admin/schedules/all`);
            setSchedules(res.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setMessage({ type: 'error', text: 'Error al cargar los cronogramas.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleEdit = async (schedule) => {
        try {
            // Obtener los detalles del cronograma
            const res = await axios.get(`${API_URL}/api/admin/tutors/${schedule.tutor_id}/schedule?semester_id=${schedule.semester_id}`);
            setEditingSchedule(schedule);
            setScheduleItems(res.data);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error('Error fetching schedule details:', error);
            setMessage({ type: 'error', text: 'Error al cargar detalles del cronograma.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleDelete = async (schedule) => {
        if (!window.confirm(`¿Estás seguro de eliminar el cronograma de ${schedule.Tutor.full_name} para ${schedule.Semester.name}?`)) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/api/admin/schedules/${schedule.tutor_id}/${schedule.semester_id}`);
            setMessage({ type: 'success', text: 'Cronograma eliminado exitosamente.' });
            fetchAllSchedules();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error deleting schedule:', error);
            setMessage({ type: 'error', text: 'Error al eliminar el cronograma.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const addScheduleRow = () => {
        setScheduleItems([...scheduleItems, { day_of_week: 'Monday', start_time: '08:00', end_time: '10:00' }]);
    };

    const removeScheduleRow = (index) => {
        const newSchedule = [...scheduleItems];
        newSchedule.splice(index, 1);
        setScheduleItems(newSchedule);
    };

    const updateScheduleRow = (index, field, value) => {
        const newSchedule = [...scheduleItems];
        newSchedule[index] = { ...newSchedule[index], [field]: value };
        setScheduleItems(newSchedule);
    };

    const handleSaveEdit = async () => {
        if (!editingSchedule) return;

        try {
            await axios.post(`${API_URL}/api/admin/tutors/${editingSchedule.tutor_id}/schedule`, {
                semester_id: editingSchedule.semester_id,
                schedule_items: scheduleItems
            });
            setMessage({ type: 'success', text: 'Cronograma actualizado exitosamente.' });
            setIsEditModalOpen(false);
            setEditingSchedule(null);
            setScheduleItems([]);
            fetchAllSchedules();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error updating schedule:', error);
            setMessage({ type: 'error', text: 'Error al actualizar el cronograma.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
        setEditingSchedule(null);
        setScheduleItems([]);
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
                                
                                {schedules.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                                        No hay cronogramas registrados.
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="p-3 font-medium text-gray-600 text-sm">Tutor</th>
                                                    <th className="p-3 font-medium text-gray-600 text-sm">Código</th>
                                                    <th className="p-3 font-medium text-gray-600 text-sm">Semestre</th>
                                                    <th className="p-3 font-medium text-gray-600 text-sm">Horarios</th>
                                                    <th className="p-3 font-medium text-gray-600 text-sm">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {schedules.map((schedule, index) => (
                                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                        <td className="p-3">
                                                            <div className="text-sm font-medium text-gray-800">
                                                                {schedule.Tutor.full_name}
                                                            </div>
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-600">
                                                            {schedule.Tutor.code}
                                                        </td>
                                                        <td className="p-3">
                                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                                {schedule.Semester.name}
                                                            </span>
                                                        </td>
                                                        <td className="p-3 text-sm text-gray-600">
                                                            {schedule.schedule_count} horario(s)
                                                        </td>
                                                        <td className="p-3">
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => handleEdit(schedule)}
                                                                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                                    title="Editar"
                                                                >
                                                                    <Pen size={14} />
                                                                    Editar
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(schedule)}
                                                                    className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                                    title="Eliminar"
                                                                >
                                                                    <Trash2 size={14} />
                                                                    Eliminar
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Editar Cronograma</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {editingSchedule?.Tutor.full_name} - {editingSchedule?.Semester.name}
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-4">
                                {scheduleItems.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                                        No hay horarios definidos. Agrega uno nuevo.
                                    </div>
                                ) : (
                                    scheduleItems.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <select
                                                    value={item.day_of_week}
                                                    onChange={(e) => updateScheduleRow(index, 'day_of_week', e.target.value)}
                                                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                >
                                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                                        <option key={day} value={day}>{day}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="time"
                                                    value={item.start_time}
                                                    onChange={(e) => updateScheduleRow(index, 'start_time', e.target.value)}
                                                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                                <input
                                                    type="time"
                                                    value={item.end_time}
                                                    onChange={(e) => updateScheduleRow(index, 'end_time', e.target.value)}
                                                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeScheduleRow(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))
                                )}

                                <button
                                    onClick={addScheduleRow}
                                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus size={20} />
                                    Agregar Horario
                                </button>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Save size={18} />
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditManager;