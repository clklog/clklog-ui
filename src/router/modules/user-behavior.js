import Layout from '@/layout'
const nestedRouter = {
  path: '/userBehavior',
  component: Layout,
  redirect: '/userBehavior/index',
  name: 'userBehavior',
  alwaysShow: true,
  meta: {
    title: '用户分析',
    icon: 'userBehavior'
  },
  children: [
    {
      path: 'portrait',
      component: () => import('@/views/user-behavior/index'),
      name: 'portrait',
      meta: { title: '用户画像' }
    }
  ]
}

export default nestedRouter
