import { HeaderLogo2 } from '@/components/logo'
import ThemeToggleButton from '@/components/theme-toggle-button'
import pageMeta from '@/lib/meta-info'
import { Metadata } from 'next/types'

export const metadata: Metadata = pageMeta('Kayıt Ol')

export default function MeLayout({ children }: { children: any }) {
  return (<>{children}</>)
}
