"use client";

import { useAuth } from "@/app/contexts/AuthProvider";
import { useLoader } from "@/app/contexts/LoaderProvider";
import { useState } from "react";
import MenuButton from "../menu-button/menu-button";
import NavMenu from "../nav-menu/nav-menu";
import { useHistory } from "@/app/contexts/HistoryProvider";
import Button from "../ui/Button";

export default function Header() {
  const { isAuthenticated, currentUser, logOut } = useAuth();
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

  return (
    isAuthenticated && (
      <header className="text-right p-4 bg-verde-oliva-escuro flex items-start justify-between h-16 z-[999]">
        <div className="flex flex-col items-start bg-marrom-carvao rounded-md z-[99999]">
          { chatsList.length > 0 
            && <>
              <MenuButton onClick={handleMenu} />
              { isMenuOpen && <NavMenu /> }
            </>
          }
        </div>
        <div>
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
        </div>
      </header>
    )
  );
}