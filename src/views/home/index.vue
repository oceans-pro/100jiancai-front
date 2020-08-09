<template>
  <div>
    <Swiper />
    <company-info />
    <advantage />
    <history />
  </div>
</template>
<script>
  import Swiper from './components/Swiper'
  import CompanyInfo from './components/CompanyIntroduction'
  import Advantage from './components/Advantage'
  import History from './components/CompanyHistory'

  export default {
    name: 'Home',
    components: {History, Advantage, CompanyInfo, Swiper},
  }
</script>
