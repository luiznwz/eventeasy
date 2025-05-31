"use client";
import { useEffect, useState } from "react";
import { useValidateToken } from "./useValidateToken";
import { projectConstants } from "@/util/constants";
import useAuthContext from "./useAuthContext";
import { usePathname, useRouter } from "next/navigation";

export const useAutoLogin = () => {
  const { setUser, setIsLogged } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem(projectConstants.token));
    }
  }, []);

  const { data: userData, error } = useValidateToken(token || "");

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setIsLogged(true);
      if(pathname === '/sign-in' || pathname === '/sign-up') {
        router.push('/')
      }
    }

    if (error) {
      localStorage.removeItem(projectConstants.token);
      setIsLogged(false);
    }
  }, [userData, error, router, setIsLogged, setUser, pathname]);
};