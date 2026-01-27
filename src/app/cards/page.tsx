'use client'
import { useState } from 'react'

interface FlipCardProps {
  question: string
  answer: string
}

function FlipCard({ question, answer }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex justify-center">
      <div 
        className="relative w-xs h-100 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={handleClick}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Передняя сторона */}
          <div 
            className="absolute w-full h-full bg-gray/40 border border-white/10 rounded-2xl px-4 py-6 shadow-sm hover:border-primary/50 hover:bg-gray/60 hover:shadow-lg transition-all duration-300"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex flex-col h-full items-center justify-center text-center">
              <h3 className="text-lg text-white/70">{question}</h3>
              <p className="mt-4 text-sm text-white/50">Нажмите для ответа</p>
            </div>
          </div>
          
          {/* Задняя сторона */}
          <div 
            className="absolute w-full h-full bg-gray/40 border border-white/10 rounded-2xl px-4 py-6 shadow-sm hover:border-primary/50 hover:bg-gray/60 hover:shadow-lg transition-all duration-300"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
            <div className="flex flex-col h-full items-center justify-center text-center">
              <h3 className="text-lg text-white/70 whitespace-pre-line">{answer}</h3>
              <p className="mt-4 text-sm text-white/50">Нажмите для возврата</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cards() {
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
          <p className='mt-2 text-lg text-white/70'>
            Карточки для закрепления изученного материала
          </p>
        </div>
      </section>
      <FlipCard
        question='Опишите, что происходит, когда пользователь вводит URL в браузер'
        answer={`Проверка кэша
DNS-резолв
TCP-handshake
TLS-handshake (если HTTPS)
HTTP-запрос
Парсинг HTML
Загрузка CSS/JS
Рендеринг`}
      />
    </>
  )
}