import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rol, setRol] = useState('admin');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/usuarios/login', { email, password, rol });
      console.log(response);
      const token = response.data.token;
      console.log(token);
      setToken = token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión como administrador</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default AdminLogin;
