import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PreguntaForm.css';

function PreguntaForm() {
  const { id_pregunta } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [zonas, setZonas] = useState([]);
  const [exposiciones, setExposiciones] = useState([]);
  const [pregunta, setPregunta] = useState({
    nombre_exposicion: 0,
    texto_pregunta: '',
    opcion_1: '',
    opcion_2: '',
    opcion_3: '',
    respuesta_correcta: 1,
    id_zona: '',
  });

  console.log(pregunta);

  useEffect(() => {
    const fetchOptions = async () => {
      const token = localStorage.getItem('token');
      try {
        // Fetch zonas
        const zonasResponse = await axios.get('https://museoapi.org/admin/zonas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setZonas(zonasResponse.data);

        // Fetch exposiciones
        const exposicionesResponse = await axios.get('https://museoapi.org/admin/exposiciones', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExposiciones(exposicionesResponse.data);
      } catch (error) {
        console.error('Error al cargar zonas o exposiciones:', error);
      }
    };

    fetchOptions();

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
        await axios.put(`https://museoapi.org/admin/preguntas/${id_pregunta}`, pregunta, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('https://museoapi.org/admin/preguntas', pregunta, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate('/preguntas');
    } catch (error) {
      console.error('Error al guardar la pregunta:', error);
    }
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
        <div className="form-group">
          <label>Zona:</label>
          <select
            value={pregunta.id_zona}
            onChange={(e) => setPregunta({ ...pregunta, id_zona: e.target.value })}
            required
          >
            <option value="">Seleccione una Zona</option>
            {zonas.map((zona) => (
              <option key={zona.id_zona} value={zona.id_zona}>
                {zona.nombre_zona}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Exposición (opcional):</label>
          <select
            value={pregunta.nombre_exposicion}
            onChange={(e) => setPregunta({ ...pregunta, nombre_exposicion: e.target.value })}
          >
            <option value="">Sin Exposición</option>
            {exposiciones.map((expo) => (
              <option key={expo.id_exposicion} value={expo.id_exposicion}>
                {expo.nombre_exposicion}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">{id_pregunta ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
}

export default PreguntaForm;
