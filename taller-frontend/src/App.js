import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import api from "./services/api";

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
    <div className="flex justify-center items-center h-screen bg-gray-300 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-lg max-w-4xl w-full">
        {/* Lado izquierdo (Color sólido) */}
        <div className="hidden md:block bg-blue-700 rounded-l-lg"></div>

        {/* Lado derecho (Formulario) */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-3xl font-light text-center mb-8 text-gray-800">
            Iniciar sesión
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <a href="#" className="text-right text-xs text-blue-700 hover:underline mb-6">
            Recuperar contraseña
          </a>

          <button
            onClick={login}
            className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition"
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

function Dashboard({ user }) {
  return <h2>Bienvenido {user.name} (Rol: {user.role})</h2>;
}

export default App;
