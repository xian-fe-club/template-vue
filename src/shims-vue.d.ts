declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component

  export interface ComponentCustomProperties {
    $filters: typeof Filters;
  }
}

declare let NODE_ENV: string; 
