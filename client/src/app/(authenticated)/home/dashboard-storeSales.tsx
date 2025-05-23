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
import { Button } from '@/components/ui/button'
import ButtonLink from '@/components/button-link'
import Link from 'next/link'
import { DashboardStoreProductSales } from './dashboard-storeProductSales'

interface StoreSalesType {
  MagazaNo?: string
  Magaza?: string
  Satis?: number
  Vergi?: number
  NetSatis?: number
  Maliyet?: number
  Kar?: number
  KarOran?: number
}

export function DashboardStoreSales() {
  const [token, setToken] = useState('')
  const [startDate, setStartDate] = useState(yesterday())
  const [endDate, setEndDate] = useState(yesterday())
  const [list, setList] = useState<StoreSalesType[]>([])
  const [total, setTotal] = useState<StoreSalesType>()
  const [magazaNo, setMagazaNo] = useState('')
  const [magaza, setMagaza] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const load = () => {
    setLoading(true)
    getList(`/reports/storeSalesProfit?startDate=${startDate}&endDate=${endDate}`, token)
      .then((result: StoreSalesType[]) => {
        let t: StoreSalesType = { Satis: 0, Maliyet: 0, Magaza: 'Toplam', NetSatis: 0, Kar: 0, KarOran: 0 }
        setList(result)
        result.forEach(e => {
          t.Satis = t.Satis! + e.Satis!
          t.NetSatis = t.NetSatis! + e.NetSatis!
          t.Maliyet = t.Maliyet! + e.Maliyet!
        })
        if (t.Maliyet! > 0) {
          t.Kar = t.Satis! - t.Maliyet!
          t.KarOran = t.Kar / t.Maliyet!
        } else {
          t.Kar = t.Satis!
          t.KarOran = 1
        }
        setTotal(t)
      })
      .catch(err => toast({ title: 'error', description: err || '' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])

  return (<>
    {magazaNo == '' && <>
      <Card className="flex flex-col w-full min-w-[340px]">
        <CardHeader className="items-center pb-0 px-1">
          <CardTitle className='flex flex-col s11m:f11lex-row items-ce11nter justify-be11tween w-full border-b mb-2 pb-2 gap-4'>
            <div className='self-center text-xl'>Mağaza Satış Karlılık</div>
            <div className='text-sm text-gray-400 flex w-full  justify-center '>
              <div className='flex w-f11ull justify-be11tween px-1 gap-2'>
                <Input className='px-2 py-1 w-26'
                  type='date' disabled={loading} pattern='yyyy-mm-dd'
                  defaultValue={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
                <Input className='px-2 py-1 w-26'
                  type='date' disabled={loading} pattern='yyyy-mm-dd'
                  defaultValue={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>
              <Button variant={'outline'} className='px-3 py-2'
                onClick={load}><i className="fa-solid fa-rotate"></i></Button>
            </div>
          </CardTitle>
          {/* <CardDescription>10 Ekim 2024</CardDescription> */}
        </CardHeader>
        <CardContent className="flex flex-col w-full pb-0 gap-2 px-2">
          <div className='grid grid-cols-5 w-full text-xs sm:text-base'>
            {/* <div className='text-ellipsis text-nowrap'>Mağaza</div> */}
            <div className='text-right '>Satış</div>
            <div className='text-right '>Maliyet</div>
            <div className='text-right '>Kar</div>
            <div className='text-right w-14'>% Kar</div>
            <div className='text-right '>NetSatış</div>
          </div>
          {loading && Array.from(Array(5).keys()).map(e => (
            <div key={e} className='flex mb-4'>
              <div className='grid grid-cols-5 w-full gap-2'>
                {/* <Skeleton className="h-5 " /> */}
                <Skeleton className="h-5 bg-blue-600" />
                <Skeleton className="h-5 bg-orange-600" />
                <Skeleton className="h-5 bg-green-600" />
                <Skeleton className="h-5 bg-purple-600 w-14" />
                <Skeleton className="h-5 bg-slate-500" />
              </div>

            </div>
          ))}

          {!loading && list.map((e, index) => (
            <div key={e.Magaza} className={`flex flex-col w-full ${index % 2 == 0 ? ' bg-blue-500 bg-opacity-10' : 'bg-secondary bg-opacity-10'} py-1 ps-1`}
              onClick={() => {
                setMagazaNo(e.MagazaNo || '')
                setMagaza(e.Magaza || '')
              }}>

              <div className='text-ellipsis text-nowrap text-xs sm:text-base'>
                {e.Magaza} {e.MagazaNo}
              </div>
              <div key={e.Magaza} className={`grid grid-cols-5 w-full text-xs sm:text-base  py-1 ps-1`}>
                <div className='text-right text-blue-600'>{moneyFormat(e.Satis, 0)}</div>
                <div className='text-right text-orange-600'>{moneyFormat(e.Maliyet, 0)}</div>
                <div className='text-right text-green-600 font-semibold'>{moneyFormat(e.Kar, 0)}</div>
                <div className='text-right text-purple-600 font-semibold w-14 md:w-20'>%{Math.round(10 * (e.KarOran || 0) * 100) / 10}</div>
                <div className='text-right text-slate-500'>{moneyFormat(e.NetSatis, 0)}</div>
              </div>


            </div>
          ))}
          {!loading && total && (<div className='mt-4'>
            <div className='text-center text-xs sm:text-base'>
              TOPLAM
            </div>
            <div key={'total'} className='grid grid-cols-5 w-full text-xs sm:text-base font-bold bg-blue-500 bg-opacity-20 rounded-md py-1 border border-dashed border-gray-500'>
              <div className='text-right text-blue-600'>{moneyFormat(total.Satis, 0)}</div>
              <div className='text-right text-orange-600'>{moneyFormat(total.Maliyet, 0)}</div>
              <div className='text-right text-green-600'>{moneyFormat(total.Kar, 0)}</div>
              <div className='text-right text-purple-600 w-14 md:w-20'>%{Math.round(10 * (total.KarOran || 0) * 100) / 10}</div>
              <div className='text-right text-slate-500'>{moneyFormat(total.NetSatis, 0)}</div>
            </div>
          </div>)}
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">

        </CardFooter>
      </Card >
    </>}
    {magazaNo != '' && <>
      <div className='relative'>
        <div className='absolute right-0 top-[-20px]'>
          <Link href="#" className='bg-slate-500 px-2 py-1 rounded-sm ' onClick={() => setMagazaNo('')}>X</Link>
        </div>
        <DashboardStoreProductSales store={magazaNo} storeName={magaza} defaultStartDate={startDate} defaultEndDate={endDate} />
      </div>
    </>}
  </>)
}