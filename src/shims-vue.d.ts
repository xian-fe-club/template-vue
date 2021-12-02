declare module "nprogress";
declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare let NODE_ENV: string;
declare const $filters = Filters;
