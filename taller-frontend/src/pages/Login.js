import React, { useState } from "react";
import api from "../services/api";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      setUser(res.data.user);
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow" style={{ width: "300px" }}>
        <h4 className="text-center mb-3">Iniciar Sesión</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Contraseña"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}
