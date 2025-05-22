import React from "react";
import { twMerge } from "tailwind-merge";

const baseStyles='p-3 border-1 border-gray-800'
export default function Button({ children, className }) {
  return <button className={twMerge(baseStyles, className)}>{children}</button>;
}
