<template>
  <div>
    <div style="height: 80px;" />

    <div class="header">
      <!--********************************************* 左边logo区域 ***********************************************-->
      <div class="logo-zone">
        <a href="/" class="hidden-xs-only">
          <img :src="require('./logo.png')|slimFilter" alt="混凝土搅拌站">
        </a>
        <a rel="nofollow" href="/" class="hidden-sm-and-up">
          <img
            style="width: 57px;height:54px;margin-top: 10px;"
            :src="require('./logo_mobile.png')|slimFilter"
            alt="混凝土搅拌站"
          >
        </a>
        <div class="slogan hidden-sm-only">
          <div>混凝土解决方案提供商</div>
          <el-divider class="line" />
          <div>海纳百川 | 浇筑辉煌</div>
        </div>
      </div>
      <!--********************************************* 右边导航栏区 ***********************************************-->
      <el-menu
        :default-active="activeIndex"
        class="nav-zone hidden-xs-only"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="/">
          网站首页
        </el-menu-item>
        <el-menu-item index="/product">
          产品展示
        </el-menu-item>
        <el-menu-item index="/hire">
          广纳英才
        </el-menu-item>
        <el-menu-item index="/news">
          企业新闻
        </el-menu-item>
        <el-menu-item index="/contact">
          联系我们
        </el-menu-item>
      </el-menu>
      <!--********************************************* 按钮 ***********************************************-->
      <el-button style="margin-right: 10px;" class="hidden-sm-and-up" @click="handleClickMobileMenu">
        <i class="el-icon-s-operation icon" />
      </el-button>
    </div>
    <!--********************************************* 移动端的导航栏 ***********************************************-->
    <el-collapse-transition>
      <div v-show="showMobileMenu" class="mobile-menu hidden-sm-and-up">
        <el-menu
          :default-active="activeIndex"
          @select="handleSelectMobile"
        >
          <el-menu-item index="/">
            <template slot="title">
              <svg-icon icon-class="home" />
              <span>网站首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/product">
            <template slot="title">
              <svg-icon icon-class="product" />
              <span>产品展示</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/hire">
            <template slot="title">
              <svg-icon icon-class="hire" />
              <span>广纳英才</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/news">
            <template slot="title">
              <svg-icon icon-class="news" />
              <span>企业新闻</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/contact">
            <template slot="title">
              <svg-icon icon-class="contact" />
              <span>联系我们</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
  // -- 动画
  import 'element-ui/lib/theme-chalk/display.css'
  import '@/assets/css/animate.min.css'
  // -- 过渡
  // collapse 展开折叠
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import Vue from 'vue'
  import {slim} from '@/utils/qiniu-util'

  Vue.component(CollapseTransition.name, CollapseTransition)
  export default {
    name: 'Header',
    filters: {
      slimFilter(url) {
        return slim(url)
      },
    },
    data() {
      return {
        activeIndex: '/',
        drawer: false,
        showMobileMenu: false,
      }
    },
    watch: {
      // eslint-disable-next-line no-unused-vars
      $route(to, from) {
        this.activeIndex = this.$route.path
      },
    },
    methods: {
      handleSelect(key) {
        this.$router.push(key).catch(() => {
        })
      },
      handleSelectMobile(key) {
        this.showMobileMenu = !this.showMobileMenu
        this.$router.push(key).catch(() => {
        })
      },
      handleClickMobileMenu() {
        this.showMobileMenu = !this.showMobileMenu
      },
    },
  }
</script>
<style lang="scss" scoped>
  $--color-primary: #043D87;
  .header {
    position: fixed;
    z-index: 999 !important;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 10px 1px #999;
  }

  .logo-zone {
    display: flex;
    justify-content: space-around;
    align-content: center;

    height: 80px;
    padding-left: 20px;

    img {
      height: 80px;
    }

    .line {
      margin: 2px;
    }

    .slogan {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 150px;
      text-align: center;
      font-size: small;
    }
  }

  .nav-zone {
    border: none !important; // 覆盖elementUI的默认配置
    width: 500px !important;
    padding-right: 12px;

    .el-menu {

      .el-menu-item {
        font-size: medium;
      }

      .is-active {
        font-weight: bold;
      }
    }
  }

  .tool-bar {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;

    .el-col {
      .el-button {
        background-color: #043d87;
      }

      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      height: 60px;
    }

    i {
      font-size: 35px;
    }
  }

  .icon {
    font-size: 24px;
    color: $--color-primary;
  }

  .mobile-menu {
    position: fixed;
    z-index: 10;
    right: 0;
    top: 81px;
    box-shadow: 0 0 10px 0px #999;

    .el-menu-item {
      display: flex;
      align-items: center;

      svg {
        font-size: 15px;
      }

      span {
        padding-left: 5px;
      }
    }
  }
</style>
