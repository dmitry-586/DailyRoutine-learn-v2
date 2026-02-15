interface NavMenu {
  id: string
  title: string
  href: string
  isAdmin: boolean
}

const navMenu: NavMenu[] = [
  {
    id: '1',
    title: 'Профиль',
    href: '/profile',
    isAdmin: false,
  },
  {
    id: '2',
    title: 'Админка',
    href: '/admin',
    isAdmin: true,
  },
]

export { navMenu }
