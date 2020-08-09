<template>
  <div>
    <contact-way />
    <Map />
    <leave-a-message ref="msg" />
  </div>
</template>

<script>
  import Map from './components/Map'
  import ContactWay from './components/ContactWay'
  import LeaveAMessage from './components/LeaveAMessage'

  export default {
    name: 'Contact',
    components: {LeaveAMessage, ContactWay, Map},
    mounted() {
      // 不同浏览器不同 https://www.cnblogs.com/boyuguoblog/p/7744747.html
      // setInterval(_ => {
      //   console.log(window.pageYOffset)
      //   console.log(document.documentElement.scrollTop)
      //   console.log(document.body.scrollTop)
      // }, 1000)
      if (this.$route.query.from === 'hire') {
        this.doScroll()
      }
    },
    methods: {
      /**
       * 总结：获取时采用三选一，设置时采用document.documentElement.scrollTop
       */
      doScroll() {
        const scrollTop = this.$refs.msg.$el['offsetTop'] + 1000
        if (window.pageYOffset) { // 这个是标准
          document.documentElement.scrollTop = scrollTop
          document.body.scrollTop = scrollTop
          window.pageYOffset = scrollTop
        } else if (document.documentElement.scrollTop) {
          document.documentElement.scrollTop = scrollTop
          document.body.scrollTop = scrollTop
          window.pageYOffset = scrollTop
        } else if (document.body.scrollTop) {
          document.documentElement.scrollTop = scrollTop
          document.body.scrollTop = scrollTop
          window.pageYOffset = scrollTop
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
</style>
