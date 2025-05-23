import { FC } from 'react'
import { Metadata } from "next"

import Link from "next/link"

import { cookies } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'
import { DashboardHeader } from './(components)/dashboard-header'
import DashboardFooter from './(components)/dashboard-footer'
import { UserType } from '@/types/UserType'
import { getAuthToken } from '@/lib/authHelper'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TabsContent } from '@/components/ui/tabs'
import { SideMenu } from './(components)/side-menu'
import React from 'react'
import '@/styles/piechart-style.css'




export interface AppLayoutProps {
  children?: any
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {

  if (!getAuthToken()) {
    return redirect('/auth/login', RedirectType.push)
  }

  return (
    <div className="flex min-h-screen w-full flex-col px-2">
      <DashboardHeader />
      <div className='my-2'></div>
      <div className="flex-1 md:border border-dashed border-opacity-25 md:p-4 rounded-md border-yellow-400 " style={{ overflowWrap: 'anywhere' }}>
        {/* <div className='conta11iner fl11ex py-4 w-full'> */}
        {/* <SideMenu>
            {children}
          </SideMenu> */}
        {/* <SideMenu /> */}
        {children}
        {/* </div> */}
      </div>
      <div className='my-2'></div>
      <DashboardFooter />
    </div>
  )

}

export default AppLayout