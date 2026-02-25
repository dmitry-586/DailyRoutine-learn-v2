interface Chapter {
  id: string
  title: string
  order: number
}

interface Subchapter extends Chapter {
  chapterId: string
  description: string
}

interface ChapterWithSubchapters extends Chapter {
  partId: string
  subchapters: Subchapter[]
}

interface Part extends Chapter {
  chapters: Chapter[]
}

interface User {
  id: string
  email: string
  role: 'USER' | 'ADMIN'
}

interface AuthMeResponse {
  user: User
}

export type {
  AuthMeResponse,
  Chapter,
  ChapterWithSubchapters,
  Part,
  Subchapter,
  User,
}
