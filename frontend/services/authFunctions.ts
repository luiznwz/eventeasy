"use client"
import axiosInstance from '@/services/axiosInstance'
import { projectConstants } from '@/util/constants'
import { User } from '@/util/types/userReturnedData'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'


export default function AuthFunctions() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    const register = async (name: string, email: string, password: string) => {
        try {
          setIsLoading(true)
          const res = await axiosInstance.post('/user/register', { name, email, password })
  
          if (res.status !== 200) {
            throw new Error('Erro ao fazer cadastro')
          }
          toast.success('Usuário cadastrado com sucesso!')
        }
        catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
              toast.error('Usuário ou senha inválidos.');
            } else {
              toast.error('Erro ao tentar fazer cadastro.');
            }
          }
        }
        finally {
          setIsLoading(false)
          router.push('/sign-in')
        }
    }
  
    const login = async (email: string, password: string) => {
      try {
        setIsLoading(true)
        const res = await axiosInstance.post('/auth/login', { email, password })
        
        if (res.status !== 201) {
          throw new Error('Erro ao fazer login')
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(projectConstants.token, res.data.token);
        }        
        setIsLogged(true)
        setUser({ id: res.data.id, name: res.data.name, email: res.data.email })
      }
      catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            toast.error('Usuário ou senha inválidos.');
          } else {
            toast.error('Erro ao tentar fazer login.');
          }
        } else {
          toast.error('Erro interno do servidor, tente novamente mais tarde.');
        }
      }
      finally {
        setIsLoading(false)
        router.push('/painel')
      }
    }
  
    const logout = () => {
      localStorage.removeItem(projectConstants.token)
      setIsLogged(false)
      setUser(null)
      router.push('/sign-in')
    }

    return {
        register,
        user, 
        setUser,
        login, 
        logout, 
        isLoading, 
        isLogged,
        setIsLogged
    }
}
