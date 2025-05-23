import { signIn, signOut } from "@/lib/authSSO"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { postItem } from '@/lib/fetch'
import { cookies } from 'next/headers'
import { redirect, RedirectType, useRouter } from 'next/navigation'

interface SSOSignInProps {
  provider?: string,
  className?: string,
  children?: any
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}
// & React.ComponentPropsWithRef<typeof Button>
export default function SSOSignIn({
  provider,
  className,
  children,
  variant,
  ...props
}: SSOSignInProps) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button type='submit' className={`${className}`} variant={variant || 'default'} {...props}>{children}</Button>
    </form>
  )
}

