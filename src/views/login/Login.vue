<template>
  <div class="login">
    <Card class="login-wrapper" title="账户登录">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input
            type="text"
            v-model="formInline.account"
            @keyup.enter.native="handleSubmit('formInline')"
            placeholder="账号"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.password"
            @keyup.enter.native="handleSubmit('formInline')"
            placeholder="密码"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="loading" long @click="handleSubmit('formInline')">
            <span v-if="!loading">登录</span>
            <span v-else>正在登录中...</span>
          </Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loading: false,
      formInline: {
        account: "",
        password: ""
      },
      ruleInline: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能少于6位！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          this.isLogin(this.formInline)
            .then(res => {
              if (res.data.code == 200) {
                if (!res.data.data.isLogin) {
                  this.login(this.formInline);
                } else {
                  this.$Modal.confirm({
                    title: "提示",
                    content: "该账号已在别处登录，是否继续登录",
                    onOk: () => {
                      this.login(this.formInline);
                    },
                    onCancel: () => {
                      this.loading = false;
                      this.$Message.info("取消登录");
                    }
                  });
                }
              }
            })
            .catch(() => {
              this.$Message.error(this.$config.errorMsg);
            });
        }
      });
    },
    isLogin(param) {
      param.check = 1;
      return this.axios.post("/login", param);
    },
    login(param) {
      param.check = 0;
      this.axios
        .post("/login", param)
        .then(res => {
          this.loading = false;
          if (res.data.code == 200) {
            sessionStorage.setItem("accessToken", res.data.data.token);
            sessionStorage.setItem(
              "userName",
              res.data.data.hall.sportsHallName
            );
            this.$Message.success("登陆成功！");
            this.$router.replace("/");
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch(() => {
          this.loading = false;
          this.$Message.error(this.$config.errorMsg);
        });
    }
  }
};
</script>
<style scoped>
.login {
  height: 100%;
  background: url("../../assets/login/login.jpg") no-repeat;
}
.login .login-wrapper {
  position: absolute;
  width: 320px;
  right: 15%;
  top: 33%;
}
</style>
