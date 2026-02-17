export const queryKeys = {
  user: ['user'],
  part: ['part'],
  chapter: (id: string) => ['chapter', id],
} as const
