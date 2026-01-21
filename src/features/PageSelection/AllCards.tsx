import { Card } from './Card'
import { pageLinks } from './config'

export function AllCards() {
  return (
    <section className='mt-8 grid grid-cols-3 gap-5'>
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
