import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ZonaForm() {
  const { id_zona } = useParams();
  const [zona, setZona] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchZona = async () => {
      const response = await axios.get(`http://localhost:8080/admin/zonas/${id_zona}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setZona(response.data);
    };
    fetchZona();
  }, [id_zona]);

  if (!zona) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{zona.nombre_zona}</h2>
      <p>{zona.descripcion}</p>
      {/* Aquí puedes agregar un botón para editar o borrar */}
    </div>
  );
}

export default ZonaForm;
