import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Login exitoso");
        console.log(data);
      } else {
        setMessage("❌ Error: " + (data.message || "Credenciales inválidas"));
      }
    } catch (error) {
      setMessage("⚠️ Error de conexión");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Columna izquierda azul */}
      <div className="w-1/2 bg-blue-700"></div>

      {/* Columna derecha con el formulario */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <div className="bg-gray-100 p-10 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Iniciar sesión
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex justify-end mb-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Recuperar contraseña
            </a>
          </div>

          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Iniciar
          </button>

          {message && (
            <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
