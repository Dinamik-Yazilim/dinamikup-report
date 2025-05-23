import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
interface Props {
  className?: string
  text?: string
  children?: any
}
export function ButtonInfo({
  className = "",
  text = "?",
  children = undefined,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={`${className}`}>{text}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-60 overflow-y-scroll">
        {children}
      </PopoverContent>
    </Popover>
  )
}
