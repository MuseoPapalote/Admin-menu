import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ZonasList.css'; // Estilos para las zonas

function ZonasList() {
  const [zonas, setZonas] = useState([]);

  useEffect(() => {
    const fetchZonas = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/admin/zonas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setZonas(response.data);
    };

    fetchZonas();
  }, []);

  return (
    <div className="zonas-list-container">
      <Link to="/dashboard" className="back-btn">← Volver al Dashboard</Link>
      <h2>Zonas</h2>
      <Link to="/zonas/create" className="create-btn">+ Crear Nueva Zona</Link>
      <div className="zonas-list">
        {zonas.map((zona) => (
          <div key={zona.id_zona} className="zona-card">
            <h3>{zona.nombre_zona}</h3>
            <p>Descripción: {zona.descripcion}</p>
            <Link to={`/zonas/${zona.id_zona}`} className="edit-btn">Editar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZonasList;
