"use client"

import { useState } from 'react'
import { DashboardBankBalances } from './dashboard-bankBalances'
import { DashboardBestProductSales } from './dashboard-bestProductSales'
import { DashboardCashBalances } from './dashboard-cash-balances'
import { DashboardProductMainGroupSales } from './dashboard-productMainGroupSales'
import { DashboardStoreSales } from './dashboard-storeSales'
import { PieCart1 } from './pie-chart'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'


export default function Home() {
  const [report, setReport] = useState('')
  return (
    <div className='container px-0 py-4 flex flex-col gap-4'>

      {report == '' && <div className='grid gap-4 grid-cols-2'>
        <Button variant={'outline'} onClick={() => setReport('cash')}><i className="fa-solid fa-money-bills me-2"></i> Kasalar</Button>
        <Button variant={'outline'} onClick={() => setReport('bank')}><i className="fa-solid fa-building-columns me-2"></i> Bankalar</Button>
        <Button variant={'outline'} onClick={() => setReport('storeSales')}><i className="fa-solid fa-store me-2"></i>Magaza</Button>
        <Button variant={'outline'} onClick={() => setReport('productMainGroupSales')}><i className="fa-solid fa-object-group me-2"></i> Ana Grup</Button>
        <Button variant={'outline'} onClick={() => setReport('bestProductSales')}><i className="fa-solid fa-chart-bar me-2"></i> En Çok Satanlar</Button>

      </div>}
      <div className='relative grid grid-cols-1  gap-4'>
        {report && <>
          <div className='absolute right-0 top-[-20px]'>
            <Link href="#" className='bg-slate-500 px-2 py-1 rounded-sm ' onClick={() => setReport('')}>X</Link>
          </div>
        </>}

        {report == 'cash' && <><DashboardCashBalances /></>}
        {report == 'bank' && <><DashboardBankBalances /></>}
        {report == 'storeSales' && <><DashboardStoreSales /></>}
        {report == 'productMainGroupSales' && <><DashboardProductMainGroupSales /></>}
        {report == 'bestProductSales' && <><DashboardBestProductSales /></>}

        {/* <PieCart1 />
        <PieCart1 /> */}
      </div>

    </div>
  )
}
