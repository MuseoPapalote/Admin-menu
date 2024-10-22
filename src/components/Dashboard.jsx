import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Panel de Administración</h2>
      <ul>
        <li><Link to="/zonas">Zonas</Link></li>
        <li><Link to="/exposiciones">Exposiciones</Link></li>
        <li><Link to="/preguntas">Preguntas</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
