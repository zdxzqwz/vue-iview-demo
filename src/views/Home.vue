<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <img src="../assets/log.png" alt="云动-云上的运动" height="100%" />
          </div>
          <div class="layout-nav">
            <Dropdown placement="bottom-end" trigger="click" @on-click="handleDropdownMenu">
              <Avatar icon="ios-person" size="large" />
              <Button type="text" size="small" ghost>
                {{userName}}
                <Icon type="ios-arrow-down" />
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="changePwd">修改密码</DropdownItem>
                <DropdownItem name="logout">安全退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :open-names="openMenus" width="auto" ref="menu">
            <Submenu :name="menu.id" v-for="(menu,index) in menus" :key="index">
              <template slot="title">
                <Icon type="ios-analytics" />
                {{menu.text}}
              </template>
              <MenuItem
                :name="subMenu.id"
                v-for="(subMenu,index) in menu.submenu"
                :key="index"
                @click.native="menuClick(subMenu)"
                replace
              >{{subMenu.text}}</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 10px 10px'}">
          <Affix :offset-top="60">
            <Breadcrumb :style="{margin: '10px 0'}">
              <BreadcrumbItem v-for="(path,index) in fullpath" :key="index">{{path}}</BreadcrumbItem>
            </Breadcrumb>
            <template>
              
                <Tabs
                  type="card"
                  v-model="activeTab"
                  @on-tab-remove="handleTabRemove"
                  @on-click="tabClick"
                >
                  <TabPane
                    :label="tab.text"
                    v-for="(tab,index) in tabs"
                    :name="_.toString(tab.id)"
                    :key="index"
                    :closable="tab.closable"
                  ></TabPane>
                </Tabs>
            </template>
          </Affix>
          <Content :style="{padding: '10px', background: '#fff'}">
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      openMenus:[],
      menus: [], //一级菜单
      subMenu: [], //二级菜单
      tabs: [], //所有打开的tab页
      activeTab: null, //当前先激活的tab页
      fullpath: []
    };
  },
  computed: {
    userName() {
      return sessionStorage.getItem("userName");
    }
  },
  created() {
    this.getMenu();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 添加首页
      this.addIndex();
    },
    getMenu() {
      this.axios
        .get("/resource/currentUserTree")
        .then(res => {
          if (res.data.code == 200) {
            this.menus = res.data.data.menus;
            this.openMenus.push(_.head(this.menus).id);
            this.$nextTick(() => {
              this.$refs.menu.updateOpened();
            })
          }
        })
        .catch(() => {});
    },
    addIndex() {
      let index = {
        closable: false,
        code: "index",
        fullpath: "首页",
        icon: null,
        id: 0,
        is_new_open: null,
        pid: 1,
        remarks: null,
        text: "首页",
        url: "/index"
      };
      this.menuClick(index);
    },
    menuClick(menu) {
      console.log(menu, "menu");
      if (menu.code != "index") {
        menu.closable = true;
      }
      // 先判断该页面是否已经打开，如果打开选中并且切换路由
      let currentMenu = _.find(this.tabs, o => o.id == menu.id);
      // 获取当前路由
      let routeName = this.$route.name;
      if (_.isEmpty(currentMenu)) {
        this.tabs.push(menu);
      }
      //
      // 如果已经打开，直接选中
      if (this.activeTab != _.toString(menu.id)) {
        this.activeTab = _.toString(menu.id);
        if (routeName != menu.code && !_.isEmpty(menu.url)) {
          this.$router.replace(menu.url);
        }
      }
      this.setFullpath(menu);
    },
    tabClick(tabId) {
      let tab = _.find(this.tabs, o => o.id == tabId);
      this.setFullpath(tab);
      if (this.$route.name != tab.code) {
        if (!_.isEmpty(tab.url)) {
          this.$router.replace(tab.url);
        }
      }
    },
    handleTabRemove(tabId) {
      // 删除该tab页
      _.remove(this.tabs, o => o.id == tabId);
      let tab = _.last(this.tabs);
      if (!_.isEmpty(tab.url)) {
        this.$router.replace(tab.url);
      }
    },
    setFullpath(tab) {
      this.fullpath = _.split(tab.fullpath, "/");
    },
    handleDropdownMenu(name) {
      if (name === "changePwd") {
        //修改密码
        this.changePwd();
      } else if (name === "logout") {
        //退出登录
        this.logout();
      }
    },
    logout() {
      this.$Modal.confirm({
        title: "提示",
        content: "您确认退出系统吗？",
        onOk: () => {
          this.axios
            .post("/logout", { token: sessionStorage.getItem("accessToken") })
            .then(res => {
              if (res.data.code == 200) {
                sessionStorage.clear();
                this.$Message.success(res.data.message);
                this.$router.replace("/login");
              } else {
                this.$Message.error(res.data.message);
              }
            });
        }
      });
    },
    changePwd() {
      console.log("修改密码");
    }
  }
};
</script>

<style scoped>
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 104px;
  height: 50px;
  /* background: #5b6270; */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 7px;
  left: 20px;
}
.layout-nav {
  float: right;
}
.ivu-layout {
  height: 100%;
}
</style>