"use client"
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getItem, getList, postItem, putItem } from '@/lib/fetch'
import Cookies from 'js-cookie'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatabaseType } from '@/types/DatabaseType'
import { Button } from '@/components/ui/button'

export function DatabaseSelect() {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [dbList, setDbList] = useState<DatabaseType[]>([])
  const [db, setDb] = useState<DatabaseType>()
  const { toast } = useToast()

  const loadDbList = () => {
    setLoading(true)
    getList(`/dbList`, token)
      .then((result: DatabaseType[]) => {
        setDbList(result)
        Cookies.set('dbList', JSON.stringify(result))
        if (result.length > 0) {
          var database = result.find(k => k.db === db?.db)
          if (!database) {
            database = result[0]
          }

          if (database) {
            postItem(`/session/change/db/${database.db}`, token, undefined)
              .then(result => {
                setDb(database)
                Cookies.set('db', database?.db || '')
                Cookies.set('firm', database?.firm || '')
                Cookies.set('period', database?.period || '')
                setTimeout(() => { window && window.location.reload() }, 100)
              })
              .catch(err => toast({ title: 'Error', description: err }))
          }
        }

      })
      .catch(err => toast({ title: 'Error', description: err }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    try {
      setLoading(true)
      if (token) {
        if (Cookies.get('dbList')) {
          var list = JSON.parse(Cookies.get('dbList') || '[]') as DatabaseType[]
          setDbList(list)
          if (Cookies.get('db')) {

            var foundDb = list.find(k => k.db === (Cookies.get('db') || ''))
            setDb(foundDb)
          } else {

            setDb(list[0])

            postItem(`/session/change/db/${list[0].db}`, token, undefined)
              .then(result => {
                Cookies.set('db', list[0].db || '')
                Cookies.set('firm', list[0].firm || '')
                Cookies.set('period', list[0].period || '')
              })
              .catch(err => toast({ title: 'Error', description: err }))
          }

        } else {
          if (Cookies.get('db')) {
            setDb({
              db: Cookies.get('db') || '',
              firm: Cookies.get('firm') || '',
              period: Cookies.get('period') || '',
            })
          }
          // setDbList([])
          // setDb(undefined)
          // Cookies.set('db', '')
          // Cookies.set('firm', '')
          // Cookies.set('period', '')
          loadDbList()
        }
      }
    } catch (err) {
      console.log('hata:', err)
    }
    setLoading(false)

  }, [token])
  return (<div className='flex flex-col'>
    {!loading && <>
      <div className='flex flex-row gap-2 min-w-48'>
        <Select

          value={db?.db}
          onValueChange={e => {
            const database = dbList.find(k => k.db === e)
            setDb(database)
            if (database) {
              Cookies.set('db', database.db || '')
              Cookies.set('firm', database.firm || '')
              Cookies.set('period', database.period || '')
              postItem(`/session/change/db/${database.db}`, token, undefined)
                .then(result => setTimeout(() => { window && window.location.reload() }, 100))
                .catch(err => toast({ title: 'Error', description: err }))

            } else {
              Cookies.set('db', '')
            }
          }}
        >
          <SelectTrigger className='text-xs' >
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent className='text-xs' position="popper">
            {dbList.map((e, index) => <SelectItem key={e.db} value={e.db || ''}>{e.dbName}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant={'outline'} onClick={loadDbList}><i className="fa-solid fa-rotate"></i></Button>
      </div>
      {/* {db && <div>{db.db}</div>} */}
    </>}
  </div>)
}