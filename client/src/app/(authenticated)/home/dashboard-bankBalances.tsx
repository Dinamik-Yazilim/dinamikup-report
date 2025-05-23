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

interface BankBalanceType {
  Kod?: string
  Isim?: string
  Sube?: string
  Bakiye?: number
  ParaBirimi?: string
}

export function DashboardBankBalances() {
  const [token, setToken] = useState('')
  const [lastDate, setLastDate] = useState(yesterday())
  const [list, setList] = useState<BankBalanceType[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const load = (tarih?: string) => {
    setLoading(true)
    getList(`/reports/bankBalances?lastDate=${tarih || lastDate}`, token)
      .then((result: BankBalanceType[]) => {

        setList(result)
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
          <div>Bankalar</div>
          <div className='text-sm text-gray-400'>
            <Input
              type='date'
              disabled={loading}
              pattern='yyyy-mm-dd' defaultValue={lastDate} onChange={e => {
                setLastDate(e.target.value)
                load(e.target.value)
              }} />
          </div>
        </CardTitle>
        {/* <CardDescription>10 Ekim 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex flex-col w-full pb-0 gap-2 px-2">
        {loading && Array.from(Array(5).keys()).map(e => (
          <div key={e} className='flex'>
            <div className='grid grid-cols-3 w-full gap-4'>
              <Skeleton className="col-span-2 h-5" />
              <Skeleton className="col-span-1 h-5 bg-blue-600" />
            </div>

          </div>
        ))}

        {!loading && list.map((e, index) => (
          <div key={e.Kod} className={`grid grid-cols-2 w-full justify-center items-center ${index % 2 == 0 ? 'bg-slate-500 bg-opacity-20' : ''} `}>
            <div className='flex flex-col'>
              <div>{e.Isim}</div>
              {/* <div className='text-xs text-gray-500'>{e.Sube}</div> */}
            </div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}

      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">

      </CardFooter>
    </Card>
  </>)
}