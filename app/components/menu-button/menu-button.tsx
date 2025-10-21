"use client";

import MenuIcon from "../../icons/menu"
import Button from "../ui/Button";

interface MenuButtonProps {
  onClick: () => void;
}

export default function MenuButton({ onClick }: MenuButtonProps ) {
  const iconSize = (size: string) => ({ width: size, height: size })
  
  return (
    <Button 
      size="sm"
      className="flex p-2" 
      onClick={onClick}
    >
      <MenuIcon {...iconSize("1rem")} />
    </Button>
  );
};