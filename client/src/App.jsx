import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'


import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  return (
    <Routes>
      <Route 
        path='/'
        element={<Login />}
      />

      <Route 
        path='/login'
        element={<Login />}
      />

      <Route 
        path='/Register'
        element={<Register />}
      />

      <Route 
        path='/Dashboard'
        element={<Dashboard />}
      />
    </Routes>
  );
}

export default App
