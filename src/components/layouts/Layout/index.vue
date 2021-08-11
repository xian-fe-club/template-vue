<template>
  <a-layout class="layout">
    <a-layout-header> <Header @changeMenu="changeMenu" /> </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <MenuLeft :menulist="leftMenu" />
      </a-layout-sider>
      <a-layout-content>
        <div class="page-box">
          <Breadcrumb></Breadcrumb>
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { reactive, computed } from "vue";
import MenuLeft from "@/components/layouts/MenuLeft/index.vue";
import Header from "@/components/layouts/Header/index.vue";
import { useRoute } from "vue-router";

export default {
  components: { Header, MenuLeft },
  setup() {
    const leftMenu: any = reactive([]);
    const changeMenu = function(menu: any) {
      leftMenu.splice.apply(leftMenu, [0, leftMenu.length, ...menu]);
    };

    const route = useRoute();
    const key = computed(() => (route.path !== void 0 ? `${route.path}${new Date()}` : new Date()));
    return {
      leftMenu,
      changeMenu,
      key
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
