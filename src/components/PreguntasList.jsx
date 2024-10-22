import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PreguntasList() {
  const [preguntas, setPreguntas] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPreguntas = async () => {
      const response = (await axios.get('http://localhost:8080/admin/preguntas', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
      }));
      setPreguntas(response.data);
    };
    fetchPreguntas();
  }, []);

  return (
    <div>
      <h2>Preguntas de Trivia</h2>
      <ul>
        {preguntas.map((pregunta) => (
          <li key={pregunta.id_pregunta}>
            <Link to={`/preguntas/${pregunta.id_pregunta}`}>{pregunta.texto_pregunta}</Link>
          </li>
        ))}
      </ul>
      <Link to="/preguntas/create">
        <button>Crear Nueva Pregunta</button>
      </Link>
    </div>
  );
}

export default PreguntasList;
