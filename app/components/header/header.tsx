"use client";

import { useAuth } from "@/app/contexts/AuthProvider";
import { useLoader } from "@/app/contexts/LoaderProvider";
import { useState } from "react";
import MenuButton from "../menu-button/menu-button";
import NavMenu from "../nav-menu/nav-menu";
import { useHistory } from "@/app/contexts/HistoryProvider";
import Button from "../ui/Button";

export default function Header({ className }:{ className: string }) {
  const { isAuthenticated, currentUser, logOut, signIn } = useAuth();
  const { chatsList } = useHistory();
  const { showLoader } = useLoader();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

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
    <header className={`text-right p-4 bg-verde-oliva-escuro flex items-start justify-between z-[999] ${className}`}>
      <div className="flex flex-col items-start bg-marrom-carvao rounded-md z-[99999]">
        { isAuthenticated && chatsList.length > 0 
          && <>
            <MenuButton onClick={handleMenu} />
            { isMenuOpen && <NavMenu /> }
          </>
        }
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <div className="inline-block text-marfim mr-4">
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