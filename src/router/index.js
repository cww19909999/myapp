import Vue from 'vue'
import VueRouter from 'vue-router'

import loginRoute from './login'
import myindexRoute from './myindex'
import productRoute from './product'
import userRoute from './user'
import orderRoute from './order'
import accountingRoute from './accounting'
import dataRoute from './data'
import systemRoute from './system'
import operationRoute from './operation'
import channelRoute from './channel'
import opinionRoute from './opinion'




Vue.use(VueRouter)

const routes = [
  loginRoute,
  myindexRoute,
  productRoute,
  userRoute,
  orderRoute,
  accountingRoute,
  dataRoute,
  systemRoute,
  operationRoute,
  channelRoute,
  opinionRoute,
  { 
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

export default router
