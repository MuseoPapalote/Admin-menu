import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExposicionesList() {
  const [exposiciones, setExposiciones] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchExposiciones = async () => {
      const response = await axios.get('http://localhost:8080/admin/exposiciones', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setExposiciones(response.data);
    };
    fetchExposiciones();
  }, []);

  return (
    <div>
      <h2>Exposiciones</h2>
      <ul>
        {exposiciones.map((exposicion) => (
          <li key={exposicion.id_exposicion}>
            <Link to={`/exposiciones/${exposicion.id_exposicion}`}>{exposicion.nombre_exposicion}</Link>
          </li>
        ))}
      </ul>
      <Link to="/exposiciones/create">
        <button>Crear Nueva Exposición</button>
      </Link>
    </div>
  );
}

export default ExposicionesList;
