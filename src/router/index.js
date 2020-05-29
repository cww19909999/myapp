import Vue from 'vue'
import VueRouter from 'vue-router'

import loginRoute from './login'
import mainRoute from './main'
import notfoundRoute from './notfound'





Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    redirect: '/login'
  },
  loginRoute,
  mainRoute,
  notfoundRoute
]

const router = new VueRouter({
  // mode: 'history',
  // base: 'dist',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/main'){
    sessionStorage.getItem('uname') ? next() : next('/login')
  }else{
    next()
  }
})

export default router
