import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './PreguntaForm.css'; // Estilos para el formulario

function PreguntaForm() {
  const { id_pregunta } = useParams();
  const [pregunta, setPregunta] = useState({ texto_pregunta: '', tipo_pregunta: 'opcion_multiple' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id_pregunta) {
      const fetchPregunta = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/admin/preguntas/${id_pregunta}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPregunta(response.data);
      };
      fetchPregunta();
    }
  }, [id_pregunta]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (id_pregunta) {
      await axios.put(`http://localhost:8080/admin/preguntas/${id_pregunta}`, pregunta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post('http://localhost:8080/admin/preguntas', pregunta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    navigate('/preguntas');
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/admin/preguntas/${id_pregunta}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate('/preguntas');
  };

  return (
    <div className="form-container">
      <Link to="/preguntas" className="back-btn">← Volver</Link>
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
          <label>Tipo de Pregunta:</label>
          <select
            value={pregunta.tipo_pregunta}
            onChange={(e) => setPregunta({ ...pregunta, tipo_pregunta: e.target.value })}
          >
            <option value="opcion_multiple">Opción Múltiple</option>
            <option value="texto">Texto</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">{id_pregunta ? 'Actualizar' : 'Crear'}</button>
        {id_pregunta && (
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default PreguntaForm;
