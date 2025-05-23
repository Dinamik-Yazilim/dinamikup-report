// import LayoutClientSide from './layout-client'

import { HeaderLogo2 } from '@/components/logo'
import ThemeToggleButton from '@/components/theme-toggle-button'
import Link from 'next/link'

interface AuthLayoutProps {
  children?: any
}

export default function AuthLayout({ children }: AuthLayoutProps) {

  return (<div className="container relative  h-screen flex-col justify-center px-6 py-14">
    <div className='absolute end-2 top-2'>
      <ThemeToggleButton />
    </div>
    <div className='absolute start-4 top-2'>
      <Link href={'/auth/login'}>
        <HeaderLogo2 className="h-16 w-30" />
      </Link>
    </div>
    {children}
  </div>)
}


