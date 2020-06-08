<template>
  <el-container>
    <!-- 侧边栏导航 -->
    <el-aside :width="menuCollapse ? '0' :'200px'">
      <div class="aside-header">
        <p>XX租赁</p>
      </div>
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
        <!-- 一级菜单 -->
        <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <span>{{item.text}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            :index="'/' + subItem.path"
            v-for="subItem in item.children"
            :key="subItem.subid"
            @click="checkActive('/' + subItem.path, subItem.subtext)"
          >
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
        <div class="header-center">
          <span>{{ uname }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <div class="header-right">
          <el-button type="info" @click="logout">退出</el-button>
        </div>
      </el-header>
      <!-- 主体内容 -->
      <el-main>
        <div class="main-header">
          <p>
            <i class="el-icon-d-arrow-left" @click="goback"></i>
          </p>
          <p>
            <i class="el-icon-s-home"  @click="gomain"></i>
          </p>
          <p>
            <span>{{ subRoute }}</span>
            <i class="el-icon-close" @click="goback"></i>
          </p>
        </div>
        <div class="routerview-wrapper">
          <router-view v-if="isRouterAlive" @changeSubRoute="changeSubRouteHandler"/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isRouterAlive: true,
      menuList: [
        {
          id: "100",
          text: "商品管理",
          children: [
            { subid: "101", subtext: "商品管理", path: "promanage" },
            { subid: "102", subtext: "品牌管理", path: "probrand" },
            { subid: "103", subtext: "商品分类", path: "procategory" }
          ]
        },
        {
          id: "200",
          text: "用户管理",
          children: [
            { subid: "201", subtext: "用户管理", path: "usermanage" },
            { subid: "202", subtext: "供应商管理", path: "suppliermanage" },
            { subid: "203", subtext: "管理员管理", path: "adminmanage" }
          ]
        },
        {
          id: "300",
          text: "订单记录",
          children: [
            { subid: "301", subtext: "全部", path: "orderall" },
            { subid: "302", subtext: "待审核", path: "ordercheck" },
            { subid: "303", subtext: "待付款", path: "orderunpay" },
            { subid: "304", subtext: "待发货", path: "ordersend" },
            { subid: "305", subtext: "待收货", path: "orderreceive" },
            { subid: "306", subtext: "已完成", path: "orderfinish" }
          ]
        },
        {
          id: "400",
          text: "数据统计",
          children: [{ subid: "401", subtext: "统计列表", path: "statistical" }]
        }
      ],
      uname: "",
      menuCollapse: false,
      iconCollapse: "el-icon-s-fold",
      defaultActive: "/statistical",
      subRoute: "",
      timeOut: null
    };
  },
  created() {
    this.uname = window.sessionStorage.getItem("uname");
    this.defaultActive = sessionStorage.getItem("activePath") || "/statistical";
    this.subRoute = sessionStorage.getItem("subRoute") || "";
  },
  methods: {
    // 折叠导航栏
    toggleCollapse() {
      this.menuCollapse = !this.menuCollapse;
      this.iconCollapse = this.menuCollapse
        ? "el-icon-s-unfold"
        : "el-icon-s-fold";
    },
    // 点击刷新按钮刷新页面
    reloadPage() {
      // this.$router.go(0);location.reload();
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    // 退出登录
    logout(){
      this.$router.push('login');
    },
    // 点击导航栏选项
    checkActive(activePath, subText) {
      this.defaultActive = activePath;
      this.subRoute = subText;
    },
    // 点击返回按钮
    goback() {
      this.$router.back();
    },
    // 点击回去main路由
    gomain(){
      if(this.timeOut) clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        this.$router.push('/main').catch(err => {
          this.$message.warning('已在主页面')
          this.timeOut = null
        })
      }, 300)
    },
    // 接受子组件详情按钮的参数
    changeSubRouteHandler(subRoute){
      this.subRoute = subRoute
    }
  },
  watch: {
    // 监听导航栏高亮
    defaultActive(newVal, oldVal) {
      sessionStorage.setItem("activePath", newVal);
    },
    // 监听导航栏高亮标题
    subRoute(newVal,  oldVal) {
      sessionStorage.setItem("subRoute", newVal);
    },
    // 监听路由变化导航栏高亮变化
    $route(to, from) {
      this.defaultActive = to.path;
      this.menuList.forEach(item => {
        item.children.forEach(subitem => {
          if (subitem.path === to.path.slice(1))
            this.subRoute = subitem.subtext;
        });
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("uname");
    sessionStorage.removeItem('pageSize');
    sessionStorage.removeItem('pageNum');
    sessionStorage.removeItem('activePath');
    sessionStorage.removeItem('subRoute');
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
  .aside-header {
    > p {
      height: 56px;
      line-height: 56px;
      padding-left: 20px;
      color: #ffffff;
    }
  }

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
    // width: 200px;
    > i {
      margin: 10px;
      font-size: 1.5em;
      cursor: pointer;
    }
  }
  .header-center {
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
  .header-right{
    .el-button{
      margin: 10px;
    }
  }
}
.el-main {
  background: #eee;
  padding: 0;
  .main-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 3px 10px #5e5d5d;
    p {
      border-right: 1px solid #5e5d5d;
      display: flex;
      align-items: center;
      &:last-child {
        border-right: none;
      }
    }
    i {
      padding: 8px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    span {
      padding: 5px;
    }
  }
  .routerview-wrapper {
    margin: 20px;
    background: #fff;
  }
}
</style>