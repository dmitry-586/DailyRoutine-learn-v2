import { Card } from './Card'
import { pageLinks } from './config'

export function AllCards() {
  return (
    <section className='mx-auto mt-8 grid grid-cols-2 gap-3 md:w-fit xl:grid-cols-3'>
      {pageLinks.map((card) => {
        return (
          <Card
            key={card.id}
            href={card.href}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        )
      })}
    </section>
  )
}
