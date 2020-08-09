<template>
  <div class="container">
    <div style="height: 10px;" />
    <!-- mobile -->
    <section v-if="isMobile">
      <div v-for="index in 2" :key="index">
        <el-divider>
          <h2 class="primary-color">
            <svg-icon icon-class="left" />
            {{ index ===1?'客户案例':'厂房设备' }}
            <svg-icon icon-class="right" />
          </h2>
        </el-divider>
        <el-row>
          <el-col v-for="(item, i) in (index===1?list1:list2)" :key="i" :span="24">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <el-image class="image" :src="item.url" lazy :title="item.url">
                <div slot="placeholder" :class="isMobile?'placeholder-mobile': 'placeholder-pc'">
                  <loading style="text-align: center" />
                </div>
                <div slot="error" class="error">
                  <el-image :src="require('@/assets/404-image.jpg')" class="error-image" />
                </div>
              </el-image>
              <h4>{{ item.title }}</h4>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>
    <!-- pc -->
    <section v-if="!isMobile">
      <div v-for="index in 2" :key="index">
        <el-divider>
          <h2 class="primary-color">
            <svg-icon icon-class="left" />
            {{ index ===1?'客户案例':'厂房设备' }}
            <svg-icon icon-class="right" />
          </h2>
        </el-divider>
        <vue-waterfall-easy
          src-key="url"
          :imgs-arr="(index===1?list1:list2)"
          :gap="30"
          :loading-dot-count="0"
          :max-cols="3"
          :img-width="300"
          :height="800"
        >
          <div slot-scope="props">
            <div ref="ooo" style="text-align: center;padding: 10px;">{{ props.value.title }}</div>
          </div>
        </vue-waterfall-easy>
        <div style="height: 10px;" />
      </div>
    </section>
    <div style="height: 10px;" />
  </div>
</template>
<script>
  import {getProduct} from '@/request/company'
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import Loading from '@/components/Loading/index'
  import {narrowAndSlim, slim} from '@/utils/qiniu-util'

  export default {
    name: 'Gallery',
    components: {Loading, vueWaterfallEasy},
    data() {
      return {
        loading: true,
        list1: [],
        list2: [],
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
        getProduct(1).then(data => {
          this.list1 = data.map(item => {
            // 考虑到手机端有懒加载，而电脑端没有
            item.url = narrowAndSlim(item.url)
            return item
          })
        })
        getProduct(2).then(data => {
          this.list2 = data.map(item => {
            item.url = narrowAndSlim(item.url)
            return item
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>

  .container {
    .el-card {
      margin-bottom: 30px;
      text-align: center;

      .image {
        width: 100%;

        .placeholder-pc {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 400px;
        }

        .placeholder-mobile {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 186px;
        }

        .error-image {
          width: 100%;
        }
      }

      h4 {
        margin: 0 auto;
        padding: 5px;
      }
    }
  }
</style>
