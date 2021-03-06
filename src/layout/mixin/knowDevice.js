import store from '@/store'

const {body} = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.commit('app/TOGGLE_DEVICE', 'mobile')
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const bodyWidth = body.getBoundingClientRect().width
      store.commit('app/SET_BODY_WIDTH', bodyWidth)
      return bodyWidth - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.commit('app/TOGGLE_DEVICE', isMobile ? 'mobile' : 'desktop')
      }
    },
  },
}
