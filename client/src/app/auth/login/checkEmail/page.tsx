"use client"
import { Label } from "@/components/ui/label"

import ThemeToggleButton from '@/components/theme-toggle-button'
import { HeaderLogo2 } from '@/components/logo'
import { redirect, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'


const LoginPage = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='grid grid-cols-1 gap-4 text-center'>

          <Label className='text-2xl' >{email}</Label>
          <Label >Check your e-mail (inbox and spam folder)</Label>
        </div>
      </div>
    </>)
}

export default LoginPage