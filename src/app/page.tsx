import { AllCards } from '@/features'

export default function Home() {
  return (
    <>
      <section className='max-md:hidden flex flex-col items-center justify-center'>
        <div className='text-center'>
          <h1 id='main-heading' className='text-3xl font-bold'>
            Daily Routine <span className='text-primary'>Learn</span>
          </h1>
          <p className='mt-2 text-lg text-white/70'>Выберите режим обучения</p>
        </div>
      </section>
      <section>
        <AllCards />
      </section>
    </>
  )
}
