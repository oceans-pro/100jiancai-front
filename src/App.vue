<template>
  <div>
    <Header />
    <div class="body-container">
      <div class="main-content">
        <router-view />
      </div>
    </div>
    <Footer v-if="$route.fullPath!=='/404'" />
  </div>
</template>
<script>

  import Header from './layout/header/Header'
  import Footer from './layout/footer/Footer'
  import {logVisitor} from '@/request/log'

  export default {
    components: {Footer, Header},
    created() {
      setTimeout(_ => {
        let device
        if (this.$store.getters.device === 'desktop') {
          device = 0
        } else {
          device = 1
        }
        logVisitor(1, device, document.referrer)
      }, 1500)
    },
  }

</script>
<style lang="scss">

  .body-container {
    background-image: url("assets/bg.jpg");

    .main-content {
      max-width: 992px;
      margin: 0 auto;
    }
  }

</style>
