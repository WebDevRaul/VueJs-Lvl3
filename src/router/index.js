import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Dashboard from '@/views/Dashboard.vue';
import Post from '@/views/Post.vue';
import store from '@/store';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    alias: '/about-me',
    path: '/about',
    component: About
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      console.log('Dashboard Guard');
      // console.log(to, 'to');
      // console.log(from, 'from');
      if (store.state.isAuth) {
        next();
      } else {
        next({ name: 'home' });
      }
    }
  },
  {
    name: 'post',
    path: '/post/:id',
    component: Post
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'text-yellow-500'
});

router.beforeEach((to, from, next) => {
  console.log('Global Guard');
  // console.log(to, 'to');
  // console.log(from, 'from');
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
  }

  if (store.state.isAuth) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;