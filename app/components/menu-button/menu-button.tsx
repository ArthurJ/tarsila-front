"use client";

import MenuIcon from "../../icons/menu"

interface MenuButtonProps {
  onClick: () => void;
}

export default function MenuButton({ onClick }: MenuButtonProps ) {
  const iconSize = (size: string) => ({ width: size, height: size })
  
  return (
    <button 
      className="flex p-2" 
      onClick={onClick}
    >
      <MenuIcon {...iconSize("1rem")} />
    </button>
  );
};