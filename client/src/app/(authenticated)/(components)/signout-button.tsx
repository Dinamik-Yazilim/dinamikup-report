"use client"

import { ButtonConfirm } from '@/components/button-confirm'
// import * as React from "react"

import { Button } from "@/components/ui/button"
// import { authSignOut } from '@/lib/authHelper'
import Cookies from 'js-cookie'
// import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
interface SignOutButtonProps {
  className?: string
  title?: string
}

export default function SignOutButton({ className = '', title = 'Exit' }: SignOutButtonProps) {
  const router = useRouter()

  return (
    <Button variant={'outline'}
      onClick={() => {
        if (confirm('Çıkış?')) {
          Cookies.remove('aliabi.pkce.code_verifier')
          Cookies.remove('aliabi.csrfToken')
          Cookies.remove('aliabi.callbackUrl')
          Cookies.remove('aliabi.sessionToken')
          Cookies.remove('token')
          Cookies.remove('user')
          Cookies.remove('db')
          Cookies.remove('firm')
          Cookies.remove('period')
          Cookies.remove('dbList')
          setTimeout(() => {
            router.push('/auth/login')
          }, 300)
        }
      }}
    >
      <i className='fa-solid fa-power-off'></i>
    </Button>
  )
}


