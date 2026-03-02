import { partApi } from '@/services/theory/api'
import { redirect } from 'next/navigation'

export default async function TheoryPage() {
  const parts = await partApi.getAll()
  const sortedParts = [...parts].sort((a, b) => a.order - b.order)

  for (const part of sortedParts) {
    const firstChapter = [...part.chapters].sort((a, b) => a.order - b.order)[0]
    if (firstChapter) {
      redirect(`/theory/${firstChapter.id}`)
    }
  }

  return <div>Учебник пуст</div>
}
