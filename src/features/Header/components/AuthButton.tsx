import { Button } from '@/shared/ui'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Image from 'next/image'
import { ProfileMenu } from './ProfileMenu'

export function AuthButton() {
  return (
    <Popover>
      <PopoverButton
        as={Button}
        variant='glass'
        className='p-2 focus:outline-none'
      >
        <Image
          src='/user.svg'
          alt='user'
          width={24}
          height={24}
          className='size-5 sm:size-6'
        />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor='bottom end'
        className='mt-2 rounded-2xl shadow-sm transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0'
      >
        <ProfileMenu />
      </PopoverPanel>
    </Popover>
  )
}
