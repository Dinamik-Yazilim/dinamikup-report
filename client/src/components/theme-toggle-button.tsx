"use client"

// import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
export interface ThemeToggleButtonProps {
  className?: string
  title?: string
}
export const ThemeToggleButton = ({
  className = '',
  title = 'For a greener 🌍Earth, please use 🌙Dark Mode'
}: ThemeToggleButtonProps) => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <Button
        variant="outline" size="icon" onClick={(e) => {
          theme === 'light' ? setTheme("dark") : setTheme("light")
        }}
        className={`${className}`}
        title={title}
      >
        <Moon className="h-[1.6rem] w-[1.6rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Sun className="absolute h-[1.6rem] w-[1.6rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        {/* <span className="sr-only">Toggle theme</span> */}
      </Button>
    </>

  )
}

export default ThemeToggleButton
