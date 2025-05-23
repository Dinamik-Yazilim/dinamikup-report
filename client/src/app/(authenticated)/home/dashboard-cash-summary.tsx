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

interface CashBalanceSummaryType {
  ID?: string
  Bakiye?: number
  ParaBirimi?: string
}

interface CashBalanceGroupType {
  nakit: CashBalanceSummaryType[]
  cek: CashBalanceSummaryType[]
  karsiliksizCek: CashBalanceSummaryType[]
  senet: CashBalanceSummaryType[]
  protestoluSenet: CashBalanceSummaryType[]
  verilenSenet: CashBalanceSummaryType[]
  verilenOdemeEmirleri: CashBalanceSummaryType[]
  musteriOdemeSozleri: CashBalanceSummaryType[]
}

export function DashboardCashSummary() {
  const [token, setToken] = useState('')
  const [lastDate, setLastDate] = useState(yesterday())
  const [balances, setBalances] = useState<CashBalanceGroupType>({
    nakit: [],
    cek: [],
    karsiliksizCek: [],
    senet: [],
    protestoluSenet: [],
    verilenSenet: [],
    verilenOdemeEmirleri: [],
    musteriOdemeSozleri: [],
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const load = (tarih?: string) => {
    setLoading(true)
    getList(`/reports/cashBalances/summary?lastDate=${tarih || lastDate}`, token)
      .then((result: CashBalanceGroupType) => {
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
          <div>Kasalar Özet</div>
          {/* <div className='text-sm text-gray-400'>
            <Input
              type='date'
              disabled={loading}
              pattern='yyyy-mm-dd' defaultValue={lastDate} onChange={e => {
                setLastDate(e.target.value)
                load(e.target.value)
              }} />
          </div> */}
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

        {/* Nakit Kasalar */}
        {!loading && balances.nakit.map(e => (
          <div key={e.ID} className='grid grid-cols-2 w-full'>
            <div>Nakit {currSymbol(e.ParaBirimi)}</div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}

        {/* Cek Kasalari */}
        {!loading && balances.cek.map(e => (
          <div key={e.ID} className='grid grid-cols-2 w-full'>
            <div>Çek {currSymbol(e.ParaBirimi)}</div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}

        {/* Senet Kasalari */}
        {!loading && balances.senet.map(e => (
          <div key={e.ID} className='grid grid-cols-2 w-full'>
            <div>Senet {currSymbol(e.ParaBirimi)}</div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}
        {/* Musteri Odeme Sozleri */}
        {!loading && balances.musteriOdemeSozleri.map(e => e.Bakiye && e.Bakiye > 0 && (
          <div key={e.ID} className='grid grid-cols-2 w-full'>
            <div>Müşteri Ödeme Sözleri {currSymbol(e.ParaBirimi)}</div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}
        {!loading && balances.verilenOdemeEmirleri.length > 0 && balances.verilenSenet.length > 0 && <hr />}
        {/* Verilen Ödeme Emirleri */}
        {!loading && balances.verilenOdemeEmirleri.map(e => e.Bakiye && e.Bakiye > 0 && (
          <div key={e.ID} className='grid grid-cols-2 w-full'>
            <div>Verilen Ödeme Emirleri {currSymbol(e.ParaBirimi)}</div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}
        {/* Verilen Senet */}
        {!loading && balances.verilenSenet.map(e => e.Bakiye && e.Bakiye > 0 && (
          <div key={e.ID} className='grid grid-cols-2 w-full'>
            <div>Verilen Senet {currSymbol(e.ParaBirimi)}</div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}
        {!loading && balances.karsiliksizCek.length > 0 && balances.protestoluSenet.length > 0 && <hr />}
        {/* Karsiliksiz Cek Kasalari */}
        {!loading && balances.karsiliksizCek.map(e => e.Bakiye && e.Bakiye > 0 && (
          <div key={e.ID} className='grid grid-cols-2 w-full'>
            <div>Karşılıksız Çek {currSymbol(e.ParaBirimi)}</div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}
        {/* Protestolu Senet Kasalari */}
        {!loading && balances.protestoluSenet.map(e => e.Bakiye && e.Bakiye > 0 && (
          <div key={e.ID} className='grid grid-cols-2 w-full'>
            <div>Protestolu Senet {currSymbol(e.ParaBirimi)}</div>
            <div className='text-right text-blue-600 font-semibold'>{moneyFormat(e.Bakiye, 0)} {currSymbol(e.ParaBirimi)}</div>
          </div>
        ))}

      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">

      </CardFooter>
    </Card>
  </>)
}