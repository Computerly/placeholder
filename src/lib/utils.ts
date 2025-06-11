import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { seperator, baseTitle } from "$lib/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makePageTitle(pageName: string = '') {
  if (pageName === '') {
    return baseTitle
  }
  return pageName + seperator + baseTitle;
}