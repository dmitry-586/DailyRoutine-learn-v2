export function CardSkeleton() {
  return (
    <section className='flex flex-1 flex-col items-center'>
      <div className='relative mt-10 flex min-h-100 w-full max-w-xs animate-pulse justify-center rounded-2xl border border-white/10 bg-white/5' />
      <div className='mt-5 flex w-full max-w-xs items-center justify-between'>
        <div className='h-12 w-12 animate-pulse rounded-full bg-white/10' />
        <div className='h-12 w-12 animate-pulse rounded-full bg-white/10' />
      </div>
    </section>
  )
}
