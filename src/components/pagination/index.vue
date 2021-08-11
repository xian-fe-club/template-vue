<template>
  <div class="pagination">
    <div class="pagination-total">
      共<span class="red">{{ total }}</span
      >条数据
    </div>
    <a-pagination
      show-quick-jumper
      show-size-changer
      :current="page"
      :pageSize="pageSize"
      :pageSizeOptions="sizeOptions"
      :total="total"
      @change="changePage"
      @showSizeChange="changeSize"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Pagination",
  props: {
    page: {
      type: Number,
      default: 1
    },
    pageSize: { type: Number, default: 10 },
    total: { type: Number, default: 0 }
  },
  setup(prop: any, ctx: any) {
    const sizeOptions = ["10", "20", "30", "40", "50"];

    const changePage = (current: number, size?: number) => {
      ctx.emit("changePage", current, size ?? prop.pageSize);
    };
    const changeSize = (current: number, size: number) => {
      ctx.emit("changeSize", size, current);
      changePage(current, size);
    };
    return {
      changePage,
      changeSize,
      sizeOptions
    };
  }
});
</script>
