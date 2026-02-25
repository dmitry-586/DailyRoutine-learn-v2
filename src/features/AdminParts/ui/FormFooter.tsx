import { Button } from '@/shared/ui'

interface FormFooterProps {
  onCancel: () => void
  submitLabel?: string
  cancelLabel?: string
  isPending?: boolean
  submitDisabled?: boolean
  className?: string
}

export function FormFooter({
  onCancel,
  submitLabel = 'Создать',
  cancelLabel = 'Отмена',
  isPending = false,
  submitDisabled = false,
  className = 'flex justify-end gap-4 pt-4',
}: FormFooterProps) {
  return (
    <div className={className}>
      <button
        type='button'
        className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50'
        onClick={onCancel}
        disabled={isPending}
      >
        {cancelLabel}
      </button>
      <Button
        type='submit'
        className='text-primary'
        disabled={isPending || submitDisabled}
      >
        {submitLabel}
      </Button>
    </div>
  )
}
