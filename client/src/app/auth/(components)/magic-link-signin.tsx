"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface MagicLinkSignInProps {
  // email?: string,
  className?: string,
  children?: any
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  redirectUrl?: string
}
export default function MagicLinkSignIn({
  // provider,
  className,
  children,
  variant,
  redirectUrl = '#',
}: MagicLinkSignInProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const loginWithMagicLink = () => {
    const deviceId = Cookies.get('deviceId')
    postItem('/auth/magicLink', '', {
      email: email,
      deviceId: deviceId,
      web: 'aliabi.org',
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/magicLink`
    })
      .then(result => {
        console.log('result:', result)
        router.push(`${redirectUrl}?email=${email}`)
      })
      .catch(err => {
        console.log('Hata:', err)
      })
  }

  return (

    <div className={`grid grid-cols-12 gap-1 w-full ${className}`}>
      {/* <div className="relative col-span-12 text-sm">
        {email}
      </div> */}
      <div className="relative col-span-10">
        <Input
          className='ps-2'
          type='email'
          placeholder='Magic Link'
          required
          onBlur={e => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <Button className={`col-span-2`} variant={variant || 'default'}
        onClick={loginWithMagicLink}
      >
        <i className="text-xl fa-regular fa-envelope"></i>
      </Button>
    </div>
  )
}
