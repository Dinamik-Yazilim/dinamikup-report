import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function moneyFormat(x?: number, decimal: number = 2) {
  if (!x) {
    x = 0
  }
  let ondalik = 1
  Array.from(Array(decimal).keys()).forEach(() => ondalik = ondalik * 10)
  x = Math.round(ondalik * x) / ondalik

  return x.toLocaleString("en-US") + (x - Math.floor(x) == 0 && decimal > 0 ? '.' + '0'.repeat(decimal) : '')
  // return x.toLocaleString() + (x - Math.floor(x) == 0 ? '.00' : '')


}


export function currSymbol(currency?: string) {
  switch (currency) {
    case 'TL':
    case 'TRY':
      return '₺'
    case 'USD':
      return '$'
    case 'EUR':
    case 'EURO':
      return '€'
    default:
      return currency
  }
}

export function yesterday() {
  return new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10)
}

export function today() {
  return new Date().toISOString().substring(0, 10)
}