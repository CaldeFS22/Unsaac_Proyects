
import { API_URL } from "../config";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Calendar, Check, Save, Plus, Trash2, FileText, Bell, ChevronDown, LogOut, BookOpen } from 'lucide-react';

const AssignmentManager = () => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [activeTab, setActiveTab] = useState('assignment');
    const [semesters, setSemesters] = useState([]);
    const [tutors, setTutors] = useState([]);

    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedTutor, setSelectedTutor] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const [unassignedStudents, setUnassignedStudents] = useState([]);
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const [schedule, setSchedule] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const menuItems = [
        { path: '/admin/semesters', label: 'Semesters & Schedules', icon: Calendar },
        { path: '/admin/assignments', label: 'Assignments', icon: BookOpen },
        //{ path: '/admin/editar', label: 'Ediciones', icon: PenIcon },
        { path: '/admin/reports', label: 'Reports', icon: FileText },
    ];

    const isActiveRoute = (path) => {
        return window.location.pathname === path;
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedSemester && activeTab === 'assignment') {
            fetchUnassignedStudents();
        }
    }, [selectedSemester, activeTab]);

    useEffect(() => {
        if (selectedSemester && selectedTutor && activeTab === 'assignment') {
            fetchAssignedStudents();
        } else {
            setAssignedStudents([]);
        }
    }, [selectedSemester, selectedTutor, activeTab]);

    useEffect(() => {
        if (selectedSemester && selectedTutor && activeTab === 'schedule') {
            fetchTutorSchedule();
        }
    }, [selectedSemester, selectedTutor, activeTab]);

    const fetchInitialData = async () => {
        try {
            const semRes = await axios.get(`${API_URL}/api/admin/semesters`);
            setSemesters(semRes.data);
        } catch (error) {
            console.error('Error fetching semesters:', error);
            setMessage({ type: 'error', text: `Error loading semesters: ${error.message}` });
        }

        try {
            const tutorRes = await axios.get(`${API_URL}/api/admin/tutors`);
            setTutors(tutorRes.data);
        } catch (error) {
            console.error('Error fetching tutors:', error);
            setMessage({ type: 'error', text: `Error loading tutors: ${error.message}` });
        }
    };

    const fetchUnassignedStudents = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/admin/students/unassigned?semester_id=${selectedSemester}`);
            setUnassignedStudents(res.data);
            setSelectedStudents([]);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchAssignedStudents = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/admin/assignments?semester_id=${selectedSemester}&tutor_id=${selectedTutor}`);
            setAssignedStudents(res.data);
        } catch (error) {
            console.error('Error fetching assigned students:', error);
        }
    };

    const fetchTutorSchedule = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/admin/tutors/${selectedTutor}/schedule?semester_id=${selectedSemester}`);
            setSchedule(res.data);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        }
    };

    const handleStudentToggle = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleMassAssign = async () => {
        if (!selectedSemester || !selectedTutor || selectedStudents.length === 0) {
            setMessage({ type: 'error', text: 'Please select semester, tutor, and at least one student.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }

        try {
            await axios.post(`${API_URL}/api/admin/assignments/mass`, {
                semester_id: selectedSemester,
                tutor_id: selectedTutor,
                student_ids: selectedStudents
            });
            setMessage({ type: 'success', text: 'Students assigned successfully!' });
            fetchUnassignedStudents();
            fetchAssignedStudents();
            setSelectedStudents([]);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to assign students.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const handleUnassign = async (assignmentId) => {
        if (!window.confirm('¿Estás seguro de que quieres desasignar a este estudiante?')) return;

        try {
            await axios.delete(`${API_URL}/api/admin/assignments/${assignmentId}`);
            setMessage({ type: 'success', text: 'Estudiante desasignado correctamente.' });
            fetchAssignedStudents();
            fetchUnassignedStudents();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error unassigning student:', error);
            setMessage({ type: 'error', text: 'Error al desasignar estudiante.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    const addScheduleRow = () => {
        setSchedule([...schedule, { day_of_week: 'Monday', start_time: '08:00', end_time: '10:00' }]);
    };

    const removeScheduleRow = (index) => {
        const newSchedule = [...schedule];
        newSchedule.splice(index, 1);
        setSchedule(newSchedule);
    };

    const updateScheduleRow = (index, field, value) => {
        const newSchedule = [...schedule];
        newSchedule[index] = { ...newSchedule[index], [field]: value };
        setSchedule(newSchedule);
    };

    const saveSchedule = async () => {
        if (!selectedSemester || !selectedTutor) {
            setMessage({ type: 'error', text: 'Please select semester and tutor.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }

        try {
            await axios.post(`${API_URL}/api/admin/tutors/${selectedTutor}/schedule`, {
                semester_id: selectedSemester,
                schedule_items: schedule
            });
            setMessage({ type: 'success', text: 'Schedule saved successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save schedule.' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
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
                            <h2 className="text-2xl font-bold text-gray-800">Gestión de Asignaciones y Horarios</h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('assignment')}
                                className={`px-6 py-3 font-medium text-sm transition-colors ${
                                    activeTab === 'assignment'
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Users size={18} />
                                    Asignación Masiva
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('schedule')}
                                className={`px-6 py-3 font-medium text-sm transition-colors ${
                                    activeTab === 'schedule'
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    Cronograma de Tutor
                                </div>
                            </button>
                        </div>

                        {/* Common Filters */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Semestre Académico</label>
                                <select
                                    value={selectedSemester}
                                    onChange={(e) => setSelectedSemester(e.target.value)}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Seleccionar Semestre</option>
                                    {semesters.map(sem => (
                                        <option key={sem.id} value={sem.id}>{sem.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Docente Tutor</label>
                                <select
                                    value={selectedTutor}
                                    onChange={(e) => setSelectedTutor(e.target.value)}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Seleccionar Tutor</option>
                                    {tutors.map(tutor => (
                                        <option key={tutor.id} value={tutor.id}>{tutor.full_name} ({tutor.code})</option>
                                    ))}
                                </select>
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

                        {/* Content Area */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[400px]">
                            {activeTab === 'assignment' ? (
                                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Unassigned Students */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Estudiantes Sin Asignar</h3>
                                            <button
                                                onClick={handleMassAssign}
                                                disabled={selectedStudents.length === 0}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Check size={18} />
                                                Asignar ({selectedStudents.length})
                                            </button>
                                        </div>

                                        {!selectedSemester ? (
                                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                                                Seleccione un semestre.
                                            </div>
                                        ) : unassignedStudents.length === 0 ? (
                                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                                                No hay estudiantes sin asignar.
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto border border-gray-200 rounded-lg max-h-[500px] overflow-y-auto">
                                                <table className="w-full text-left">
                                                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                                        <tr>
                                                            <th className="p-3 w-10">
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setSelectedStudents(unassignedStudents.map(s => s.id));
                                                                        } else {
                                                                            setSelectedStudents([]);
                                                                        }
                                                                    }}
                                                                    checked={selectedStudents.length === unassignedStudents.length && unassignedStudents.length > 0}
                                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                />
                                                            </th>
                                                            <th className="p-3 font-medium text-gray-600 text-sm">Estudiante</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {unassignedStudents.map(student => (
                                                            <tr key={student.id} className="hover:bg-gray-50">
                                                                <td className="p-3">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedStudents.includes(student.id)}
                                                                        onChange={() => handleStudentToggle(student.id)}
                                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                    />
                                                                </td>
                                                                <td className="p-3">
                                                                    <div className="text-sm font-medium text-gray-800">{student.full_name}</div>
                                                                    <div className="text-xs text-gray-500">{student.code}</div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>

                                    {/* Assigned Students */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Estudiantes Asignados</h3>
                                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                Total: {assignedStudents.length}
                                            </span>
                                        </div>

                                        {!selectedSemester || !selectedTutor ? (
                                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                                                Seleccione semestre y tutor.
                                            </div>
                                        ) : assignedStudents.length === 0 ? (
                                            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                                                Este tutor no tiene estudiantes asignados.
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto border border-gray-200 rounded-lg max-h-[500px] overflow-y-auto">
                                                <table className="w-full text-left">
                                                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                                        <tr>
                                                            <th className="p-3 font-medium text-gray-600 text-sm">Estudiante</th>
                                                            <th className="p-3 font-medium text-gray-600 text-sm">Email</th>
                                                            <th className="p-3 font-medium text-gray-600 text-sm">Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {assignedStudents.map(assignment => (
                                                            <tr key={assignment.id} className="hover:bg-gray-50">
                                                                <td className="p-3">
                                                                    <div className="text-sm font-medium text-gray-800">{assignment.Student.full_name}</div>
                                                                    <div className="text-xs text-gray-500">{assignment.Student.code}</div>
                                                                </td>
                                                                <td className="p-3 text-sm text-gray-500">{assignment.Student.email}</td>
                                                                <td className="p-3">
                                                                    <button
                                                                        onClick={() => handleUnassign(assignment.id)}
                                                                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 rounded transition-colors"
                                                                        title="Desasignar"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-semibold text-gray-800">Horario de Disponibilidad</h3>
                                        <button
                                            onClick={saveSchedule}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <Save size={18} />
                                            Guardar Cambios
                                        </button>
                                    </div>

                                    {!selectedSemester || !selectedTutor ? (
                                        <div className="text-center py-12 text-gray-500">
                                            Seleccione semestre y tutor para gestionar el horario.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {schedule.map((item, index) => (
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
                                            ))}

                                            <button
                                                onClick={addScheduleRow}
                                                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus size={20} />
                                                Agregar Horario
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AssignmentManager;