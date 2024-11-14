import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ExposicionesList.css';

function ExposicionesList() {
  const [exposiciones, setExposiciones] = useState([]);

  useEffect(() => {
    const fetchExposiciones = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://museoapi.org/admin/exposiciones', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExposiciones(response.data);
    };

    fetchExposiciones();
  }, []);

  return (
    <div className="exposiciones-list-container">
      <Link to="/dashboard" className="back-btn">← Volver al Dashboard</Link>
      <h2>Exposiciones</h2>
      <Link to="/exposiciones/create" className="create-btn">+ Crear Nueva Exposición</Link>
      <div className="exposiciones-list">
        {exposiciones.map((exposicion) => (
          <div key={exposicion.id_exposicion} className="exposicion-card">
            <h3>{exposicion.nombre_exposicion}</h3>
            <p>Zona: {exposicion.nombre_zona}</p>
            <p>Descripción: {exposicion.descripcion}</p>
            <p>QR: {exposicion.codigo_qr}</p>
            <p>Estado: {exposicion.activo ? 'Activo' : 'Inactivo'}</p>
            <p>Visitas: {exposicion.total_visitas}</p>
            <Link to={`/exposiciones/${exposicion.id_exposicion}`} className="edit-btn">Editar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExposicionesList;
