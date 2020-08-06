import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      exact: true,
      redirect: '/todolist',
    },
    {
      path: '/todolist',
      component: '@/layout/Authorized',
      routes: [
        {
          path: './',
          component: '@/pages/TodoList',
        },
      ],
    },
    {
      path: '/login',
      component: '@/pages/login',
    },
    {
      path: '/register',
      component: '@/pages/register',
    },
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:4000',
      changeOrigin: true,
    },
  },
});
