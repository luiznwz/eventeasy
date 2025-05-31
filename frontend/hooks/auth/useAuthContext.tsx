"use client"

import React, { createContext, useContext } from 'react'
import AuthFunctions from '../../services/authFunctions'
import { User } from '@/util/types/userReturnedData'

interface AuthContextProps {
  user: User | null,
  register: (name: string, email: string, password: string) => void
  login: (email: string, password: string) => void
  logout: () => void
  isLoading: boolean
  isLogged: boolean
  setUser: (user: User | null) => void
  setIsLogged: (isLogged: boolean) => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const { user, setUser, register, login, logout, isLoading, isLogged, setIsLogged } = AuthFunctions()
  
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isLogged, register, setUser, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context
}
