export const queryKeys = {
  user: ['user'] as const,
  part: ['part'] as const,
  chapter: {
    all: ['chapter'] as const,
    byId: (id: string) => ['chapter', id] as const,
  },
}
