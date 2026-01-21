import { AuthButton } from '@/features/Auth'
import { AllCards } from '@/features/PageSelection'

export default function Home() {
  return (
    <>
      <AuthButton />
      <main className='flex h-full flex-col items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>
            Daily Routine <span className='text-primary'>Learn</span>
          </h1>
          <p className='mt-2 text-xl text-white/70'>Выберите режим обучения</p>
        </div>
        <AllCards />
      </main>
    </>
  )
}
