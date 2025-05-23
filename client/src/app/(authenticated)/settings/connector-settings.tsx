"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { getItem, postItem, putItem } from '@/lib/fetch'
import { ConnectorType, SettingType } from '@/types/SettingType'
import { SqlConnection } from './sql-connection'

interface Props {
  onConnectionTypeChange?: (connectionType: string) => void
}
export function ConnectorSettings(props: Props) {
  const [token, setToken] = useState('')
  const [connector, setConnector] = useState<ConnectorType>({})
  // const [clientPass, setClientPass] = useState('')
  const [testResult, setTestResult] = useState('')

  // const router = useRouter()
  // const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const load = () => {
    getItem('/settings', token)
      .then((result: SettingType) => {
        setConnector(result.connector || {})
      })
      .catch(err => toast({ title: 'error', description: err || '' }))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load() }, [token])
  return (
    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <Card className="">
        <CardHeader className='px-3 py-3' >
          <CardTitle>Connector</CardTitle>
          <CardDescription>Anamakinaya kurulmus olan Connector baglanti bilgileri</CardDescription>
        </CardHeader >
        <CardContent className='px-3 py-2'>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label >Client ID</Label>
              <Input
                defaultValue={connector.clientId || ''}
                onBlur={e => setConnector({ ...connector, clientId: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Client Pass</Label>
              <Input
                defaultValue={connector.clientPass || ''}
                onBlur={e => setConnector({ ...connector, clientPass: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Baglanti Turu</Label>
              <Select
                defaultValue={connector.connectionType || 'mssql'}
                onValueChange={e => {
                  setConnector({ ...connector, connectionType: e })
                  // props && props.onConnectionTypeChange && props.onConnectionTypeChange(e)
                }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="mssql">MS Sql Server</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="pg">PostgreSQL</SelectItem>
                  <SelectItem value="fs">File System</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex flex-col">
          <div className='flex justify-between w-full'>
            <div>
              {!testResult && <>
                <Button
                  variant="secondary"
                  title='Connector test'
                  onClick={() => {
                    postItem(`/settings/connectorTest`, token, { clientId: connector.clientId, clientPass: connector.clientPass })
                      .then(result => setTestResult(`OK\nServer Tarihi:\n${result}`))
                      .catch(err => setTestResult(`Hata:\n${err}`))
                  }}
                >
                  <i className="fa-solid fa-plug me-2"></i> Test
                </Button>
              </>}
              {testResult && <>
                <Button variant="secondary" onClick={() => setTestResult('')}>
                  <i className="fa-solid fa-broom me-2"></i> Temizle
                </Button>
              </>}
            </div>
            <Button onClick={() => {
              putItem(`/settings`, token, {
                connector: {
                  clientId: connector.clientId,
                  clientPass: connector.clientPass,
                  connectionType: connector.connectionType,
                }
              })
                .then((result: SettingType) => {
                  toast({ title: 'Kayıt Başarılı' })
                  setTimeout(() => { window && window.location.reload() }, 700)
                })
                .catch(err => toast({ title: 'error', description: err || '' }))
            }}><i className="fa-solid fa-check"></i></Button>
          </div>
          <div className='w-full mt-2'>
            <pre className='w-full overflow-y-auto max-h-80 text-sm'>
              {testResult}
            </pre>
          </div>
        </CardFooter>
      </Card >
      {connector && connector.connectionType == 'mssql' && <SqlConnection />}
    </div>
  )
}
