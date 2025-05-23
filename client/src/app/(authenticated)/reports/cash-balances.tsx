import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getItem, getList } from '@/lib/fetch'
import { moneyFormat } from '@/lib/utils'

export function CashBalances() {
  const [token, setToken] = useState('')
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    if (token) {
      getList('/reports/cashBalances', token)
        .then(result => {
          console.log('result:', result)
          let d: any[] = []
          result.nakit.forEach((e: any) => d.push(e))
          result.cek.forEach((e: any) => d.push(e))
          result.karsiliksizCek.forEach((e: any) => d.push(e))
          result.senet.forEach((e: any) => d.push(e))
          result.protestoluSenet.forEach((e: any) => d.push(e))
          result.verilenSenet.forEach((e: any) => d.push(e))
          result.verilenOdemeEmirleri.forEach((e: any) => d.push(e))
          result.musteriOdemeSozleri.forEach((e: any) => d.push(e))
          setList(d)
        })
        .catch(err => toast({ title: 'error', description: err || '' }))
    }
  }, [token])
  return (
    <Table className='overflow-hidden'>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="">Turu</TableHead>
          <TableHead className="">Kasa</TableHead>
          <TableHead className="text-right">Bakiye</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='overflow-hidden'>
        {list && list.map((e) => (
          <TableRow key={e.Kod}>
            <TableCell className="font-medium text-wrap">{e.Turu}</TableCell>
            <TableCell className="font-medium text-wrap">{e.Isim}</TableCell>
            <TableCell className="text-right">{moneyFormat(e.Bakiye)} {e.ParaBirimi}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  )
}
