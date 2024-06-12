import React, { createContext, useContext, useState } from 'react'
import { RouterProvider, Routes } from 'react-router-dom'
import { RoutesComponent } from './routes'
import { AuthContext, AuthProvider } from './context/AuthContext'

export const App = () => {
  
    return (
          <RoutesComponent/>
  )
}
