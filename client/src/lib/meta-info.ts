import { Metadata } from 'next/types'
const emo=['🌏','🌍','🌎']

export default function pageMeta(title:string,description?:string){
  const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_TITLE || 'ENV ERROR'} • ${title}`,
    description: `${description || process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'ENV Error'}`,
  }
  return metadata
}

