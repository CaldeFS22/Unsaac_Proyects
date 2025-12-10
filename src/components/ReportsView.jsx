import React from 'react';
import { Download, BarChart2, PieChart, FileText } from 'lucide-react';
// Nota: Para los gráficos necesitarías instalar una librería de charts, ej: npm install chart.js react-chartjs-2
// Se usan placeholders aquí.

// Placeholder de Componente de Gráfico
const ChartCard = ({ title, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
            <Icon size={24} className={color} />
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        </div>
        <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 text-sm">
            [Placeholder para Gráfico]
        </div>
    </div>
);

export default function ReportsView() {
    const reportList = [
        { name: 'Reporte de Tutorías por Mes', type: 'PDF', date: '2025-05-01' },
        { name: 'Estadísticas de Asignación', type: 'Excel', date: '2025-04-15' },
        { name: 'Listado de Tutores Activos', type: 'CSV', date: '2025-05-20' },
    ];

    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800">Ver Reportes y Estadísticas</h3>

            {/* Sección de Gráficos (Estadísticas Clave) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartCard title="Progreso de Tutorías" icon={BarChart2} color="text-indigo-600" />
                <ChartCard title="Distribución de Roles" icon={PieChart} color="text-pink-600" />
            </div>

            {/* Sección de Documentos de Reporte */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Documentos para Descargar</h4>
                <div className="space-y-3">
                    {reportList.map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-blue-900" />
                                <div>
                                    <p className="font-medium text-gray-800">{report.name}</p>
                                    <p className="text-xs text-gray-500">Tipo: {report.type} - Generado: {report.date}</p>
                                </div>
                            </div>
                            <button
                                className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50"
                                title="Descargar"
                            >
                                <Download size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}