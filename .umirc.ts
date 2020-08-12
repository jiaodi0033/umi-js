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
          component: '@/pages/ToList',
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
      target: 'http://192.168.1.4:8080',
      changeOrigin: true,
    },
  },
});
