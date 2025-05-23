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
  const defaultLayout = [30, 28, 36]
  const navCollapsedSize = 4


  return (<>
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >

        <ResizablePanel
          defaultSize={20}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={30}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`
          }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-between",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={[]} />
          </div>
          <Separator />
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
              {
                title: "Promotions",
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <p>Tab Content 1</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis optio rerum expedita, mollitia voluptate modi! Qui ut numquam, quaerat officia facilis placeat possimus eius voluptatem, autem laborum rerum reiciendis vel?</p>
              {children}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <p>Tab Content 2</p>
              <p>Eius similique unde ipsa quo cupiditate illo, nihil illum possimus quas rerum natus nesciunt quibusdam quisquam, incidunt beatae deleniti amet. Adipisci, illum!</p>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ratione, inventore minima reiciendis modi facere tempore repudiandae praesentium accusantium nisi sunt debitis labore accusamus, consectetur aliquam in, pariatur harum exercitationem?</p>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  </>)
}