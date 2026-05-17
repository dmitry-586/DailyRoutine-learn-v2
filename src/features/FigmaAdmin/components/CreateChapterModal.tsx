'use client'

import { Modal } from '@/shared/ui'
import { CreateChapterForm } from './CreateChapterForm'

interface CreateChapterModalProps {
  isOpen: boolean
  nextOrder: number
  handleClose: () => void
}

export function CreateChapterModal({
  isOpen,
  nextOrder,
  handleClose,
}: CreateChapterModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title='Добавить новую главу'>
      <CreateChapterForm
        nextOrder={nextOrder}
        onCreated={handleClose}
        onCancel={handleClose}
      />
    </Modal>
  )
}
