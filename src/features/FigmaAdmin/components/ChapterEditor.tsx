'use client'

import { useFigmaChapterById } from '@/services/figma'
import { Loader } from '@/shared/ui/Loader'
import { SectionEditor } from './SectionEditor'
import { SectionForm } from './SectionForm'

interface ChapterEditorProps {
  chapterId: string
}

export function ChapterEditor({ chapterId }: ChapterEditorProps) {
  const { chapter, isLoading } = useFigmaChapterById(chapterId)
  const sections = chapter?.sections ?? []
  const nextOrder = (sections.at(-1)?.order ?? 0) + 1
  const maxOrder = sections.length

  if (isLoading) return <Loader />

  if (!chapter) {
    return <p className='text-primary mx-auto mt-8 text-sm'>Глава не найдена</p>
  }

  return (
    <div className='flex min-w-0 flex-1 flex-col gap-4'>
      <div>
        <p className='text-light-gray text-sm'>Редактирование</p>
        <h3 className='text-lg font-semibold sm:text-xl'>
          Глава {chapter.order}. {chapter.title}
        </h3>
      </div>

      {sections.map((section) => (
        <SectionEditor key={section.id} section={section} maxOrder={maxOrder} />
      ))}

      <SectionForm
        key={`${chapter.id}-${nextOrder}`}
        chapterId={chapter.id}
        nextOrder={nextOrder}
      />
    </div>
  )
}
