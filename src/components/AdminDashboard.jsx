import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Users, UserCheck, FileText, Bell, ChevronDown, LogOut, Menu, X, Plus, Upload, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------
// IMPORTA LOS NUEVOS COMPONENTES (ASUME QUE EXISTEN EN LA CARPETA 'components')
// Debes crear estos archivos con el código sugerido en la respuesta anterior.
import SemesterManagement from './SemesterManagement'; // 🗓️
import UserManagement from './UserManagement'; // ⚙️
import AssignmentManagement from './AssignmentManagement'; // 👥
import ReportsView from './ReportsView'; //
// ----------------------------------------------------------------------


// Contenido original de la página principal del Dashboard (Estadísticas y Actividad)
const DashboardHome = ({ stats, recentActivity, navigate }) => {
  return (
    <div className="space-y-8">
      {/* Cards de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <span className={`text-white p-3 rounded-full ${stat.color} bg-opacity-80`}>
                <stat.icon size={24} />
              </span>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Secciones de Acciones Rápidas y Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Acciones Rápidas */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas de Administración</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/admin/semestres')}
              className="flex items-center justify-between p-4 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <div>
                <p className="font-semibold text-lg">Gestionar Semestres</p>
                <p className="text-blue-700 text-sm">Crear, cerrar y editar periodos</p>
              </div>
              <Calendar size={32} />
            </button>
            <button
              onClick={() => navigate('/admin/asignar')}
              className="flex items-center justify-between p-4 bg-orange-100 text-orange-900 rounded-lg hover:bg-orange-200 transition-colors"
            >
              <div>
                <p className="font-semibold text-lg">Asignar Tutorados</p>
                <p className="text-orange-700 text-sm">Asignar tutorados a tutores</p>
              </div>
              <UserCheck size={32} />
            </button>
            <button
              onClick={() => navigate('/admin/usuarios')}
              className="flex items-center justify-between p-4 bg-green-100 text-green-900 rounded-lg hover:bg-green-200 transition-colors"
            >
              <div>
                <p className="font-semibold text-lg">Gestionar Usuarios</p>
                <p className="text-green-700 text-sm">Administrar roles y accesos</p>
              </div>
              <Users size={32} />
            </button>
            <button
              onClick={() => navigate('/admin/reportes')}
              className="flex items-center justify-between p-4 bg-red-100 text-red-900 rounded-lg hover:bg-red-200 transition-colors"
            >
              <div>
                <p className="font-semibold text-lg">Ver Reportes</p>
                <p className="text-red-700 text-sm">Consultar estadísticas y documentos</p>
              </div>
              <FileText size={32} />
            </button>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente en el Sistema</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{activity.user}</span> {activity.detail}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default function AdminDashboard() {
  // El estado ahora reflejará el ID del menú activo, útil para el resaltado del Sidebar
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Datos de ejemplo para el Dashboard Home
  const stats = [
    { label: 'Total de Estudiantes', value: '1,245', icon: Users, color: 'bg-blue-500' },
    { label: 'Total de Tutores', value: '48', icon: UserCheck, color: 'bg-green-500' },
    { label: 'Tutorías este Mes', value: '327', icon: Calendar, color: 'bg-orange-500' },
    { label: 'Solicitudes Pendientes', value: '12', icon: Bell, color: 'bg-red-500' }
  ];

  const recentActivity = [
    { action: 'Nueva asignación', user: 'Juan Pérez', detail: 'asignado a tutor María García', time: 'Hace 5 min' },
    { action: 'Tutoría completada', user: 'Ana López', detail: 'con estudiante Carlos Quispe', time: 'Hace 1 hr' },
    { action: 'Semestre cerrado', user: 'Admin Principal', detail: 'periodo 2024-II finalizado', time: 'Ayer' },
    { action: 'Usuario creado', user: 'Admin Principal', detail: 'se registró un nuevo tutor (Javier Díaz)', time: 'Ayer' },
    { action: 'Tutoría completada', user: 'Luisa Flores', detail: 'con estudiante Ricardo Soto', time: 'Hace 2 días' },
  ];
  
  // Lista de items de menú con sus rutas
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard Principal', icon: LayoutDashboard, path: '/admin' },
    { id: 'semestres', name: 'Gestionar Semestres', icon: Calendar, path: '/admin/semestres' },
    { id: 'asignar', name: 'Asignar Tutorados', icon: UserCheck, path: '/admin/asignar' },
    { id: 'usuarios', name: 'Gestionar Usuarios', icon: Users, path: '/admin/usuarios' },
    { id: 'reportes', name: 'Ver Reportes', icon: FileText, path: '/admin/reportes' },
  ];


  const handleMenuItemClick = (item) => {
    setActiveMenu(item.id);
    setSidebarOpen(false); // Cierra el menú lateral en móvil
    // Navega a la ruta usando react-router-dom
    navigate(item.path);
  };

  const handleLogout = () => {
    // Lógica de cierre de sesión (ej. limpiar token, redirigir a login)
    navigate('/');
  };

  // Función para renderizar el componente de contenido principal
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardHome stats={stats} recentActivity={recentActivity} navigate={navigate} />;
      case 'semestres':
        return <SemesterManagement />;
      case 'asignar':
        return <AssignmentManagement />;
      case 'usuarios':
        return <UserManagement />;
      case 'reportes':
        return <ReportsView />;
      default:
        return <DashboardHome stats={stats} recentActivity={recentActivity} navigate={navigate} />;
    }
  };


  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Sidebar - Menú Lateral */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-blue-900 flex flex-col`}
      >
        <div className="p-6 text-white text-2xl font-bold border-b border-blue-800">
          TUTORÍAS - ADMIN
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors duration-150 text-left ${
                activeMenu === item.id
                  ? 'bg-blue-700 text-white shadow-lg'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg text-blue-200 hover:bg-blue-800 hover:text-white transition-colors duration-150"
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
          
          {/* Botón de Menú (para móviles) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Título de la Sección */}
          <h1 className="text-xl font-semibold text-gray-800 hidden lg:block">
            {menuItems.find(item => item.id === activeMenu)?.name || 'Dashboard Principal'}
          </h1>

          {/* Iconos de Navegación y Perfil */}
          <div className="flex items-center space-x-4">
            {/* Notificaciones */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
              </button>
              {/* Dropdown de Notificaciones (Opcional) */}
            </div>

            {/* Perfil */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center text-gray-700 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <User size={20} className="mr-2" />
                Admin
                <ChevronDown size={16} className="ml-1" />
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-200">
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                        <Settings size={18} /> Configuración
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                        <LogOut size={18} /> Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}