import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ExposicionForm.css'; // Estilos para el formulario

function ExposicionForm() {
  const { id_exposicion } = useParams();
  console.log(id_exposicion);
  const [exposicion, setExposicion] = useState({ nombre_exposicion: '', id_zona: '',descripcion: '', codigo_qr: '', activo: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (id_exposicion) {
      const fetchExposicion = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/admin/exposiciones/${id_exposicion}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExposicion(response.data);
      };
      fetchExposicion();
    }
  }, [id_exposicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (id_exposicion) {
      await axios.put(`http://localhost:8080/admin/exposiciones/${id_exposicion}`, exposicion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post('http://localhost:8080/admin/exposiciones', exposicion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    navigate('/exposiciones');
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/admin/exposiciones/${id_exposicion}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate('/exposiciones');
  };

  return (
    <div className="form-container">
      <Link to="/exposiciones" className="back-btn">← Volver</Link>
      <h2>{id_exposicion ? 'Editar Exposición' : 'Crear Exposición'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Exposición:</label>
          <input type="text" value={exposicion.nombre_exposicion} onChange={(e) => setExposicion({ ...exposicion, nombre_exposicion: e.target.value })} required />
        </div>
        <div>
          <label>Zona:</label>
          <select value={exposicion.id_zona} onChange={(e) => setExposicion({ ...exposicion, id_zona: e.target.value })} required>
            <option value="">Selecciona una zona</option>
            <option value="1">Zona 1</option>
            <option value="2">Zona 2</option>
            <option value="3">Zona 3</option>
          </select>
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea value={exposicion.descripcion} onChange={(e) => setExposicion({ ...exposicion, descripcion: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Código QR:</label>
          <input type="text" value={exposicion.codigo_qr} onChange={(e) => setExposicion({ ...exposicion, codigo_qr: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Activo:</label>
          <input type="checkbox" checked={exposicion.activo} onChange={(e) => setExposicion({ ...exposicion, activo: e.target.checked })} />
        </div>
        <button type="submit" className="submit-btn">{id_exposicion ? 'Actualizar' : 'Crear'}</button>
        {id_exposicion && <button type="button" className="delete-btn" onClick={handleDelete}>Eliminar</button>}
      </form>
    </div>
  );
}

export default ExposicionForm;
