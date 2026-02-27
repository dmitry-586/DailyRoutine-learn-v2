import { Part } from '@/services'
import { useUpdatePartAndChapters } from '@/services/theory'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { PartEditorValues, createPartEditorSchema } from './schema'

export function usePartEditor(part: Part, minOrder: number, maxOrder: number) {
  const update = useUpdatePartAndChapters()

  // Стабилизируем схему, так как она зависит от внешних параметров min/max
  const schema = useMemo(
    () => createPartEditorSchema(minOrder, maxOrder),
    [minOrder, maxOrder],
  )

  // Стабилизируем значения для синхронизации с пропсами
  const values = useMemo(
    () => ({
      part: { order: part.order, title: part.title },
      chapters: part.chapters.map((c) => ({ order: c.order, title: c.title })),
    }),
    [part],
  )

  const methods = useForm<PartEditorValues>({
    mode: 'onChange',
    resolver: (values, context, options) => {
      return zodResolver(schema)(values, context, options)
    },
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    const isPartDirty =
      methods.formState.dirtyFields.part?.title ||
      methods.formState.dirtyFields.part?.order

    const chaptersToUpdate = part.chapters
      .map((ch, i) =>
        methods.formState.dirtyFields.chapters?.[i]
          ? { id: ch.id, data: { partId: part.id, ...data.chapters[i] } }
          : null,
      )
      .filter((ch): ch is NonNullable<typeof ch> => !!ch)

    // Если ничего не изменилось, не отправляем запрос
    if (!isPartDirty && chaptersToUpdate.length === 0) return

    update.mutate({
      partId: part.id,
      part: data.part,
      chapters: chaptersToUpdate,
    })
  })

  return { methods, onSubmit }
}
