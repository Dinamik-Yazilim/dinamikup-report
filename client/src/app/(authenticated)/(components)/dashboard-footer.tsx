"use client"

import { DatabaseSelect } from './database-selection'
export const DashboardFooter = (props: any) => {

  return (
    <footer
      className="flex items-center justify-between border-t bg-white px-2 py-4 dark:border-gray-800 dark:bg-gray-950 p-1"
      {...props}
    >
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {/* © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_COMPANY_NAME || 'ENV ERROR'}. */}
        ©{new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_COMPANY_NAME || 'ENV ERROR'}
      </p>
      <div className='flex items-center gap-2'>
        <DatabaseSelect />
      </div>
    </footer>
  )
}

export default DashboardFooter