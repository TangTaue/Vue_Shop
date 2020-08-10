<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    // 实现退出功能
    logout () {
      // 销毁 token并跳转到登录页
      window.sessionStorage.clear()
      // 路由跳转
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>

</style>
