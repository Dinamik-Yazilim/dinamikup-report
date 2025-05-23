"use client"

import { ConnectorSettings } from './connector-settings'

export default function SettingsPage() {

  return (
    <div className='flex flex-col gap-4'>
      <h1>Ayarlar</h1>
      <hr />

      <ConnectorSettings />


    </div>
  )
}

