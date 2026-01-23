import { Button } from '@/shared/ui'
import Image from 'next/image'
import Link from 'next/link'

export function AuthButton() {
  return (
    <Link href='/login'>
      <Button variant='glass'>
        <Image src='/user.svg' alt='user' width={26} height={26} />
      </Button>
    </Link>
  )
}
