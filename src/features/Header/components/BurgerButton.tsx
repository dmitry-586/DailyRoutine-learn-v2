import { Button } from '@/shared/ui'
import { TextAlignCenter, X } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

export function BurgerButton({
  isOpen,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isOpen?: boolean }) {
  return (
    <Button variant='glass' {...props}>
      {isOpen ? <X /> : <TextAlignCenter />}
    </Button>
  )
}
