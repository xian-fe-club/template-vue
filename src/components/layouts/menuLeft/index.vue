<template>
  <div class="menu">
    <a-menu
      style="width: 200px"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      @click="handleRoute"
    >
      <div v-for="item in menuList" :key="item.name">
        <MenuTree :menu="item" />
      </div>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import MenuTree from "@/components/layouts/menuTree/index.vue";

export default {
  name: "MenuLeft",
  props: {
    menulist: {
      default: () => {
        return [];
      }
    }
  },
  components: { MenuTree },
  setup(props: any) {
    const data = reactive({
      openKeys: [],
      selectedKeys: []
    });
    const router = useRouter();
    const route = useRoute();
    // 获取导航菜单
    const menuList = reactive(props.menulist);
    console.log(menuList);

    // 初始化菜单选中
    const ininMent = (menuList: any, to?: any) => {
      const list: any = [];
      const keys: any = [];
      // 默认选中的菜单name等于当前路由的name
      // 如果存在多级菜单如页面详情页menuName等于需要选中的菜单name即可
      if (to) {
        keys.push(to.meta.menuName ? to.meta.menuName : to.name);
      } else {
        keys.push(route.meta.menuName ? route.meta.menuName : route.name);
      }
      if (menuList.length) {
        menuList.forEach((item: any) => {
          // 配置打开的菜单项
          list.push(item.name);
        });
      }
      data.openKeys = list;
      data.selectedKeys = keys;
    };
    ininMent(menuList);
    const handleRoute = function(row: any) {
      router.replace({ name: row.key });
    };
    onBeforeRouteUpdate(to => {
      ininMent(menuList, to);
    });
    return {
      menuList,
      handleRoute,
      ...toRefs(data)
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menu {
  .ant-menu-sub.ant-menu-inline .ant-menu-item,
  .ant-menu-submenu .ant-menu-submenu-title {
    height: 45px;
    line-height: 45px;
  }
}
</style>
