"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { getList } from '@/lib/fetch'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { currSymbol, moneyFormat, yesterday } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { previousDay } from 'date-fns'
import { Skeleton } from "@/components/ui/skeleton"

import Loading from '@/components/loading'
import { DashboardCashSummary } from './dashboard-cash-summary'

interface CashBalanceType {
  kas_tip?: string
  Turu?: string
  Kod?: string
  Isim?: string
  Bakiye?: number
  ParaBirimi?: string
}


export function DashboardCashBalances() {
  const [token, setToken] = useState('')
  const [lastDate, setLastDate] = useState(yesterday())
  const [balances, setBalances] = useState<CashBalanceType[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const load = (tarih?: string) => {
    setLoading(true)
    getList(`/reports/cashBalances?lastDate=${tarih || lastDate}`, token)
      .then((result: CashBalanceType[]) => {
        console.log('result:', result)
        setBalances(result)
      })
      .catch(err => toast({ title: 'error', description: err || '' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<>
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0 px-2">
        <CardTitle className='flex flex-row w-full border-b mb-2 pb-2  items-center justify-between'>
          <div>Kasalar</div>
          <div className='text-sm text-gray-400'>
            {/* <Input
              type='date'
              disabled={loading}
              pattern='yyyy-mm-dd' defaultValue={lastDate} onChange={e => {
                setLastDate(e.target.value)
                load(e.target.value)
              }} /> */}
          </div>
        </CardTitle>
        {/* <CardDescription>10 Ekim 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col w-full pb-0 gap-2 px-2">
        {/* <div className='grid grid-cols-6 w-full text-xs sm:text-base'>
          <div className=''>Kasa</div>
          <div className='text-right w-18'>Bakiye</div>
        </div> */}
        {loading && Array.from(Array(8).keys()).map(e => (
          <div key={e} className='flex mb-4'>
            <div className='grid grid-cols-3 w-full gap-2'>
              <Skeleton className="col-span-2 h-5" />
              <Skeleton className="col-span-1 h-5 bg-blue-600" />
            </div>

          </div>
        ))}

        {!loading && balances.map((e, index) => (
          <div key={e.Kod} className={`grid grid-cols-3 items-center w-full text-xs sm:text-base ${index % 2 == 0 ? ' bg-slate-500 bg-opacity-10' : ''} py-1 ps-1`}>
            <div className='col-span-2 flex flex-col gap-0 p-0'>
              <span>{e.Kod} - {e.Isim}</span>
              <span className='text-[9px] text-gray-500'>{e.Turu}</span>
            </div>
            <div className='text-right text-blue-600'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}

        {!loading && (<div>
          <DashboardCashSummary />
        </div>)}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">

      </CardFooter>
    </Card>
  </>)
}