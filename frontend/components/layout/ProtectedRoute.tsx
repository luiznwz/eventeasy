"use client";
import { useEffect } from 'react';
import useAuthContext from '@/hooks/auth/useAuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isLogged } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!isLogged) {
            router.push('/sign-in'); 
        }
        console.log('isLogged', isLogged)
    }, [isLogged, router]);

    if (!isLogged) {
        return null; 
    }

    return <>{children}</>; 
}