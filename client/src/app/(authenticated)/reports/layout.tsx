import pageMeta from '@/lib/meta-info'
import { Metadata } from 'next/types'

export const metadata: Metadata = pageMeta('Raporlar')

export default function PageLayout({ children }: { children: any }) {
  return (<>
    <div className='container mx-auto py-1 px-1 md:px-4 md:py-4'>
      {children}
    </div>
  </>)
}
