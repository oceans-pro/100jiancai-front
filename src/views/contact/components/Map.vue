<template>
  <div class="app-container bg-white">
    <el-divider><h2 class="primary-color">公司位置</h2></el-divider>
    <baidu-map
      v-if="isMobile"
      :center="center"
      :zoom="9"
      class="map"
      :style="{width: bodyWidth*0.9+'px',height: bodyWidth*0.8+'px'}"
      :scroll-wheel-zoom="true"
    >
      <!-- 红点 -->
      <bm-marker :position="{lng: 119.138409, lat: 37.070758}" :dragging="true" />
      <bm-info-window
        :position="{lng: 119.138409, lat: 37.090758}"
        :show="infoWindow1.show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
      >
        <p v-html="infoWindow1.contents" />
      </bm-info-window>
    </baidu-map>


    <baidu-map
      v-else
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      class="map map-desktop"
    >
      <!-- 比例尺 -->
      <bm-scale v-if="!isMobile" anchor="BMAP_ANCHOR_TOP_RIGHT" />
      <!-- 缩放 -->
      <bm-navigation v-if="!isMobile" anchor="BMAP_ANCHOR_TOP_RIGHT" />
      <!-- 地图类型 -->
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      />
      <!-- 缩略图 -->
      <bm-overview-map
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :is-open="true"
      />
      <!-- 红点 -->
      <bm-marker
        :position="{lng: 119.138409, lat: 37.070758}"
        :dragging="true"
      />
      <!-- 信息窗格 -->
      <bm-info-window
        v-if="!isMobile"
        :position="{lng: 119.138409, lat: 37.090758}"
        title="潍坊百年建材有限公司"
        :show="infoWindow.show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
      >
        <p v-html="infoWindow.contents" />
      </bm-info-window>
      <!-- 重置控件 -->
      <bm-control
        v-if="!isMobile"
        anchor="BMAP_ANCHOR_TOP_LEFT"
        :offset="{width:100,height:8}"
      >
        <button @click="addZoom(14)">
          缩放至最大
        </button>
        <button @click="addZoom(10.5)">
          还原
        </button>
        <button @click="addZoom(6)">
          缩放至最小
        </button>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
  export default {
    name: 'Map',
    data() {
      return {
        center: {lng: 119.138409, lat: 37.070758},
        zoom: 10.5,
        infoWindow: {
          show: true,
          contents: '<div>地址：山东省潍坊市寒亭区滨海经济开发区</div>' +
            '<div>坐标：(119.138409, 37.070758)</div>',
        },
        infoWindow1: {
          show: true,
          contents: '<div>山东省潍坊市寒亭区滨海经济开发区</div>',
        },
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.device === 'mobile'
      },
      bodyWidth() {
        return this.$store.getters.bodyWidth
      },
    },
    methods: {
      infoWindowClose() {
        this.infoWindow.show = false
      },
      infoWindowOpen() {
        if (this.isMobile) {
          this.infoWindow1.show = true
        } else {
          this.infoWindow.show = true
        }
      },
      clear() {
        this.infoWindow.contents = ''
      },
      addZoom(level) {
        this.zoom = level
      },
    },
  }
</script>
<style lang="scss" scoped>


  .container {
    h1 {
      line-height: 3;
    }
  }

  .map {
    margin: 0 auto;
  }

  .map-desktop {
    width: 800px;
    height: 450px;
  }
</style>
