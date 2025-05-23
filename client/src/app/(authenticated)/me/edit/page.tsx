"use client"
import { Button } from '@/components/ui/button'
import Image from "next/image"
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getItem, postItem } from '@/lib/fetch'
import CustomLink from '@/components/custom-link'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { UserType } from '@/types/UserType'

export default function MeEditPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [user, setUser] = useState<UserType>({})
  const [newLink, setNewLink] = useState('')

  const save = () => {
    postItem('/me', token, user)
      .then(result => {
        console.log('autoSave result:', result)
        Cookies.set('user', JSON.stringify(result))
        router.replace('/me')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!token) setToken(Cookies.get('token') || '')
  }, [])
  useEffect(() => {
    if (token) {
      getItem('/me', token)
        .then(result => setUser(result))
        .catch(console.error)
    }
  }, [token])
  return (<>
    {user && <>

      <div className="w-fu11ll m11ax-w-3xl mx-auto py-8 px-0 md:px-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.image || '/placeholder-user.jpg'} alt="@shadcn" />
            <AvatarFallback>{user.fullName}</AvatarFallback>
          </Avatar>
          <div>
            <div className='flex flex-row gap-2'>
              <Input className="text-2xl font-bold" defaultValue={user.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })} />
              <Input className="text-2xl font-bold" defaultValue={user.lastName} onChange={e => setUser({ ...user, lastName: e.target.value })} />
            </div>

            <Input defaultValue={user.title} onChange={e => setUser({ ...user, title: e.target.value })} />
          </div>
        </div>
        <div className="grid gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-muted-foreground">
              <Textarea defaultValue={user.bio} onChange={e => setUser({ ...user, bio: e.target.value })} />
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-envelope h-5 w-5 text-muted-foreground" ></i>
                <Input type='email' defaultValue={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-phone h-5 w-5 text-muted-foreground" />
                <Input type='tel' className="" defaultValue={user.phoneNumber} onChange={e => setUser({ ...user, phoneNumber: e.target.value })} />
              </div>
              {user.links && user.links.map((e: string, index: number) => <>
                <div key={`user-link-${index}`} className="grid grid-cols-6 items-center space-y-4">

                  <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                    <i className="fa-solid fa-link h-5 w-5 text-muted-foreground" />
                    <CustomLink href={e} >
                      {e.includes('//') ? e.split('//')[1] : e}
                    </CustomLink>
                  </div>
                  <Button className='h-8 w-8 text-red-700 pt-3' variant={'outline'}
                    onClick={() => {
                      user.links && user.links.splice(index, 1)
                      setUser({ ...user, links: user.links })
                    }}
                  >
                    <i className="fa-solid fa-trash-can w-5 h-5" />
                  </Button>
                </div>
              </>)}
              <div className="grid grid-cols-6 items-center mt-4 gap-4">

                <div className="col-span-5 md:col-span-4 flex items-center gap-2">
                  <i className="fa-solid fa-link  text-muted-foreground" />
                  <Input value={newLink} onChange={e => setNewLink(e.target.value)} />
                </div>
                <Button className='h-8 w-8 m11s-2 bg-pri11mary text-primary-foreground' variant={'ghost'}
                  onClick={() => {
                    if (newLink) {
                      user.links && user.links.push(newLink)
                      setUser({ ...user, links: user.links })
                      setNewLink('')
                    }
                  }}
                >
                  <i className="fa-solid fa-square-plus text-xl" />
                </Button>
              </div>

            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-days h-5 w-5 text-muted-foreground" />
                <Input type='date' pattern='yyyy-mm-dd' defaultValue={user.dateOfBirth} onChange={e => setUser({ ...user, dateOfBirth: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-location-dot h-5 w-5 text-muted-foreground" />
                <Input defaultValue={user.location} onChange={e => setUser({ ...user, location: e.target.value })} />

              </div>
              <div className="flex flex-row w-full items-center gap-2">
                <i className="fa-solid fa-cake-candles h-5 w-5 text-muted-foreground" />
                <div className="flex items-center gap-4">
                  <div className='flex flex-row items-center gap-2'>
                    <Label>Married</Label>
                    <Switch checked={user.married} onCheckedChange={e => setUser({ ...user, married: e })} />
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <Label className='w-20'>Children</Label>
                    <Input type='number' className='w-20' defaultValue={user.children || 0} onChange={e => setUser({ ...user, children: isNaN(Number(e.target.value)) ? 0 : Number(e.target.value) })} min={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='w-full flex flex-row justify-end gap-4'>
          <Button className="text-2xl" variant={'secondary'} onClick={() => router.back()}><i className="fa-solid fa-angle-left"></i>       </Button>
          <Button className="text-2xl" onClick={save}><i className="fa-solid fa-cloud-arrow-up"></i>        </Button>

        </div>
      </div>


    </>}
  </>
  )
}
