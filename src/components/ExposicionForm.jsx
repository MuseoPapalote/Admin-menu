import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ExposicionForm() {
  const { id_exposicion } = useParams();
  const [exposicion, setExposicion] = useState({
    nombre_exposicion: '',
    descripcion: '',
    codigo_qr: '',
    activo: true,
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (id_exposicion) {
      const fetchExposicion = async () => {
        const response = await axios.get(`http://localhost:8080/admin/exposiciones/${id_exposicion}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setExposicion(response.data);
      };
      fetchExposicion();
    }
  }, [id_exposicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExposicion({ ...exposicion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id_exposicion) {
      await axios.put(`http://localhost:8080/admin/exposiciones/${id_exposicion}`, exposicion);
    } else {
      await axios.post('http://localhost:8080/admin/exposiciones', exposicion);
    }
    navigate('/exposiciones');
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/admin/exposiciones/${id_exposicion}`);
    navigate('/exposiciones');
  };

  return (
    <div>
      <h2>{id_exposicion ? 'Editar Exposición' : 'Crear Exposición'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la Exposición:</label>
          <input
            type="text"
            name="nombre_exposicion"
            value={exposicion.nombre_exposicion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={exposicion.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Código QR:</label>
          <input
            type="text"
            name="codigo_qr"
            value={exposicion.codigo_qr}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Activo:</label>
          <input
            type="checkbox"
            name="activo"
            checked={exposicion.activo}
            onChange={(e) => setExposicion({ ...exposicion, activo: e.target.checked })}
          />
        </div>
        <button type="submit">{id_exposicion ? 'Actualizar' : 'Crear'}</button>
        {id_exposicion && (
          <button type="button" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default ExposicionForm;
