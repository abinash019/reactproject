/*import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}*/
// src/lib/utils.js
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

