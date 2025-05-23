"use client"
import { useState, useEffect } from 'react'
import { NextResponse } from 'next/server'
// import { cookies } from 'next/headers'
import { postItem } from '@/lib/fetch'
import { redirect, useSearchParams, useRouter } from 'next/navigation'
// import { authSignIn } from '../authHelper'
import Cookies from 'js-cookie'
import { ErrorPanel } from '@/components/error-panel'


export default function MagicLinkPage({ }) {
  const searchParams = useSearchParams()
  const magicToken = searchParams.get('magicToken')
  const [error, setError] = useState()
  const router = useRouter()
  console.log('magicToken:', magicToken)

  const magicLogin = () => {
    postItem('/auth/magicLogin', '', { magicToken: 'hata' + magicToken + 'hata' })
      .then(result => {

        Cookies.set('token', result.token, { secure: true })
        Cookies.set('user', JSON.stringify(result.user), { secure: true })
        Cookies.set('dbList', JSON.stringify(result.dbList || []), { secure: true })
        Cookies.set('db', result.db || '', { secure: true })
        Cookies.set('firm', result.firm || '', { secure: true })
        Cookies.set('period', result.period || '', { secure: true })
        Cookies.set('lang', result.lang || 'tr', { secure: true })
        router.push('/home')
      })
      .catch(err => setError(err))
    // authSignIn(magicToken || '')
    //   .then(() => {
    //     router.push('/databases')
    //   })
    //   .catch(err => {
    //     console.log('hata:', err)
    //   })
  }

  useEffect(() => {
    magicLogin()
  }, [magicToken])

  return (<div className='flex flex-col w-full px-6'>
    <h2 className='text-2xl'>Magic Link Page</h2>
    {magicToken && (
      <p className='font-mono text-wrap '>
        Magic Token: {magicToken}
      </p>
    )}
    {error && <>
      <ErrorPanel>{error}</ErrorPanel>
    </>}
  </div>)


}
