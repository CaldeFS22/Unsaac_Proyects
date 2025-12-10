import { API_URL } from "../config";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        let message = "Correo o contraseña incorrectos.";
        try {
          const errorBody = await response.json();
          if (errorBody && errorBody.error) {
            message = errorBody.error; // "Credenciales inválidas", "Cuenta no habilitada", etc.
          }
        } catch { /* ignorar parse error */ }

        setError(message);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      // Mapear el rol del backend a los códigos que usa el frontend
      const roleMap = {
        "Administrador": "ADMIN",
        "Tutor": "TUTOR",
        "Estudiante": "ESTUDIANTE",
        "Verificador": "VERIFICADOR"
      };

      const mappedRole = roleMap[data.role] || data.role;

      // Guardar el token y la info del usuario (formato que espera ProtectedRoute)
      const user = {
        userId: data.userId,
        role: mappedRole,
        token: data.token
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", data.token);   // opcional, si quieres tenerlo aparte

      // Redirigir según rol
      switch (data.role) {
        case "Administrador":
          navigate("/admin");
          break;
        case "Tutor":
          navigate("/tutor");
          break;
        case "Verificador":
          navigate("/verificador");
          break;
        default:
          navigate("/estudiante");
      }

    } catch (err) {
      setError("Error de conexión con el servidor.");
    }

    setIsLoading(false);
  };


  return (
    <>
      {/* MODAL DE ERROR */}
      {error && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-center w-80">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => setError("")}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">

            {/* Logos */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <img src="/logo_UNSAAC.png" className="w-20 h-20 object-contain" />
              <img src="/logo_INFORMATICA.png" className="w-20 h-20 object-contain" />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Sistema de Gestión de Tutorías
              </h1>
              <p className="text-sm text-gray-600 font-medium mb-1">
                Escuela Profesional de Ingeniería Informática y de Sistemas
              </p>
              <p className="text-xs text-gray-500">
                Universidad Nacional de San Antonio Abad del Cusco
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico Institucional
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                  focus:ring-blue-900 outline-none"
                  placeholder="ejemplo@unsaac.edu.pe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-blue-900 outline-none pr-12"
                    placeholder="••••••••"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-sm font-medium">
                <button className="text-blue-900 hover:text-orange-500">¿Olvidaste tu contraseña?</button>
                <button
                  type="button"
                  onClick={() => navigate("/creacionusuarios")}
                  className="text-blue-900 hover:text-orange-500"
                >Crear Usuario</button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold 
                hover:bg-blue-800 transition-all shadow-lg disabled:opacity-50"
              >
                {isLoading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-xs text-gray-500">
                © 2025 UNSAAC - EPIIS - Todos los derechos reservados
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
