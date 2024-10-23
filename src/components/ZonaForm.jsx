import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ZonaForm.css'; // Estilos para el formulario

function ZonaForm() {
  const { id_zona } = useParams();
  const [zona, setZona] = useState({ nombre_zona: '', descripcion: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id_zona) {
      const fetchZona = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/admin/zonas/${id_zona}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setZona(response.data);
      };
      fetchZona();
    }
  }, [id_zona]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (id_zona) {
      await axios.put(`http://localhost:8080/admin/zonas/${id_zona}`, zona, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post('http://localhost:8080/admin/zonas', zona, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    navigate('/zonas');
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/admin/zonas/${id_zona}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate('/zonas');
  };

  return (
    <div className="form-container">
      <Link to="/zonas" className="back-btn">← Volver</Link>
      <h2>{id_zona ? 'Editar Zona' : 'Crear Zona'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Zona:</label>
          <input
            type="text"
            value={zona.nombre_zona}
            onChange={(e) => setZona({ ...zona, nombre_zona: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={zona.descripcion}
            onChange={(e) => setZona({ ...zona, descripcion: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="submit-btn">{id_zona ? 'Actualizar' : 'Crear'}</button>
        {id_zona && (
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default ZonaForm;
