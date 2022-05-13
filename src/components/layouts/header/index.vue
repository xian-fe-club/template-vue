<template>
  <div class="header-box flex-between">
    <div class="header-left flex">
      <div class="logo"></div>
      <div class="header-menu">
        <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal">
          <a-menu-item v-for="menu in routeList" :key="menu.name" @click="handleMenu(menu, 1)">{{
            menu.meta.title
          }}</a-menu-item>
        </a-menu>
      </div>
    </div>

    <div class="user">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{ name }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="handleUser">
            <a-menu-item key="exit"> 退出 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";
import Route from "@/utils/route";
import store from "@/store";

export default defineComponent({
  name: "Header",
  components: { DownOutlined },
  setup(_: any, ctx: any) {
    const selectedKeys: any = ref("");
    const route = useRoute();
    const router = useRouter();
    const name = ref(store.getters.name);
    // 获取导航菜单
    const routeList = reactive(Route.getMenuList());
    // 获取当前主导航菜单子菜单
    const getMenuData = (to?: any) => {
      return routeList.find((item: any) => {
        return to
          ? to.path.split("/")[2] == item.path.split("/")[2]
          : route.path.split("/")[2] == item.path.split("/")[2];
      });
    };
    const handleMenu = function(row: any, type?: number) {
      if (row) {
        // 修改子集菜单
        if (selectedKeys.value[0] !== row.name) {
          ctx.emit("changeMenu", row);
          selectedKeys.value = [row.name];
        }
      } else {
        ctx.emit("changeMenu", {});
        selectedKeys.value = [];
      }
      // 菜单点击
      if (type) {
        router.replace({ name: row.name });
      }
    };
    handleMenu(getMenuData());
    onBeforeRouteUpdate(to => {
      handleMenu(getMenuData(to));
    });
    const handleUser = (row: { key: string }) => {
      if (row.key === "exit") {
        store.dispatch("user/logout").then(async () => {
          await router.push("/login");
          // location.reload();
        });
      }
    };

    return { name, routeList, selectedKeys, handleMenu, handleUser };
  }
});
</script>
<style lang="less" scoped>
.header-box {
  height: 100%;
  color: #fff;

  .logo {
    width: 180px;
    height: 40px;
    background-image: url(https://biv.oss-cn-hangzhou.aliyuncs.com/common/logo.png);
    background-size: cover;
  }
}
</style>
<style lang="less">
.header-box {
  .header-menu {
    margin-left: 30px;

    .ant-menu {
      background: transparent;
    }

    .ant-menu-item {
      color: #fff;
    }
  }
}
</style>
