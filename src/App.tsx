import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import "./App.css"
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default App;