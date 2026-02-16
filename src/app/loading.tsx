import { Loader2 } from 'lucide-react'

export default function loading() {
  return (
    <section className='flex h-full w-full items-center justify-center'>
      <Loader2 className='text-primary mx-auto size-8 animate-spin' />
    </section>
  )
}
