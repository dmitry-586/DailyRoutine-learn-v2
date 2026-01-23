import { AllCards } from '@/features/PageSelection'

export default function Home() {
  return (
    <>
      <section
        className='flex flex-col items-center justify-center'
        aria-labelledby='main-heading'
      >
        <div className='text-center'>
          <h1 id='main-heading' className='text-3xl font-bold'>
            Daily Routine <span className='text-primary'>Learn</span>
          </h1>
          <p className='mt-2 text-lg text-white/70'>Выберите режим обучения</p>
        </div>
      </section>
      <section aria-label='Режимы обучения'>
        <AllCards />
      </section>
    </>
  )
}
