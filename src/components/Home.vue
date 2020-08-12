<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <!-- 判断是否折叠 并改变侧边栏边距-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
         <!-- 折叠菜单选项 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
         <el-menu
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409eff"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="activePath">
        <!-- 上面开启路由模式 -->
        <!-- 一级菜单 -->
      <el-submenu :index="item.id +''" v-for="item in menuList" :key="item.id">
        <!-- 一级菜单的模板区 -->
        <template slot="title">
          <i :class="iconObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>

        <!-- 二级菜单  循环遍历接口数据-->
          <el-menu-item :index="'/'+subItem.path"
          v-for="subItem in item.children" :key="subItem.id"
          @click="saveNavState('/'+subItem.path)">
            <!-- 二级菜单的模板区 -->
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </template>
          </el-menu-item>
      </el-submenu>

      </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  // 保存接口数据
  data () {
    return {
      // 左侧菜单数据保存
      menuList: [],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      // data中保存链接地址
      activePath: ''
    }
  },
  // 组件被创建之前
  created () {
    this.getMenulist()
    // home组件刚被创建时给链接地址赋初值 从session里面取值
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 实现退出功能
    logout () {
      // 销毁 token并跳转到登录页
      window.sessionStorage.clear()
      // 路由跳转
      this.$router.push('/login')
    },
    // 异步函数 返回promise接收
    async getMenulist () {
      // 解构赋值接收
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res)
      // 可以查看接收到的数据是什么样式的
      console.log(this.menuList)
    },
    // 点击按钮 切换菜单的折叠和展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      // 将链接地址保存在sessionStorage中 方便以后再取出
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }

  }
}
</script>
<style lang="less" scoped>
.home-container{
  // 充满全屏
  height: 100%;
}
.el-header{
  background-color: #373d41;
  display: flex;
  // 两端对齐
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  // 左边div
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside{
  background-color: #333744;
  .el-menu{
    // 去掉右边边框线
    border-right: none;
  }
}
.el-main{
  background-color: #eaedf1;
}
.iconfont{
  margin-left: 10px;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  // 间距
  letter-spacing: .2em;
  cursor: pointer;
}
</style>
