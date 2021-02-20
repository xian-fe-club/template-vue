<template>
  <div class="login flex-center">
    <div class="login-box">
      <a-form>
        <div class="login-title">登录</div>
        <div class="login-line">
          <a-input
            placeholder="账号"
            type="text"
            size="large"
            v-model:value="info.account"
          >
            <template #prefix><UserOutlined /></template>
          </a-input>
        </div>
        <div class="login-line">
          <a-input
            placeholder="密码"
            type="password"
            size="large"
            autocomplete
            v-model:value="info.password"
          >
            <template #prefix><UnlockOutlined /></template>
          </a-input>
        </div>
        <div class="login-line">
          <a-button type="primary" size="large" @click="submit">登录</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { login } from "@/api/auth";
import storage from "@/utils/storage";
import store from "@/store";

export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    UnlockOutlined
  },
  setup() {
    const router = useRouter();
    const info = reactive({
      account: "",
      password: ""
    });
    const submit = () => {
      login(info).then((res: any) => {
        storage.set("TOKEN", res.data.token);
        storage.set("ACCOUNT", info.account);
        store.commit("user/SET_TOKEN", res.data.token);
        router.push("/app");
      });
    };
    return { info, submit };
  }
});
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: @primary-color;

  .login-box {
    width: 360px;
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
  }

  .login-title {
    padding-bottom: 10px;
  }

  .login-line {
    margin-bottom: 20px;

    .ant-btn {
      width: 100%;
    }
  }
}
</style>
