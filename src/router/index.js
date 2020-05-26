import Vue from 'vue'
import VueRouter from 'vue-router'

import loginRoute from './login'
import mainRoute from './main'
import notfoundRoute from './notfound'
// import myindexRoute from './myindex'
// import productRoute from './product'
// import userRoute from './user'
// import orderRoute from './order'
// import accountingRoute from './accounting'
// import dataRoute from './data'
// import systemRoute from './system'
// import operationRoute from './operation'
// import channelRoute from './channel'
// import opinionRoute from './opinion'




Vue.use(VueRouter)

const routes = [
  { 
    path: '/',
    redirect: '/login'
  },
  loginRoute,
  mainRoute,
  notfoundRoute
  // myindexRoute,
  // productRoute,
  // userRoute,
  // orderRoute,
  // accountingRoute,
  // dataRoute,
  // systemRoute,
  // operationRoute,
  // channelRoute,
  // opinionRoute,
  
]

const router = new VueRouter({
  mode: 'history',
  // base: 'dist',
  routes
})

export default router
