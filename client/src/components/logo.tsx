import Link from 'next/link'

export type IconProps = React.HTMLAttributes<SVGElement> & { width?: number, height?: number }

export const HeaderLogo2 = ({
  className,
}: { className?: string }) => {
  return (
    <div className={`flex flex-row text-2xl max-h-10 ${className}`}>
      <img className='' src={'/img/logo.png'} alt={'logo'} />

    </div>
  )
}