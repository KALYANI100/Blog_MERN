import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Blog from "./Blog";
import Login from "./Login";
import Landing from "./Landing";
import { AuthContext } from './AuthContext';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', color: '#0066cc', fontSize: '1.2rem' }}>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Blog /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/blog" element={user ? <Blog /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;