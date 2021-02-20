<template>
  <div class="menutree">
    <a-sub-menu
      v-if="menu.children && menu.children.length >= 1"
      :key="menu.name"
    >
      <template #title>
        <span>{{ menu.meta.title }}</span>
      </template>
      <MenuTree v-for="item in menu.children" :key="item.name" :menu="item" />
    </a-sub-menu>
    <a-menu-item v-else :key="menu.path">{{ menu.meta.title }}</a-menu-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuTree",
  props: {
    menu: {
      default: () => {
        return {
          meta: {
            title: ""
          },
          path: "",
          name: "",
          children: [
            {
              path: ""
            }
          ]
        };
      }
    }
  }
});
</script>
