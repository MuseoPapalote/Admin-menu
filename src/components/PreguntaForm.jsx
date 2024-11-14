import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PreguntaForm.css';

function PreguntaForm() {
  const { id_pregunta } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const id_exposicion = location.state?.id_exposicion;
  const [pregunta, setPregunta] = useState({
    texto_pregunta: '',
    opcion_1: '',
    opcion_2: '',
    opcion_3: '',
    respuesta_correcta: 1,
  });

  useEffect(() => {
    if (id_pregunta) {
      const fetchPregunta = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`https://museoapi.org/admin/preguntas/${id_pregunta}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPregunta(response.data);
        } catch (error) {
          console.error('Error al cargar la pregunta:', error);
        }
      };
      fetchPregunta();
    }
  }, [id_pregunta]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (id_pregunta) {
        await axios.put(`https://museoapi.org/admin/preguntas/${id_pregunta}`, { ...pregunta, id_exposicion }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('https://museoapi.org/admin/preguntas', { ...pregunta, id_exposicion }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate(`/exposiciones/${id_exposicion}`);
    } catch (error) {
      console.error('Error al guardar la pregunta:', error);
    }
  };

  return (
    <div className="form-container">
      <Link to={`/exposiciones/${id_exposicion}`} className="back-btn">← Volver a la Exposición</Link>
      <h2>{id_pregunta ? 'Editar Pregunta' : 'Crear Pregunta'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Texto de la Pregunta:</label>
          <input
            type="text"
            value={pregunta.texto_pregunta}
            onChange={(e) => setPregunta({ ...pregunta, texto_pregunta: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Opción 1:</label>
          <input
            type="text"
            value={pregunta.opcion_1}
            onChange={(e) => setPregunta({ ...pregunta, opcion_1: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Opción 2:</label>
          <input
            type="text"
            value={pregunta.opcion_2}
            onChange={(e) => setPregunta({ ...pregunta, opcion_2: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Opción 3:</label>
          <input
            type="text"
            value={pregunta.opcion_3}
            onChange={(e) => setPregunta({ ...pregunta, opcion_3: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Respuesta Correcta:</label>
          <select
            value={pregunta.respuesta_correcta}
            onChange={(e) => setPregunta({ ...pregunta, respuesta_correcta: parseInt(e.target.value) })}
          >
            <option value={1}>Opción 1</option>
            <option value={2}>Opción 2</option>
            <option value={3}>Opción 3</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">{id_pregunta ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
}

export default PreguntaForm;
