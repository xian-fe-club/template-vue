<template>
  <div class="error-page flex-center">
    <img src="./../../assets/images/common/401.png" />
    <span class="mt-12">很抱歉，您没有访问权限...</span>
    <a-button class="mt-20" type="primary" @click="goToPage">返回首页</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "401",
  setup() {
    const router = useRouter();
    const goToPage = () => {
      router.push("/app");
    };
    return { goToPage };
  }
});
</script>

<style lang="less" scoped>
.error-page {
  flex-direction: column;
  height: 100%;

  img {
    width: 400px;
    height: 300px;
  }
}
</style>
