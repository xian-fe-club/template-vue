<template>
  <div class="page-breadcrumb-box">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(item, index) in list" :key="index">{{
        item.meta.title
      }}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const setMatched = (matched: any) => {
      const arr: any = [];
      matched.forEach((item: any) => {
        if (item.meta.title) {
          arr.push(item);
        }
      });
      return arr;
    };
    const list: any = reactive(setMatched(useRoute().matched));
    onBeforeRouteUpdate(to => {
      list.splice.apply(list, [0, list.length, ...setMatched(to.matched)]);
    });
    return {
      list
    };
  }
});
</script>
