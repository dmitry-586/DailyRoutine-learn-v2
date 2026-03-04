import { useDeletePart } from '@/services/theory'
import { Button } from '@/shared/ui'
import { BaseModal } from './ui'

interface DeletePartModalProps {
  partId: string
  isOpen: boolean
  handleClose: () => void
}

export function DeletePartModal({
  handleClose,
  isOpen,
  partId,
}: DeletePartModalProps) {
  const deletePart = useDeletePart()

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title='Удалить всю часть'>
      <h3 className='mt-3'>Вы уверены, что хотите удалить всю часть?</h3>
      <div className='mt-5 flex justify-end gap-5'>
        <Button variant='red' onClick={() => deletePart.mutate(partId)}>
          Удалить
        </Button>
        <Button onClick={handleClose}>Вернуться</Button>
      </div>
    </BaseModal>
  )
}
