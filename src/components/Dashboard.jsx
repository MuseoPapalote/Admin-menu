import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [totalZonas, setTotalZonas] = useState(0);
  const [totalExposiciones, setTotalExposiciones] = useState(0);
  const [totalPreguntas, setTotalPreguntas] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem('token');
      const overViewResponse = await axios.get('https://museoapi.org/admin/overview', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTotalZonas(parseInt(overViewResponse.data[0].total_zonas));
      setTotalExposiciones(parseInt(overViewResponse.data[0].total_exposiciones));
      setTotalPreguntas(parseInt(overViewResponse.data[0].total_preguntas)); // Asegúrate que el backend incluya esta métrica
    };

    fetchCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
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
          <p>Total: {totalZonas}</p>
          <Link to="/zonas" className="view-btn">Ver Zonas</Link>
        </div>
        <div className="board">
          <h2>Exposiciones</h2>
          <p>Total: {totalExposiciones}</p>
          <Link to="/exposiciones" className="view-btn">Ver Exposiciones</Link>
        </div>
        <div className="board">
          <h2>Preguntas</h2>
          <p>Total: {totalPreguntas}</p>
          <Link to="/preguntas" className="view-btn">Ver Preguntas</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
