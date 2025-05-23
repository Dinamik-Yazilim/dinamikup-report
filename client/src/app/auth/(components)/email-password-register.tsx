"use client"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { postItem } from '@/lib/fetch'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useToast } from "@/components/ui/use-toast"

interface EMailPasswordRegisterProps {
  // email?: string,
  className?: string,
  children?: any
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  redirectUrl?: string
}
export default function EMailPasswordRegister({
  // provider,
  className,
  children,
  variant,
  redirectUrl = '#',
  ...props
}: EMailPasswordRegisterProps) {
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

        router.push(`${redirectUrl}`)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive', duration: 1000 }))
  }


  return (
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

        <Button className={`col-span-2`} variant={variant || 'default'}
          onClick={registerWithEmailPassword}
          title='register'
        >
          <i className="text-xl fa-solid fa-user-plus"></i>
        </Button>
      </div>
    </div>
  )
}
