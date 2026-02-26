import { AllCards } from '@/features'

export default function Home() {
  return (
    <div className='flex flex-col justify-center flex-1'>
      <section className='mt-5 flex flex-col'>
        <div className='text-center'>
          <h1 id='main-heading' className='text-xl font-bold sm:text-2xl'>
            Daily Routine <span className='text-primary'>Learn</span>
          </h1>
          <p className='mt-2 text-sm text-white/70 sm:text-base'>Выберите режим обучения</p>
        </div>
      </section>
      <AllCards />
    </div>
  )
}
