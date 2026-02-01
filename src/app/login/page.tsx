'use client'

import { Button, Input } from '@/shared/ui'
import { Mail } from 'lucide-react'

export default function Login() {
  return (
    <div className='flex w-fit flex-col gap-5'>
      <Input leftIcon={Mail} type='password' label='Email' error='error' />
      <Button>Отправить</Button>
    </div>
  )
}
