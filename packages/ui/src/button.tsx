"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="text-customWhite bg-customBlue-dark py-2 px-4 rounded-full font-bold hover:bg-customBlue-mid">
      {children}
    </button>

  );
};
