"use client"
import React, { FC } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Nav } from './nav'
import { AccountSwitcher } from './account-switcher'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, Archive, ArchiveX, Inbox, MessagesSquare, Search, Send, ShoppingCart, Trash2, Users2 } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Props {
  children?: any
}
export function SideMenu({ children }: Props) {

  const [isCollapsed, setIsCollapsed] = React.useState(false)
  // const [mail] = useMail()
  // const defaultLayout = [30, 28, 36]
  // const navCollapsedSize = 4


  return (<>
    <div className='flex flex-col'>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Inbox",
            label: "128",
            icon: Inbox,
            variant: "default",
          },
          {
            title: "Drafts",
            label: "9",
            icon: Send,
            variant: "ghost",
          },
          {
            title: "Sent",
            label: "",
            icon: Send,
            variant: "ghost",
          },
          {
            title: "Junk",
            label: "23",
            icon: ArchiveX,
            variant: "ghost",
          },
          {
            title: "Trash",
            label: "",
            icon: Trash2,
            variant: "ghost",
          },
          {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Social",
            label: "972",
            icon: Users2,
            variant: "ghost",
          },
          {
            title: "Updates",
            label: "342",
            icon: AlertCircle,
            variant: "ghost",
          },
          {
            title: "Forums",
            label: "128",
            icon: MessagesSquare,
            variant: "ghost",
          },
          {
            title: "Shopping",
            label: "8",
            icon: ShoppingCart,
            variant: "ghost",
          },
          // {
          //   title: "Promotions",
          //   label: "21",
          //   icon: Archive,
          //   variant: "ghost",
          // },
        ]}
      />
    </div>
  </>)
}