import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PreguntaForm() {
  const { id_pregunta } = useParams();
  const [pregunta, setPregunta] = useState({ texto_pregunta: '', tipo_pregunta: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id_pregunta) {
      const fetchPregunta = async () => {
        const response = await axios.get(`http://localhost:8080/admin/preguntas/${id_pregunta}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setPregunta(response.data);
      };
      fetchPregunta();
    }
  }, [id_pregunta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPregunta({ ...pregunta, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id_pregunta) {
      await axios.put(`http://localhost:8080/admin/preguntas/${id_pregunta}`, pregunta);
    } else {
      await axios.post('http://localhost:8080/admin/preguntas', pregunta);
    }
    navigate('/preguntas');
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/admin/preguntas/${id_pregunta}`);
    navigate('/preguntas');
  };

  return (
    <div>
      <h2>{id_pregunta ? 'Editar Pregunta' : 'Crear Pregunta'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Texto de la Pregunta:</label>
          <input
            type="text"
            name="texto_pregunta"
            value={pregunta.texto_pregunta}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo de Pregunta:</label>
          <select
            name="tipo_pregunta"
            value={pregunta.tipo_pregunta}
            onChange={handleChange}
            required
          >
            <option value="opcion_multiple">Opción Múltiple</option>
            <option value="texto">Texto</option>
          </select>
        </div>
        <button type="submit">{id_pregunta ? 'Actualizar' : 'Crear'}</button>
        {id_pregunta && (
          <button type="button" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default PreguntaForm;
