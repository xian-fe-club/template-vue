<template>
  <a-layout class="layout">
    <a-layout-header> <Header @changeMenu="changeMenu" /> </a-layout-header>
    <a-layout>
      <a-layout-sider width="200px" v-if="menuList && menuList.length">
        <MenuLeft :menulist="menuList" />
      </a-layout-sider>
      <a-layout-content id="main-layout-content">
        <div class="page-box">
          <Breadcrumb></Breadcrumb>
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref } from "vue";
import MenuLeft from "@/components/layouts/menuLeft/index.vue";
import Header from "@/components/layouts/header/index.vue";

export default {
  components: { Header, MenuLeft },
  setup() {
    const menuList: any = ref([]);
    const changeMenu = (row: any) => {
      menuList.value = row.children;
    };
    return {
      menuList,
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
