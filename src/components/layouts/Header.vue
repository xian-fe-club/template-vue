<template>
  <div class="header-box flex-between">
    <div class="header-left flex">
      <div class="logo"></div>
      <div class="header-menu">
        <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal">
          <a-menu-item
            v-for="menu in routeList"
            :key="menu.name"
            @click="handleMenu(menu, 1)"
            >{{ menu.meta.title }}</a-menu-item
          >
        </a-menu>
      </div>
    </div>

    <div class="user">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          Hover me
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="handleUser">
            <a-menu-item key="1">
              1st menu item
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Route from "@/utils/route";
import { useRoute, useRouter } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "Header",
  components: { DownOutlined },
  setup(_: any, ctx: any) {
    const selectedKeys: any = ref("");
    const route = useRoute();
    const router = useRouter();
    // 获取导航菜单
    const routeList = reactive(Route.getMenuList());
    // 获取当前主导航菜单子菜单
    const menuData = routeList.find((item: any) => {
      return route.path.includes(item.path);
    });
    const handleMenu = function(row: any, type?: number) {
      if (row) {
        // 修改子集菜单
        ctx.emit("changeMenu", row.children);
        selectedKeys.value = [row.name];
      }
      // 菜单点击
      if (type) {
        router.replace({ name: row.name });
      }
    };
    handleMenu(menuData);
    const handleUser = (row: string) => {
      console.log(row);
    };

    return { menuData, routeList, selectedKeys, handleMenu, handleUser };
  }
});
</script>
<style lang="less" scoped>
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

.header-menu {
  margin-left: 30px;

  .ant-menu {
    background: transparent;
  }
}

.ant-menu-item {
  color: #fff;
}
</style>
