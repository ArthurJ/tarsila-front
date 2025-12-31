"use client";

import { useAuth } from "@/app/contexts/AuthProvider";
import { useLoader } from "@/app/contexts/LoaderProvider";
import { useState, useEffect, useRef } from "react";
import NavMenu from "../nav-menu/nav-menu";
import { useHistory } from "@/app/contexts/HistoryProvider";
import Button from "../ui/Button";
import Image from "next/image";
import { UserRound, Menu } from "lucide-react";

export default function Header({ className }:{ className: string }) {
  const { isAuthenticated, currentUser, logOut, signIn } = useAuth();
  const { chatsList } = useHistory();
  const { showLoader } = useLoader();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target as Node)) {
        setAvatarMenuOpen(false);
      }
      if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleMenu() {
    setMenuOpen(!isMenuOpen)
  };

  function handleAvatarMenu() {
    setAvatarMenuOpen(!isAvatarMenuOpen);
  };

  function leave() {
    showLoader();
    logOut();
  }

  function handleGoogleSignIn() {
    showLoader();
    signIn();
  }

  return (
    <header className={`sticky top-0 p-4 bg-marfim flex items-center justify-between z-[999] transition-shadow duration-200 ${hasScrolled ? 'shadow-lg' : ''} ${className}`}>
      <div className="flex items-inherit">
        <Image
          src="/logo-text.svg"
          alt="Tarsila Logo"
          width={120}
          height={40}
          priority
        />
      </div>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <div className="relative" ref={avatarMenuRef}>
              <button
                onClick={handleAvatarMenu}
                className="text-laranja-queimado hover:text-laranja transition-colors duration-200 p-2"
                aria-label="User menu"
              >
                <UserRound size={24} />
              </button>
              
              { isAvatarMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-marfim border border-gray-200 rounded-md shadow-lg min-w-48 z-[99999]">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm text-marrom-carvao font-medium">{currentUser?.displayName}</p>
                    <p className="text-xs text-gray-600">{currentUser?.email}</p>
                  </div>
                  
                  <ul className="py-1">
                    <li>
                      <button className="w-full text-left px-4 py-2 text-sm text-marrom-carvao hover:bg-verde-oliva-claro/10 transition-colors duration-200">
                        Ajuda
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 text-sm text-marrom-carvao hover:bg-verde-oliva-claro/10 transition-colors duration-200">
                        Configurações
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 text-sm text-marrom-carvao hover:bg-verde-oliva-claro/10 transition-colors duration-200">
                        Contato
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => leave()}
                        className="w-full text-left px-4 py-2 text-sm text-marrom-carvao hover:bg-verde-oliva-claro/10 transition-colors duration-200 border-t border-gray-200"
                      >
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            { chatsList.length > 0 && (
              <div className="relative" ref={hamburgerMenuRef}>
                <button
                  onClick={handleMenu}
                  className="text-laranja-queimado hover:text-laranja transition-colors duration-200 p-2"
                  aria-label="Menu"
                >
                  <Menu size={24} className="mt-0.5" />
                </button>
                { isMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-marrom-carvao rounded-md shadow-lg z-[99999]">
                    <NavMenu />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <Button 
            size="sm"
            className="w-40"
            onClick={() => handleGoogleSignIn()}
          >
            Entrar com Google
          </Button>
        )}
      </div>
    </header>
  );
}