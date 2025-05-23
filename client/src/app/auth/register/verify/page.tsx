"use client"

import Link from "next/link"
import { Button } from '@/components/ui/button'
import { useRouter, redirect, RedirectType, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Separator } from '@/components/ui/separator'
import HorizontalLineWithText from '@/components/horizontal-line-with-text'
import ThemeToggleButton from '@/components/theme-toggle-button'
import { HeaderLogo2 } from '@/components/logo'
import MagicLinkSignIn from '../../(components)/magic-link-signin'
import EmailPasswordRegister from '../../(components)/email-password-register'
import SSOSignIn from '../../(components)/sso-signin'
import { toast } from "sonner"
import { postItem } from '@/lib/fetch'
import Loading from '@/components/loading'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useState } from 'react'





const VerifyPage = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const router = useRouter()
  const [authCode, setAuthCode] = useState('')

  const verify = () => {
    postItem(`/auth/verify`, '', { email: email, authCode: authCode })
      .then(resp => {
        console.log('verify result:', verify)
        router.replace('/auth/login')
      })
      .catch(err => toast(err))
  }

  return (<div className=' h-full flex items-center justify-center w-full'>
    <div className="w-full  mb-6 text-2xl max-w-[450px] space-y-4">
      <div className='flex flex-col mb-4'>
        <div className='rounded-lg border border-dashed border-opacity-50 border-slate-400 p-4 space-y-4'>
          <Label >Verify</Label>
          <div className="flex flex-col space-y-2">
            <Label>Email</Label>
            <Label>{email}</Label>

          </div>
          <div className="flex flex-col space-y-2">
            <Label>Auth Code</Label>
            <InputOTP
              maxLength={6} pattern={REGEXP_ONLY_DIGITS}
              defaultValue={authCode}
              onChange={e => setAuthCode(e)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className={`flex flex-row justify-end`}>

            <Button className={`col-span-2`} variant={'default'}
              onClick={verify}
              title='register'
            >
              <i className="text-2xl fa-solid fa-check-double"></i>
            </Button>
          </div>
          <p className="w-full mt-6 text-start text-sm text-muted-foreground ">
            <Link
              href="/auth/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Go back to Login Page
            </Link>
          </p>
        </div>
      </div>




      <p className="w-full mt-6 text-center text-xs text-muted-foreground ">
        By clicking continue, you agree to our{" "}
        <Link
          href="#"  // qwerty terms, privacy, dpa, etc
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"  // qwerty terms, privacy, dpa, etc
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>

      </p>


    </div>
    {/* </div> */}
  </div>
  )
}

export default VerifyPage