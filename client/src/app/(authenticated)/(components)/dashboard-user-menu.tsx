"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
// import { SignOut } from '@/widgets/auth-components'
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuShortcut, DropdownMenuPortal } from "@/components/ui/dropdown-menu"
import ThemeToggleButton from '@/components/theme-toggle-button'
// import { useRouter } from 'next/router'
// import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from './signout-button'
import { FC, useEffect, useState } from 'react'
import { UserType } from '@/types/UserType'
// import { getAuthUser, getDatabases } from '@/lib/authHelper'
import Cookies from 'js-cookie'

interface DashboardUserMenuProps {
}

const DashboardUserMenu: FC<DashboardUserMenuProps> = ({ }) => {
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState<UserType>()

  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => {
    try {
      if (Cookies.get('user')) {
        setUserInfo(JSON.parse(Cookies.get('user') || '{}') as UserType)
      }
    } catch (err) {
      console.log('hata:', err)
    }
  }, [token])

  if (!userInfo) {
    return <></>
  }
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild  >
        <Button className="rounded-full border border-gray-200 w-12 h-12 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <Image
            alt="Avatar"
            className="rounded-full"
            height="48"
            src={userInfo?.image || "/img/avatar-place-holder.png"}  // TODO:// session user image
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="48"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/me" className='flex flex-col'>
            <span className=''>{userInfo?.fullName}</span>
            <span className='text-sm'>{userInfo?.email}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link href="/settings" className='flex items-center'>
            <i className='fa-solid fa-gears me-2 text-lg'></i>
            Settings
          </Link>
        </DropdownMenuItem>

        {/* <DropdownMenuItem><DatabaseMenu /></DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex flex-row justify-between gap-6'>
          <ThemeToggleButton />
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// function DatabaseMenu() {
//   const dbInfo = getDatabases()

//   if (!dbInfo) {
//     return <></>
//   }
//   return (
//     <DropdownMenuGroup>
//       <DropdownMenuItem>Team</DropdownMenuItem>
//       <DropdownMenuSub>
//         <DropdownMenuSubTrigger>Veri tabanlari</DropdownMenuSubTrigger>
//         <DropdownMenuPortal>
//           <DropdownMenuSubContent>
//             {dbInfo.dbList.map((e, index) => (
//               <DropdownMenuItem key={e._id} >
//                 <i className='fa-solid fa-database me-2 text-lg'></i>
//                 {e.name}
//               </DropdownMenuItem>
//             ))}

//           </DropdownMenuSubContent>
//         </DropdownMenuPortal>
//       </DropdownMenuSub>
//       <DropdownMenuItem>
//         New Team
//         <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
//       </DropdownMenuItem>
//     </DropdownMenuGroup>

//   )
// }
export default DashboardUserMenu