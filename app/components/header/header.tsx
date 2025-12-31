"use client";

import { useAuth } from "@/app/contexts/AuthProvider";
import { useLoader } from "@/app/contexts/LoaderProvider";
import { useState, useEffect } from "react";
import MenuButton from "../menu-button/menu-button";
import NavMenu from "../nav-menu/nav-menu";
import { useHistory } from "@/app/contexts/HistoryProvider";
import Button from "../ui/Button";
import Image from "next/image";

export default function Header({ className }:{ className: string }) {
  const { isAuthenticated, currentUser, logOut, signIn } = useAuth();
  const { chatsList } = useHistory();
  const { showLoader } = useLoader();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleMenu() {
    setMenuOpen(!isMenuOpen)
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
    <header className={`sticky top-0 p-4 bg-marfim flex items-center justify-between z-[999] transition-shadow duration-200 ${hasScrolled ? 'shadow-sm' : ''} ${className}`}>
      <div className="flex items-center gap-4">
        <Image
          src="/logo-text.svg"
          alt="Tarsila Logo"
          width={120}
          height={40}
          priority
        />
        { isAuthenticated && chatsList.length > 0 
          && <div className="flex flex-col items-start bg-marrom-carvao rounded-md z-[99999]">
            <MenuButton onClick={handleMenu} />
            { isMenuOpen && <NavMenu /> }
          </div>
        }
      </div>

      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <div className="inline-block text-marrom-carvao mr-4">
              {currentUser?.displayName}
            </div>
            <Button 
              size="sm"
              className="w-24"
              onClick={() => leave()}
            >
              Sair
            </Button>
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