import { Loader } from '@/shared/ui/Loader'

export default function loading() {
  return (
    <section className='fixed inset-0 flex flex-1 items-center justify-center'>
      <Loader />
    </section>
  )
}
