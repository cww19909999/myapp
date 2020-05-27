import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Container,
  Header,
  Footer,
  Aside,
  Main,
  Row,
  Col,
  Input,
  Image,
  Checkbox,
  Button,
  Message
} from 'element-ui'


Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Image)
Vue.use(Checkbox)
Vue.use(Button)

Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
