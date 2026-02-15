import { Button } from '@/shared/ui'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Image from 'next/image'
import { ProfileMenu } from './ProfileMenu'

export function AuthButton() {
  return (
    <Popover className='relative'>
      <PopoverButton as={Button} variant='glass' className='focus:outline-none'>
        <Image src='/user.svg' alt='user' width={26} height={26} />
      </PopoverButton>
      <PopoverPanel anchor='bottom end' className='mt-2'>
        <ProfileMenu />
      </PopoverPanel>
    </Popover>
  )
}
