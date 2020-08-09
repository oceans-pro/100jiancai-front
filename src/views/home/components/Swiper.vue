<template>
  <div>
    <!-- desktop-->
    <el-carousel
      v-if="$store.getters.device==='desktop'"
      :interval="5000"
      arrow="always"
      height="310px"
    >
      <el-carousel-item
        v-for="banner in banners"
        :key="banner.url"
      >
        <el-image
          style="width: 100%;height: 100%;"
          fit="fill"
          class="image"
          :src="banner.url | slimFilter"
        />
      </el-carousel-item>
    </el-carousel>

    <!-- mobile -->
    <el-carousel
      v-if="$store.getters.device==='mobile'"
      class="bg-white"
      :interval="5000"
      arrow="always"
      height="200px"
    >
      <el-carousel-item
        v-for="banner in banners"
        :key="banner.url"
      >
        <el-image
          class="image"
          :src="banner.url | slimFilter"
          fit="cover"
          style="height: 200px;"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import {getAllSwiper} from '@/request/company'
  import {slim} from '@/utils/qiniu-util'

  export default {
    name: 'Swiper',
    filters: {
      slimFilter(url) {
        return slim(url)
      },
    },
    data() {
      return {
        banners: null,
      }
    },
    created() {
      this.fetchData()
      this.screenWidth = document.body.clientWidth
      if (this.screenWidth > 10) {
        // eslint-disable-next-line no-empty
      }
    },
    methods: {
      fetchData() {
        getAllSwiper()
          .then(data => {
            this.banners = data
          })
          .catch(_ => {
            console.log('=> 轮播图加载失败，采用备选图片')
            this.banners = [
              {url: require('@/assets/home/banner1.jpg')},
              {url: require('@/assets/home/banner2.jpg')},
              {url: require('@/assets/home/banner3.jpg')},
            ]
          })
      },
    },
  }
</script>

<style lang="scss" scoped>

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  /*.el-carousel__container {*/
  /*  height: 220px !important;*/
  /*}*/
</style>
