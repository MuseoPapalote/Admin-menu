import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ExposicionForm.css';

function ExposicionForm() {
  const { id_exposicion } = useParams();
  const [exposicion, setExposicion] = useState({
    nombre_exposicion: '',
    id_zona: '', // Asegurarse de que id_zona esté aquí
    descripcion: '',
    codigo_qr: '',
    activo: true,
    preguntas: [],
  });
  const [zonas, setZonas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchZonas = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://museoapi.org/admin/zonas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setZonas(response.data);
      } catch (error) {
        console.error('Error al cargar zonas:', error);
      }
    };

    const fetchExposicion = async () => {
      if (id_exposicion) {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`https://museoapi.org/admin/exposiciones/${id_exposicion}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setExposicion({
            ...response.data,
            id_zona: response.data.id_zona, // Asegurar que id_zona se establezca al valor correcto
            preguntas: response.data.preguntas || [],
          });
        } catch (error) {
          console.error('Error al cargar la exposición:', error);
        }
      }
    };

    fetchZonas();
    fetchExposicion();
  }, [id_exposicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (id_exposicion) {
        await axios.put(`https://museoapi.org/admin/exposiciones/${id_exposicion}`, exposicion, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('https://museoapi.org/admin/exposiciones', exposicion, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/exposiciones');
    } catch (error) {
      console.error('Error al guardar la exposición:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://museoapi.org/admin/exposiciones/${id_exposicion}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/exposiciones');
    } catch (error) {
      console.error('Error al eliminar la exposición:', error);
    }
  };

  const handleAddPregunta = () => {
    navigate(`/preguntas/create/${id_exposicion}`, { state: { id_exposicion } });
  };

  return (
    <div className="form-container">
      <Link to="/exposiciones" className="back-btn">← Volver</Link>
      <h2>{id_exposicion ? 'Editar Exposición' : 'Crear Exposición'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Exposición:</label>
          <input
            type="text"
            value={exposicion.nombre_exposicion}
            onChange={(e) => setExposicion({ ...exposicion, nombre_exposicion: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Zona:</label>
          <select
            value={exposicion.id_zona || ''} // Mostrar la zona actual si se está editando
            onChange={(e) => setExposicion({ ...exposicion, id_zona: e.target.value })}
            required
          >
            <option value="">Selecciona una zona</option>
            {zonas.map((zona) => (
              <option key={zona.id_zona} value={zona.id_zona}>
                {zona.nombre_zona}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={exposicion.descripcion}
            onChange={(e) => setExposicion({ ...exposicion, descripcion: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Código QR:</label>
          <input
            type="text"
            value={exposicion.codigo_qr}
            onChange={(e) => setExposicion({ ...exposicion, codigo_qr: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado Activo:</label>
          <select
            value={exposicion.activo}
            onChange={(e) => setExposicion({ ...exposicion, activo: e.target.value === 'true' })}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">{id_exposicion ? 'Actualizar' : 'Crear'}</button>
        {id_exposicion && (
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </form>

      {id_exposicion && (
        <>
          <h3>Preguntas de esta Exposición</h3>
          <button className="add-pregunta-btn" onClick={handleAddPregunta}>+ Añadir Pregunta</button>
          <div className="preguntas-list">
            {exposicion.preguntas.map((pregunta) => (
              <div key={pregunta.id_pregunta} className="pregunta-card">
                <p>{pregunta.texto_pregunta}</p>
                <Link to={`/preguntas/${pregunta.id_pregunta}`} className="edit-btn">Editar</Link>
              </div>
            ))}
            {exposicion.preguntas.length === 0 && <p>No hay preguntas para esta exposición.</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default ExposicionForm;
