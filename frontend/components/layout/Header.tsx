"use client";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MobileMenu } from "./MobileMenu";
import { useEffect, useState } from "react";
import { Menu, X } from 'lucide-react';
import { useAutoLogin } from "@/hooks/auth/useAutoLogin";

export default function Header() {

    useAutoLogin();
    const { isLogged, user, logout } = useAuthContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 719);
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <header className="max-w-7xl mx-auto py-5 sticky top-0 z-50 bg-white">
      <div className="w-full flex items-center">
          <div className="flex-shrink-0">
              <Link href="/">
                  <p className="text-3xl font-semibold flex items-center gap-1">
                      <Calendar className="h-6 w-6 text-blue-500" />
                      <span className="text-blue-500">EventoFacil</span>
                  </p>
              </Link>
          </div>
  
          {!isMobile && (
              <>
                  <div className="flex-grow flex justify-center">
                      {isLogged && user && (
                          <div className="flex items-center gap-4">
                              <Button asChild variant='link' className="md:px-8">
                                  <Link
                                      className="text-md font-semibold hover:text-blue-500 transition-colors"
                                      href="/painel"
                                  >
                                      Painel de Eventos
                                  </Link>
                              </Button>
                              <Button asChild variant='link' className="md:px-8">
                                  <Link
                                      className="text-md font-semibold hover:text-blue-500 transition-colors"
                                      href="/minhas-inscricoes"
                                  >
                                      Minhas Inscrições
                                  </Link>
                              </Button>
                          </div>
                      )}
                  </div>
  
                  <div className="flex-shrink-0">
                      {isLogged && user && (
                          <Button
                              variant="outline"
                              onClick={() => logout()}
                              className="cursor-pointer sm:px-8"
                          >
                              Sair
                          </Button>
                      )}
                      {!isLogged && (
                          <div className="flex items-center gap-6">
                              <Button asChild variant='outline' className="md:px-8">
                                  <Link
                                      className="text-md font-medium hover:text-blue-500 transition-colors"
                                      href="/sign-in"
                                  >
                                      Entrar
                                  </Link>
                              </Button>
                              <Button asChild className="md:px-8 bg-blue-400 hover:bg-blue-500">
                                  <Link
                                      className="text-md font-medium hover:text-white transition-colors"
                                      href="/sign-up"
                                  >
                                      Cadastrar
                                  </Link>
                              </Button>
                          </div>
                      )}
                  </div>
              </>
          )}
  
          {isMobile && (
              <div className="flex-grow flex justify-end">
                  <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="z-20 p-2 rounded-full hover:bg-blue-500/10 transition-colors duration-200"
                      aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                  >
                      {isMenuOpen ? (
                          <X size="30" className="text-blue-500" />
                      ) : (
                          <Menu size="30" className="text-blue-500" />
                      )}
                  </button>
              </div>
          )}
  
          {isMobile && isMenuOpen && (
              <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          )}
      </div>
  </header>
    );
}
