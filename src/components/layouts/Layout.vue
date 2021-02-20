<template>
  <a-layout class="layout">
    <a-layout-header> <Header @changeMenu="changeMenu" /> </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <MenuLeft :menulist="leftMenu" />
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { reactive } from "vue";
import MenuLeft from "./MenuLeft.vue";
import Header from "./Header.vue";

export default {
  components: { Header, MenuLeft },
  setup() {
    const leftMenu: any = reactive([]);
    const changeMenu = function(menu: any) {
      leftMenu.splice.apply(leftMenu, [0, leftMenu.length, ...menu]);
    };
    return {
      leftMenu,
      changeMenu
    };
  }
};
</script>
<style lang="less" scoped>
.ant-layout-header {
  padding: 0 20px;
}
.layout {
  height: 100%;
  .header-box {
    height: 100%;
    color: #fff;
  }
  .logo {
    width: 180px;
    height: 40px;
    background-image: url(https://biv.oss-cn-hangzhou.aliyuncs.com/common/logo.png);
    background-size: cover;
  }
}
</style>
