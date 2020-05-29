import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Container,
  Header,
  Aside,
  Main,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Image,
  Checkbox,
  Button,
  Message,
  Menu,
  Submenu,
  MenuItem
} from 'element-ui'

// import axios from 'axiox'
// axios.default.baseUrl = 'http://127.0.0.1/api/'
// Vue.prototype.axios = axios

Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Image)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)


Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
