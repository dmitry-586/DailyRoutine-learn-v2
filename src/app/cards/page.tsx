'use client'

import { FlipCard, FlipCardProps, NavButtons } from '@/features/FlipCard'
import { Button } from '@/shared/ui'
import { useState } from 'react'

const mock: FlipCardProps[] = [
  {
    question:
      'Опишите, что происходит, когда пользователь вводит URL в браузер',
    answer:
      'Проверка кэша DNS-резолв TCP-handshake TLS-handshake (если HTTPS) HTTP-запрос Парсинг HTML Загрузка CSS/JS Рендеринг',
  },
  {
    question: 'Что такое event loop и как он работает в JavaScript?',
    answer:
      'Цикл событий обрабатывает call stack и callback queue. Call stack исполняет синхронный код, microtasks (Promise) имеют приоритет перед macrotasks (setTimeout). Один tick: выполнить код → microtasks → один macrotask → повторить.',
  },
  {
    question: 'Чем отличаются var, let и const?',
    answer:
      'var — function-scoped, hoisting, можно переобъявлять. let/const — block-scoped, temporal dead zone до объявления. const нельзя переназначить (но объект/массив мутабельны). let допускает переприсваивание.',
  },
  {
    question: 'Что такое React Virtual DOM и зачем он нужен?',
    answer:
      'Лёгкая копия реального DOM в памяти. При изменении state React строит новый virtual tree, сравнивает с предыдущим (reconciliation), затем делает минимальный набор изменений в реальном DOM — меньше лишних перерисовок и выше производительность.',
  },
  {
    question: 'Объясните разницу между SSR, SSG и CSR',
    answer:
      'SSR — рендер на сервере при каждом запросе, актуальный контент, нагрузка на сервер. SSG — статика при сборке, быстрая отдача, подходит для контента без частых изменений. CSR — рендер в браузере после загрузки JS, хорош для SPA, слабее для SEO без доп. решений.',
  },
]

export default function Cards() {
  const [cardIndex, setCardIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>
          Daily Routine <span className='text-primary'>Learn</span>
        </h1>
        <p className='mt-2 text-lg text-white/70'>
          Карточки для закрепления изученного материала
        </p>
      </div>
      {!isVisible ? (
        <Button onClick={() => setIsVisible(true)}>Начать</Button>
      ) : (
        <div>
          <FlipCard
            question={mock[cardIndex].question}
            answer={mock[cardIndex].answer}
          />
          <NavButtons
            cardIndex={cardIndex}
            setCardIndex={setCardIndex}
            totalCards={mock.length - 1}
          />
        </div>
      )}
    </section>
  )
}
