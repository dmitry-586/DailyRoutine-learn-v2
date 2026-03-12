import { Button } from '../Button'
import { Modal } from './Modal'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  deleteMessage: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  deleteMessage,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onCancel}>
      <h3 className='mt-3'>{message}</h3>
      <div className='mt-5 flex justify-end gap-5'>
        <Button variant='red' onClick={onConfirm}>
          {deleteMessage}
        </Button>
        <Button onClick={onCancel}>Вернуться</Button>
      </div>
    </Modal>
  )
}
