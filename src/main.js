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
  CheckboxGroup,
  Checkbox,
  Button,
  Message,
  Menu,
  Submenu,
  MenuItem,
  Card,
  Select,
  Option,
  DatePicker,
  Divider,
  Table,
  TableColumn,
  Switch,
  Pagination,
  Dialog,
  MessageBox,
  RadioGroup,
  Radio
} from 'element-ui'

import './assets/css/common.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.axios = axios


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
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)



Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
