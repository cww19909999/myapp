import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRoute from './login'

Vue.use(VueRouter)

const routes = [
  loginRoute,
  { 
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
