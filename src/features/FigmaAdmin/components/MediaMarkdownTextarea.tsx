'use client'

import { useUploadFigmaMedia } from '@/services/figma'
import { Button, Textarea } from '@/shared/ui'
import { ImagePlus } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'

function mediaAltFromName(name: string) {
  return name.replace(/\.[^/.]+$/, '') || 'media'
}

interface MediaMarkdownTextareaProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

export function MediaMarkdownTextarea({
  value,
  onChange,
  disabled,
  error,
}: MediaMarkdownTextareaProps) {
  const uploadMedia = useUploadFigmaMedia()
  const fileRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertMedia = (url: string, filename: string) => {
    const textarea = textareaRef.current
    const start = textarea?.selectionStart ?? value.length
    const end = textarea?.selectionEnd ?? value.length
    const markdown = `\n\n![${mediaAltFromName(filename)}](${url})\n\n`
    const nextValue = `${value.slice(0, start)}${markdown}${value.slice(end)}`

    onChange(nextValue)

    requestAnimationFrame(() => {
      textarea?.focus()
      textarea?.setSelectionRange(
        start + markdown.length,
        start + markdown.length,
      )
    })
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    uploadMedia.mutate(file, {
      onSuccess: ({ url }) => insertMedia(url, file.name),
      onSettled: () => {
        event.target.value = ''
      },
    })
  }

  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='flex justify-end'>
        <Button
          type='button'
          onClick={() => fileRef.current?.click()}
          disabled={disabled || uploadMedia.isPending}
          className='px-3'
        >
          <ImagePlus className='size-4' />
          {uploadMedia.isPending ? 'Загрузка...' : 'Медиа'}
        </Button>
      </div>

      <input
        ref={fileRef}
        type='file'
        accept='image/jpeg,image/png,image/webp,image/gif'
        className='hidden'
        onChange={handleFileChange}
      />

      <Textarea
        ref={textareaRef}
        label='Текст'
        error={error}
        wrapperCN='w-full pb-0'
        className='min-h-72'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled || uploadMedia.isPending}
      />
    </div>
  )
}
