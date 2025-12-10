import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("ESTUDIANTE");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de guardado en base de datos
    const nuevoUsuario = {
      nombre,
      apellidos,
      email,
      password,
      role,
    };

    console.log("Usuario creado:", nuevoUsuario);

    setSuccess(true);
  };

  return (
    <>
      {/* MODAL DE ÉXITO */}
      {success && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-center w-80">
            <h2 className="text-xl font-bold text-green-600 mb-4">Usuario Creado</h2>
            <p className="text-gray-700 mb-6">
              El usuario fue creado correctamente.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Volver al Login
            </button>
          </div>
        </div>
      )}

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

      {/* FORMULARIO */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Crear Usuario
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-900 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-900 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Institucional
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-900 outline-none"
                  placeholder="ejemplo@unsaac.edu.pe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol del Usuario
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="TUTOR">Tutor</option>
                  <option value="VERIFICADOR">Verificador</option>
                  <option value="ESTUDIANTE">Estudiante</option>
                </select>
              </div>

              {/* Contraseña */}
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

              {/* Confirmar contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-900 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold 
                hover:bg-blue-800 transition-all shadow-lg"
              >
                Crear Usuario
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full mt-2 text-blue-900 hover:text-orange-500 text-center"
              >
                Volver al Login
              </button>

            </form>

          </div>
        </div>
      </div>
    </>
  );
}
