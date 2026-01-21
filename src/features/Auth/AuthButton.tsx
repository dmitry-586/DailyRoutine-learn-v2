import { Button } from '@/shared/ui'
import Link from 'next/link'

export function AuthButton() {
  return (
    <Link href='/login' className='fixed top-5 right-10'>
      <Button id='auth-button' variant='glass'>
        <img src='/user.svg' alt='user' width={26} height={26} />
      </Button>
    </Link>
  )
}
