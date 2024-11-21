import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import ZonasList from './components/ZonasList';
import ZonaForm from './components/ZonaForm';
import ExposicionesList from './components/ExposicionesList';
import ExposicionForm from './components/ExposicionForm';
import PreguntasList from './components/PreguntasList';
import PreguntaForm from './components/PreguntaForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zonas" element={<ZonasList />} />
        <Route path="/zonas/:id_zona" element={<ZonaForm />} />
        <Route path="/zonas/create" element={<ZonaForm />} />
        <Route path="/exposiciones" element={<ExposicionesList />} />
        <Route path="/exposiciones/:id_exposicion" element={<ExposicionForm />} />
        <Route path="/exposiciones/create" element={<ExposicionForm />} />
        <Route path="/preguntas/create/:id_exposicion" element={<PreguntaForm />} /> Nueva Ruta
        <Route path="/preguntas/create" element={<PreguntaForm />} />
        <Route path="/preguntas/:id_pregunta" element={<PreguntaForm />} /> {/* Editar Pregunta */}
        <Route path="/preguntas" element={<PreguntasList />} />
      </Routes>
    </Router>
  );
}

export default App;
