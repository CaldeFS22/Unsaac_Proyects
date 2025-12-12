
import { API_URL } from "../config";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, FileText, Bell, ChevronDown, LogOut, BookOpen } from 'lucide-react';

const SemesterManager = () => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [semesters, setSemesters] = useState([]);
    const [newSemester, setNewSemester] = useState({ name: '', start_date: '', end_date: '' });
    const [message, setMessage] = useState('');

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
        fetchSemesters();
    }, []);

    const fetchSemesters = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/admin/semesters`);
            setSemesters(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/admin/semesters`, newSemester);
            setMessage('Semester created successfully!');
            fetchSemesters();
            setNewSemester({ name: '', start_date: '', end_date: '' });
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error creating semester');
            setTimeout(() => setMessage(''), 3000);
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
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Semesters</h2>

                        {/* Create New Semester */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Create New Semester</h3>
                            
                            {message && (
                                <p className={`mb-4 p-3 rounded-lg ${
                                    message.includes('Error') 
                                        ? 'bg-red-50 text-red-700 border border-red-200' 
                                        : 'bg-green-50 text-green-700 border border-green-200'
                                }`}>
                                    {message}
                                </p>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name (e.g., 2024-I)"
                                    value={newSemester.name}
                                    onChange={(e) => setNewSemester({ ...newSemester, name: e.target.value })}
                                    className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    required
                                />
                                <input
                                    type="date"
                                    value={newSemester.start_date}
                                    onChange={(e) => setNewSemester({ ...newSemester, start_date: e.target.value })}
                                    className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    required
                                />
                                <input
                                    type="date"
                                    value={newSemester.end_date}
                                    onChange={(e) => setNewSemester({ ...newSemester, end_date: e.target.value })}
                                    className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    required
                                />
                                <button
                                    onClick={handleCreate}
                                    className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors md:col-span-3 font-medium shadow-sm"
                                >
                                    Create Semester
                                </button>
                            </div>
                        </div>

                        {/* Existing Semesters */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4">Existing Semesters</h3>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="p-3 font-medium text-gray-600 text-sm">Name</th>
                                            <th className="p-3 font-medium text-gray-600 text-sm">Start Date</th>
                                            <th className="p-3 font-medium text-gray-600 text-sm">End Date</th>
                                            <th className="p-3 font-medium text-gray-600 text-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {semesters.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                                    No semesters created yet
                                                </td>
                                            </tr>
                                        ) : (
                                            semesters.map(sem => (
                                                <tr key={sem.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-3 font-medium text-gray-800">{sem.name}</td>
                                                    <td className="p-3 text-gray-600">{sem.start_date}</td>
                                                    <td className="p-3 text-gray-600">{sem.end_date}</td>
                                                    <td className="p-3">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            sem.is_active 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            {sem.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SemesterManager;