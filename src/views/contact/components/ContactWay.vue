<template>
  <div class="app-container bg-white">
    <el-divider><h2 class="primary-color">联系方式</h2></el-divider>

    <div class="contact-container">
      <div class="content">
        <p><span>电话</span>： <span>{{ contact.telephone }}</span></p>
        <p><span>手机</span>： <span>{{ contact.mobilePhone }}</span></p>
        <p><span>QQ</span>： <span>{{ contact.qq }}</span></p>
        <p><span>邮箱</span>： <span>{{ contact.mail }}</span></p>
      </div>
      <div v-if="!isMobile" class="wechat">
        <el-image style="width: 300px" :src="require('@/assets/qrcode_green.png')|slimFilter" alt="二维码" />
      </div>
    </div>


    <div v-if="isMobile" class="mobile-image">
      <div style="height: 10px;" />
      <el-image :src="require('@/assets/qrcode_green.png')|slimFilter" alt="二维码" />
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {slim} from '@/utils/qiniu-util'

  export default {
    name: 'ContactWay',
    filters: {
      slimFilter(url) {
        return slim(url)
      },
    },
    data() {
      return {}
    },
    computed: {
      isMobile() {
        return this.$store.getters.device === 'mobile'
      },
      bodyWidth() {
        return this.$store.getters.bodyWidth
      },
      ...mapGetters(['contact']),
    },
  }
</script>

<style lang="scss" scoped>
  .contact-container {
    margin: 0 auto;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .content {
      p {
        margin-top: 0;
        margin-bottom: 0;
        line-height: 1.5;

        span:first-child {
          display: inline-block;
          font-weight: bold;
          width: 2em;
        }
      }
    }
  }
</style>
