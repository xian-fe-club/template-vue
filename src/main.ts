import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Filters from "./filters/index";
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  PageHeader,
  Result,
  Statistic,
  Descriptions,
  Empty,
  Tree,
  TreeSelect
} from "ant-design-vue";
import Focus from "./directive/focus";

import "./styles/base.less";
import "./permission";

const app = createApp(App);

app.config.globalProperties.$filters = Filters;
app.directive("focus", Focus);
app
  .use(ConfigProvider)
  .use(Layout)
  .use(Input)
  .use(InputNumber)
  .use(Button)
  .use(Switch)
  .use(Radio)
  .use(Checkbox)
  .use(Select)
  .use(Card)
  .use(Form)
  .use(Row)
  .use(Col)
  .use(Modal)
  .use(Table)
  .use(Tabs)
  .use(Icon)
  .use(Badge)
  .use(Popover)
  .use(Dropdown)
  .use(List)
  .use(Avatar)
  .use(Breadcrumb)
  .use(Steps)
  .use(Spin)
  .use(Menu)
  .use(Drawer)
  .use(Tooltip)
  .use(Alert)
  .use(Tag)
  .use(Divider)
  .use(DatePicker)
  .use(TimePicker)
  .use(Upload)
  .use(Progress)
  .use(Skeleton)
  .use(Popconfirm)
  .use(PageHeader)
  .use(Result)
  .use(Statistic)
  .use(Descriptions)
  .use(Empty)
  .use(Tree)
  .use(TreeSelect)
  .use(router)
  .use(store)
  .mount("#app");
