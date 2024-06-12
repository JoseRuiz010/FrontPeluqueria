// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Crear el proveedor del contexto
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Aquí puedes cargar el usuario desde el almacenamiento local o hacer una petición a tu API
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        // Guardar el usuario en el estado y en el almacenamiento local
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        // Eliminar el usuario del estado y del almacenamiento local
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
