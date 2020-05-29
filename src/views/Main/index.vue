<template>
  <el-container>
    <!-- 侧边栏导航 -->
    <el-aside :width="menuCollapse ? '0' :'200px'">
      <el-menu
        background-color="#424452"
        text-color="#fff"
        active-text-color="#2580E8"
        unique-opened
        router
        :collapse="menuCollapse"
        :collapse-transition="false"
        :default-active="defaultActive"
      >
        <el-menu-item>
          <span>XX租赁</span>
        </el-menu-item>
        <el-menu-item index="0">
          <span>首页</span>
        </el-menu-item>
        <!-- 一级菜单 -->
        <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <span>{{item.text}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.subid" @click="checkActive('/' + subItem.path)">
            <template slot="title">
              <span>{{subItem.subtext}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 主体容器 -->
    <el-container>
      <!-- 主体头部 -->
      <el-header>
        <div class="header-left">
          <i :class="iconCollapse" @click="toggleCollapse"></i>
          <i class="el-icon-refresh-left" @click="reloadPage"></i>
        </div>
        <div class="header-right">
          <span>{{ uname }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </el-header>
      <!-- 主体内容 -->
      <el-main>
        <router-view v-if="isRouterAlive"/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
//   provide(){
//       return{
//           reload: this.reloadPage
//       }
//   },
  data() {
    return {
      isRouterAlive: true,
      menuList: [
          { 
            id: "100", text: "商品管理", children: [
              {subid: "101", subtext:"商品管理", path: 'promanage'},
              {subid: "102", subtext:"品牌管理", path: 'probrand'},
              {subid: "103", subtext:"商品分类", path: 'procategory'}]
          },
          { 
            id: "200", text: "用户管理", children: [
              {subid: "201", subtext:"用户管理", path: 'usermanage'},
              {subid: "202", subtext:"供应商管理", path: 'suppliermanage'},
              {subid: "203", subtext:"管理员管理", path: 'adminmanage'}]
          },
          { 
            id: "300", text: "订单记录", children: [
              {subid: "301", subtext:"全部", path: 'orderall'},
              {subid: "302", subtext:"待审核", path: 'ordercheck'},
              {subid: "303", subtext:"待付款", path: 'orderunpay'},
              {subid: "304", subtext:"待发货", path: 'ordersend'},
              {subid: "305", subtext:"待收货", path: 'orderreceive'},
              {subid: "306", subtext:"已完成", path: 'orderfinish'}]
          },
          { 
            id: "400", text: "数据统计", children: [{subid: "401", subtext:"统计列表", path: 'statistical'}]
          },
      ],
      uname: "",
      menuCollapse: false,
      iconCollapse: 'el-icon-s-fold',
      defaultActive: '',
    };
  },
  created() {
      this.uname = window.sessionStorage.getItem('uname')
      this.defaultActive = sessionStorage.getItem('activePath')
  },
  methods:{
    toggleCollapse() {
        this.menuCollapse = !this.menuCollapse;
        this.iconCollapse = this.menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    reloadPage() {
        // this.$router.go(0);location.reload();
        this.isRouterAlive = false;
        this.$nextTick(()=>{
            this.isRouterAlive = true;
        })
    },
    checkActive(activePath) {
        this.defaultActive = activePath;
        sessionStorage.setItem('activePath', activePath);
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("uname");
    next();
  }
};
</script>
<style lang="less" scoped>
.el-container {
  min-height: 100vh;
}
.el-aside {
  background: #424452;
  .el-menu {
    border-right: none;
  }
}
.el-header {
  background: #08a684;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5e5d5d;

  .header-left {
    width: 200px;
    > i {
      margin-right: 20px;
      font-size: 1.5em;
      cursor: pointer;
    }
  }
  .header-right {
    flex: auto;
    text-align: center;
    > span,
    > i {
      margin: 0 10px 0 10px;
    }
    > i {
      color: #fff;
    }
  }
}
.el-main {
  background: #ffffff;
}
</style>