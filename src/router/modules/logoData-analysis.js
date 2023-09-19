import Layout from '@/layout'
const tableRouter = {
    path: '/rearEnd/logAnalysis',
    component:Layout,
    // redirect: '/fontEnd/behaviorAnalysis/userBehavior',
    alwaysShow: true,
    meta: {
      title: '日志数据分析',
      icon: 'behaviorAnaly'
    },
    children: [
      {
        path: 'userBehavior',
        component: () => import('@/views/log-analysis/index'),
        name: 'userBehavior',
        meta: { title: '日志分析' }
      }
    ]
  }
  export default tableRouter