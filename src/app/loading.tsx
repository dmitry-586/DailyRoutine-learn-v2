import { Loader2 } from 'lucide-react'

export default function loading() {
  return (
    <section className='fixed inset-0 flex flex-1 items-center justify-center'>
      <Loader2 className='text-primary size-8 animate-spin' />
    </section>
  )
}
