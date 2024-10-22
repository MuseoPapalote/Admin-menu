import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ZonasList() {
  const [zonas, setZonas] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchZonas = async () => {
      const response = (await axios.get('http://localhost:8080/admin/zonas', {headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
      }));
      setZonas(response.data);
    };
    fetchZonas();
  }, []);

  return (
    <div>
      <h2>Zonas</h2>
      <ul>
        {zonas.map((zona) => (
          <li key={zona.id_zona}>
            <Link to={`/zonas/${zona.id_zona}`}>{zona.nombre_zona}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ZonasList;
