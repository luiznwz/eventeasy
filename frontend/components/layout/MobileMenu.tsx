import useAuthContext from '@/hooks/auth/useAuthContext';
import { Button } from '../ui/button';
import Link from 'next/link';

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const MobileMenu = ({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) => {
    
    const { logout, isLogged } = useAuthContext();

    return (
        <>
        <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMenuOpen(false)}
            onKeyUp={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                setIsMenuOpen(false);
            }
            }}
        />
        <div
            className={`fixed top-0 right-0 h-full w-72 flex items-center bg-white text-white font-medium shadow-2xl transform transition-transform duration-300 ease-in-out z-10 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <nav className="h-full p-6 pl-16 pt-24">
            {!isLogged && (
                <ul className="flex flex-col justify-start gap-8">
                <li>
                    <Button variant='outline' className="px-8">
                    <Link
                        href="/sign-in"
                        className="flex items-center px-4 py-2 rounded-md group space-x-3 text-blue-500"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="text-[1.05rem] font-medium">Entrar</span>
                    </Link>
                    </Button>
                </li>
                <li>
                    <Button className="bg-blue-500 hover:bg-blue-400">
                    <Link
                        href="/sign-up"
                        className="flex items-center px-4 py-2 rounded-md group space-x-3"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="text-[1.05rem] font-medium">Cadastrar</span>
                    </Link>
                    </Button>
                </li>
                
                </ul>
            )}
            {isLogged && (
                <ul className="flex flex-col justify-start gap-8">
                <li>
                    <Button className="px-8" variant='outline'>
                    <Link
                        href="/sign-in"
                        className="flex items-center px-4 py-2 rounded-md group space-x-3"
                        onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                        }}
                    >
                        <span className="text-[1.05rem] font-medium text-blue-500">Sair</span>
                    </Link>
                    </Button>
                </li>
                </ul>
            )}
            </nav>
        </div>
        </>
    );
};