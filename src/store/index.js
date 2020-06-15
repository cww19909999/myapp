import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tagList: [
      { label: "优惠", value: "discounts" },
      { label: "高档", value: "highclass" },
      { label: "推荐", value: "recommend" },
      { label: "热卖", value: "hotsale" }
    ],
    productList0: [
      {
        id: 1,
        name: "苹果11456456456456456",
        spec: "a",
        price: "6799",
        rentNum: "12",
        purchases: "12",
        uvNum: "9999",
        tag: ["discounts", "highclass"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 2,
        name: "苹果10",
        spec: "b",
        price: "1111",
        rentNum: "13",
        purchases: "6",
        uvNum: "2222",
        tag: ["recommend", "highclass"],
        status: false,
        startTime: "2019-9-6 14:48:33",
        updateTime: "2019-10-16 10:00:00"
      },
      {
        id: 3,
        name: "苹果9",
        spec: "c",
        price: "2222",
        rentNum: "22",
        purchases: "3",
        uvNum: "9999",
        tag: ["discounts", "hotsale"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2020-12-16 10:00:00"
      },
      {
        id: 4,
        name: "苹果8",
        spec: "d",
        price: "3333",
        rentNum: "33",
        purchases: "2",
        uvNum: "3333",
        tag: ["discounts", "highclass", "recommend", "hotsale"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 5,
        name: "苹果7",
        spec: "e",
        price: "4444",
        rentNum: "13",
        purchases: "12",
        uvNum: "9999",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 6,
        name: "苹果6",
        spec: "a",
        price: "5555",
        rentNum: "32",
        purchases: "19",
        uvNum: "2222",
        tag: ["discounts", "highclass"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 7,
        name: "苹果5",
        spec: "b",
        price: "6666",
        rentNum: "654",
        purchases: "192",
        uvNum: "9999",
        tag: ["discounts", "highclass"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 8,
        name: "苹果4",
        spec: "c",
        price: "7777",
        rentNum: "46",
        purchases: "12",
        uvNum: "1111",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 9,
        name: "苹果3",
        spec: "d",
        price: "88888",
        rentNum: "565",
        purchases: "126",
        uvNum: "9999",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 10,
        name: "苹果2",
        spec: "abc",
        price: "9999",
        rentNum: "65",
        purchases: "125",
        uvNum: "123",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 11,
        name: "苹果1",
        spec: "abc",
        price: "8765",
        rentNum: "56",
        purchases: "121",
        uvNum: "321",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 12,
        name: "苹果12",
        spec: "abc",
        price: "4545",
        rentNum: "23",
        purchases: "102",
        uvNum: "333",
        tag: ["discounts", "highclass"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 13,
        name: "苹果11",
        spec: "a",
        price: "6799",
        rentNum: "12",
        purchases: "12",
        uvNum: "9999",
        tag: ["discounts", "highclass"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 14,
        name: "苹果10",
        spec: "b",
        price: "1111",
        rentNum: "13",
        purchases: "6",
        uvNum: "2222",
        tag: ["recommend", "highclass"],
        status: false,
        startTime: "2019-9-6 14:48:33",
        updateTime: "2019-10-16 10:00:00"
      },
      {
        id: 15,
        name: "苹果9",
        spec: "c",
        price: "2222",
        rentNum: "22",
        purchases: "3",
        uvNum: "9999",
        tag: ["discounts", "hotsale"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2020-12-16 10:00:00"
      },
      {
        id: 16,
        name: "苹果8",
        spec: "d",
        price: "3333",
        rentNum: "33",
        purchases: "2",
        uvNum: "3333",
        tag: ["discounts", "highclass", "recommend", "hotsale"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 17,
        name: "苹果7",
        spec: "e",
        price: "4444",
        rentNum: "13",
        purchases: "12",
        uvNum: "9999",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 18,
        name: "苹果6",
        spec: "a",
        price: "5555",
        rentNum: "32",
        purchases: "19",
        uvNum: "2222",
        tag: ["discounts", "highclass"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 19,
        name: "苹果5",
        spec: "b",
        price: "6666",
        rentNum: "654",
        purchases: "192",
        uvNum: "9999",
        tag: ["discounts", "highclass"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 20,
        name: "苹果4",
        spec: "c",
        price: "7777",
        rentNum: "46",
        purchases: "12",
        uvNum: "1111",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 21,
        name: "苹果3",
        spec: "d",
        price: "88888",
        rentNum: "565",
        purchases: "126",
        uvNum: "9999",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 22,
        name: "苹果2",
        spec: "abc",
        price: "9999",
        rentNum: "65",
        purchases: "125",
        uvNum: "123",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 23,
        name: "苹果1",
        spec: "abc",
        price: "8765",
        rentNum: "56",
        purchases: "121",
        uvNum: "321",
        tag: ["discounts", "highclass"],
        status: false,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      },
      {
        id: 24,
        name: "苹果12",
        spec: "abc",
        price: "4545",
        rentNum: "23",
        purchases: "102",
        uvNum: "333",
        tag: ["discounts", "highclass"],
        status: true,
        startTime: "2019-12-6 14:48:33",
        updateTime: "2019-12-16 10:00:00"
      }
    ],
    product: null,
    supplierList0: [
      {
        id: "100001",
        supplier: "京东",
        accout: "jingdong",
        password: "88888888",
        linkman: "刘强东",
        phone: "17718881999",
        status: true,
        createTime: "2019-12-4 14:27:13",
        updateTime: "2019-12-14 15:10:05"
      },
      {
        id: "100002",
        supplier: "京西",
        accout: "jingdong",
        password: "88888888",
        linkman: "刘强西",
        phone: "17718881999",
        status: false,
        createTime: "2019-12-4 14:27:13",
        updateTime: "2019-12-14 15:10:05"
      },
      {
        id: "100003",
        supplier: "京南",
        accout: "jingdong",
        password: "88888888",
        linkman: "刘强南",
        phone: "17718881999",
        status: true,
        createTime: "2019-12-4 14:27:13",
        updateTime: "2019-12-14 15:10:05"
      },
      {
        id: "100004",
        supplier: "京北",
        accout: "jingdong",
        password: "88888888",
        linkman: "刘强北",
        phone: "17718881999",
        status: false,
        createTime: "2019-12-4 14:27:13",
        updateTime: "2019-12-14 15:10:05"
      },
      {
        id: "100005",
        supplier: "京东",
        accout: "jingdong",
        password: "88888888",
        linkman: "刘强中",
        phone: "17718881999",
        status: true,
        createTime: "2019-12-4 14:27:13",
        updateTime: "2019-12-14 15:10:05"
      },
      {
        id: "100006",
        supplier: "京东",
        accout: "jingdong",
        password: "88888888",
        linkman: "刘强发",
        phone: "17718881999",
        status: false,
        createTime: "2019-12-4 14:27:13",
        updateTime: "2019-12-14 15:10:05"
      }
    ],
    supplierList: []
  },
  mutations: {
    // 根据id获取商品
    getProductById(state, id){
      state.productList0.forEach(item => {
        if(item.id == id) state.product = item
      })
    },
    // 根据条件获取供应商列表
    getSupplierList(state, playload){
      let {keyword, pageSize, pageNum} = playload;
      let start, end, total, result0, result = [];
      result0 = state.supplierList0.filter(item => {
        return item.supplier.indexOf(keyword) !== -1
      })
      total = result0.length;
      start = pageSize * (pageNum - 1);
      end = start + pageSize;
      end = end > total ? total : end;
      for(let i = start; i < end; i++){
        result.push(result0[i])
      }
      state.supplierList = result;
    },
    addSupplierForm(state, data){
      let productList0 = state.productList0;
      let max = 0;
      productList0.forEach(item => {
        if (item.id > max) max = parseInt(item.id)
      })
      data.id = ++max + '';
      productList0.push(data)
    }
  },
  actions: {
  },
  modules: {
  }
})
