"use client"
import { Button } from '@/components/ui/button'
import Image from "next/image"
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getItem } from '@/lib/fetch'
import CustomLink from '@/components/custom-link'
import Cookies from 'js-cookie'
import { UserType } from '@/types/UserType'

const MePage = () => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      getItem('/me', token)
        .then(result => setUser(result as UserType))
        .catch(err => console.log(err))
    }
  }, [token])

  return (<>
    {user && <>
      <div className="w-f11ull m11ax-w-3xl mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image || '/placeholder-user.jpg'} alt="@shadcn" />
            <AvatarFallback>{user.firstName} {user.lastName}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <p className="text-muted-foreground">{user.title}</p>
          </div>
        </div>
        <div className="grid gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">
              {user.bio}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-envelope h-5 w-5 text-muted-foreground" ></i>
                <span>{user.email}</span>
              </div>
              {user.phoneNumber && <>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-phone h-5 w-5 text-muted-foreground" />
                  <span>+{user.phoneNumber}</span>
                </div>
              </>}
              {user.links && user.links.map((e: string, index: number) => <>
                <div key={`user-link-${index}`} className="flex items-center gap-2">
                  <i className="fa-solid fa-link h-5 w-5 text-muted-foreground" />
                  <CustomLink key={index} href={e} >
                    {e.includes('//') ? e.split('//')[1] : e}
                  </CustomLink>
                </div>
              </>)}


            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-days h-5 w-5 text-muted-foreground" />
                <span>{user.dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot h-5 w-5 text-muted-foreground" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-cake-candles h-5 w-5 text-muted-foreground" />
                <span>{user.married ? 'Married' : 'Single'}</span>
                <span>{(user.children || 0) > 0 ? `${user.children} children` : ''}</span>
              </div>
            </div>
          </div>

        </div>
        <div className='w-full flex flex-row justify-end gap-4'>
          <Link href="/me/edit" className="bg-primary text-primary-foreground py-2 px-3 rounded-md text-2xl">
            <i className="fa-regular fa-edit"></i>
          </Link>
        </div>
      </div>
    </>}
  </>)
}

export default MePage