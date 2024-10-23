import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Estilos para el dashboard

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Limpia el token
    navigate('/'); // Redirige a la página de login
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Panel de Administración</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="boards">
        <div className="board">
          <h2>Zonas</h2>
          <p>Total: 10</p> {/* Contador de zonas */}
          <Link to="/zonas" className="view-btn">Ver Zonas</Link>
        </div>
        <div className="board">
          <h2>Exposiciones</h2>
          <p>Total: 15</p> {/* Contador de exposiciones */}
          <Link to="/exposiciones" className="view-btn">Ver Exposiciones</Link>
        </div>
        <div className="board">
          <h2>Preguntas</h2>
          <p>Total: 20</p> {/* Contador de preguntas */}
          <Link to="/preguntas" className="view-btn">Ver Preguntas</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
