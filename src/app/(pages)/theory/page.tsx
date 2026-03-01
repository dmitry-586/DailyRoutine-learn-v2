import { BurgerButton } from '@/features/Header/components/BurgerButton'
import { BackButton } from '@/shared/ui'

export default function Theory() {
  return (
    <>
      <div className='flex flex-1 flex-col gap-3'></div>
      <div className='sticky bottom-5 left-0 z-10 flex gap-5'>
        <BackButton />
        <BurgerButton />
      </div>
    </>
  )
}
