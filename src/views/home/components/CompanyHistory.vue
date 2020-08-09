<template>
  <div class="container bg-white">
    <!-- 锚点 -->
    <span name="history" />
    <!-- 步骤条 -->
    <step-box
      num="03"
      chinese="发展历程"
      english="HISTORY"
      :trigger-height="isMobile?1800:1300"
    />
    <!-- 时间轴 -->
    <div class="timeline">
      <light-timeline :items="history" />
    </div>
  </div>
</template>

<script>
  import StepBox from '../../../components/StepBox/StepBox'
  import {getHistory} from '@/request/company'

  export default {
    name: 'History',
    components: {StepBox},
    data() {
      return {
        history: [
          {
            tag: '2009年2月',
            color: 'yellow',
            content: '潍坊百年建材有限公司正式成立',
          },
          {
            tag: '2009年2月',
            color: 'yellow',
            content: '潍坊百年建材有限公司正式成立',
          },
        ],
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.device === 'mobile'
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getHistory().then(data => {
          // 对data进行增强，用于展示
          data.forEach(item => {
            item.content = item.description
            item.tag = item.date.substring(0, 7)
          })
          this.history = data
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 30px;
    padding-bottom: 50px;
    padding-top: 50px;
  }

  .timeline {
    padding: 15px;
    display: flex;
    justify-content: center;
  }
</style>
