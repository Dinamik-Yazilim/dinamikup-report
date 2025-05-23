"use client"
import Link from "next/link"
// import { Separator } from '@/components/ui/separator'
// import HorizontalLineWithText from '@/components/horizontal-line-with-text'
// import ThemeToggleButton from '@/components/theme-toggle-button'
// import { HeaderLogo2 } from '@/components/logo'
// import MagicLinkSignIn from '../(components)/magic-link-signin'
// import EmailPasswordRegister from '../(components)/email-password-register'
// import SSOSignIn from '../(components)/sso-signin'
import { toast } from "sonner"
// import Loading from '@/components/loading'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from "@/components/ui/use-toast"



const RegisterPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    rePassword: ''
  })
  const registerWithEmailPassword = () => {
    if (!formData.firstName)
      return toast({ description: 'first name is required' })
    if (!formData.lastName)
      return toast({ description: 'last name required' })
    if (!formData.email)
      return toast({ description: 'email required' })

    if (formData.password.length < 8)
      return toast({ description: 'password must be least 8 characters' })

    if (formData.rePassword != formData.password)
      return toast({ description: 'password does not match' })

    postItem('/auth/signup', '', formData)
      .then(result => {
        console.log('result:', result)
        router.push(`/auth/register/verify?email=${formData.email}`)
      })
      .catch(err => {
        toast({ title: 'Error', description: err, variant: 'destructive', duration: 1000 })
        console.log('Hata:', err)
      })
  }

  return (
    <div className='h-full flex justify-center w-full mt-8'>
      <div className="w-full  mb-6 text-2xl max-w-[450px] space-y-4">

        <div className='flex flex-col mb-4'>

          <div className='rounded-lg border border-dashed border-opacity-50 border-slate-400 p-4 space-y-4'>
            <Label >Register</Label>
            <div className='flex flex-col space-y-4' >
              <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col space-y-2'>
                  <Label>First Name</Label>
                  <Input
                    className='ps-2'
                    type='text'
                    placeholder='First Name'
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className='flex flex-col space-y-2'>
                  <Label>Last Name</Label>
                  <Input
                    className='ps-2'
                    type='text'
                    placeholder='Last Name'
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label>Email</Label>
                <Input
                  className='ps-2'
                  type='email'
                  placeholder='Email'
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col space-y-2'>
                  <Label>Password</Label>
                  <Input
                    className='ps-2'
                    type='password'
                    placeholder='Password'
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div className='flex flex-col space-y-2'>
                  <Label>Re-type Password</Label>
                  <Input
                    className='ps-2'
                    type='password'
                    placeholder='Re-password'
                    onChange={e => setFormData({ ...formData, rePassword: e.target.value })}
                  />
                </div>
              </div>
              <div className={`flex flex-row justify-end`}>

                <Button className={`col-span-2`} variant={'default'}
                  onClick={registerWithEmailPassword}
                  title='register'
                >
                  <i className="text-2xl fa-solid fa-check"></i>
                </Button>
              </div>
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
    </div>
  )
}

export default RegisterPage