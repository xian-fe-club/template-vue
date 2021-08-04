<template>
  <div class="menutree">
    <a-sub-menu v-if="menu.children && menu.children.length >= 1" :key="menu.name">
      <template #title>
        <div class="menu-title flex">
          <img class="mr-5" v-if="menu.meta.icon" :src="menu.meta.icon" />
          <span>{{ menu.meta.title }}</span>
        </div>
      </template>
      <MenuTree v-for="item in menu.children" :key="item.name" :menu="item" />
    </a-sub-menu>
    <a-menu-item v-else :key="menu.name"
      ><div class="menu-title flex">
        <img class="mr-5" v-if="menu.meta.icon" :src="menu.meta.icon" />
        <span>{{ menu.meta.title }}</span>
      </div></a-menu-item
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuTree",
  props: {
    menu: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>
<style lang="less" scoped>
.mr-5 {
  margin-right: 5px;
}

.menu-title {
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }
}
</style>
