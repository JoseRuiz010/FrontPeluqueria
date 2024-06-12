import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Horario } from '../pages/Profile';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const RoutesComponent = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <Route path="/" element={<Horario />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
