import pageMeta from '@/lib/meta-info'
import { Metadata } from 'next/types'

export const metadata: Metadata = pageMeta('Edit My profile')

export default function MeLayout({ children }: { children: any }) {
  return (<div className={`container py-4`}>
    {children}
  </div>)
}
