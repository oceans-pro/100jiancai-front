<template>
  <div class="body bg-white">
    <!--********************************************* 步骤条 ***********************************************-->
    <step-box
      num="01"
      chinese="企业简介"
      english="INTRODUCTION"
      :trigger-height="isMobile?300:300"
    />
    <!--********************************************* 主体内容 ***********************************************-->
    <div v-if="$store.getters.device==='desktop'">
      <el-image class="company-image" :src="require('@/assets/home/company.png')|slimFilter" alt="公司照片" />
      <div v-html="html" />
    </div>
    <div v-if="$store.getters.device==='mobile'">
      <div v-html="html" />
      <el-image :src="require('@/assets/home/company.png')|slimFilter" />
    </div>
  </div>
</template>
<script>

  import StepBox from '@/components/StepBox/StepBox'
  import {getIntroduction} from '@/request/company'
  import {slim} from '@/utils/qiniu-util'

  export default {
    name: 'CompanyInfo',
    components: {StepBox},
    filters: {
      slimFilter(url) {
        return slim(url)
      },
    },
    data() {
      return {
        html: '',
        text: '',
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
        getIntroduction()
          .then(data => {
            this.html = data.html
          })
          .catch(_ => {
            this.html = `潍坊百年建材有限公司成立于2009年2月，拥有预拌商品混凝土专业承包资质，可生产各强度等级混凝土及特种混凝土，以及绿色高性能混凝土。
公司地址位于央子街道海丰路与海润街交叉口西200米路北，拥有180m3/h全封闭环保型搅拌站2座，中联56米汽车泵一台，中联48米汽车泵一台，混凝土运输车20辆，公司年生产商品混凝土能力达到100万m3以上，可完成产值2.5亿元，利税2500万元。
公司是集生产、销售一体的商品混凝土生产经济实体，公司建立一套完整的质量体系，从原材料的进厂到商砼的生产及商砼的售后服务，层层严格把关，保证产品的卓越品质。公司建有标准化商砼试验检测中心，检测设备齐全，能够满足混凝土及原材料检测与检验。
公司产品能够实现滨海区全覆盖，辐射寒亭，昌邑，寿光等周边县市区。公司综合实力和生产规模以及环保建设等各项指标均居于滨海区同行业领先水平。`
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .body {
    padding: 35px;
    margin: 0 auto;
    background-color: #fff;
    min-height: 400px;

    .company-image {
      width: 400px;
      float: left;
      padding-right: 30px;
    }

    .text {
      line-height: 1.5;
    }
  }

  p {
    background-color: red;
  }
</style>
