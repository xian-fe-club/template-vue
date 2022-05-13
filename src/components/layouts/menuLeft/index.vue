<template>
  <div class="menu">
    <a-menu
      style="width: 200px"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @click="handleRoute"
    >
      <div v-for="item in menuList" :key="item.name">
        <MenuTree :menu="item" />
      </div>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import MenuTree from "@/components/layouts/menuTree/index.vue";

export default defineComponent({
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
    const menuList: any = ref([]);
    // 初始化菜单选中
    const ininMent = (menu: any) => {
      menuList.value = menu;
      const list: any = [];
      const keys: any = [];
      // 默认选中的菜单name等于当前路由的name
      // 如果存在多级菜单如页面详情页menuName等于需要选中的菜单name即可
      keys.push(route.meta.menuName ? route.meta.menuName : route.name);
      if (menu.length) {
        menu.forEach((item: any) => {
          // 配置打开的菜单项
          list.push(item.name);
        });
      }
      data.openKeys = list;
      data.selectedKeys = keys;
    };
    ininMent(props.menulist);
    const handleRoute = function(row: any) {
      router.replace({ name: row.key });
    };
    watch(
      () => props.menulist,
      () => {
        ininMent(props.menulist);
      }
    );
    onBeforeRouteUpdate((to: any) => {
      const keys: any = [];
      keys.push(to.meta.menuName ? to.meta.menuName : to.name);
      data.selectedKeys = keys;
    });
    return {
      menuList,
      handleRoute,
      ...toRefs(data)
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.menu {
  padding-top: 20px;

  .ant-menu-item,
  .ant-menu-submenu-title {
    height: 40px;
    line-height: 40px;
  }

  .ant-menu-submenu-selected {
    color: #333;
  }

  .ant-menu-inline .ant-menu-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
