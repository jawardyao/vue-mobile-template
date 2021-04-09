export default {
  path: '/test',
  name: 'test',
  component: () => import('@/views/test/layout'),
  children: [
    // 水费
    {
      path: 'test',
      name: 'test.test',
      component: () => import('@/views/test/test/index'),
      meta: {
        title: '测试',
      },
    },
  ],
};
