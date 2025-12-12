import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Calendar, FileText, Bell, ChevronDown, LogOut, BookOpen, PenIcon } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfile, setShowProfile] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const menuItems = [
        { path: '/admin/semesters', label: 'Semesters & Schedules', icon: Calendar },
        { path: '/admin/assignments', label: 'Assignments', icon: BookOpen },
        { path: '/admin/editar', label: 'Ediciones', icon: PenIcon },
        { path: '/admin/reports', label: 'Reports', icon: FileText },
    ];

    // Determinar si una ruta está activa
    const isActiveRoute = (path) => {
        return location.pathname === path;
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
                        <div className="text-center mt-20">
                            <h2 className="text-3xl font-bold text-gray-700">Bienvenido, Administrador</h2>
                            <p className="text-gray-500 mt-2">Seleccione una opción del menú para gestionar el sistema.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;