import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PreguntasList.css'; // Estilos para las preguntas

function PreguntasList() {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://museoapi.org/admin/preguntas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPreguntas(response.data);
    };

    fetchPreguntas();
  }, []);

  return (
    <div className="preguntas-list-container">
      <Link to="/dashboard" className="back-btn">← Volver al Dashboard</Link>
      <h2>Preguntas de Trivia</h2>
      <Link to="/preguntas/create" className="create-btn">+ Crear Nueva Pregunta</Link>
      <div className="preguntas-list">
        {preguntas.map((pregunta) => (
          <div key={pregunta.id_pregunta} className="pregunta-card">
            <h3>{pregunta.texto_pregunta}</h3>
            <p>Opción 1: {pregunta.opcion_1}</p>
            <p>Opción 2: {pregunta.opcion_2}</p>
            <p>Opción 3: {pregunta.opcion_3}</p>
            <p>Respuesta Correcta: Opción {pregunta.respuesta_correcta}</p>
            <Link to={`/preguntas/${pregunta.id_pregunta}`} className="edit-btn">Editar</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreguntasList;
