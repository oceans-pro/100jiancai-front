<template>
  <div :class="isMobile?'app-container-mobile':'app-container-desktop'">
    <div style="height: 15px;" />

    <div v-if="isMobile" class="mobile-news-container">
      <div v-for="(item, index) in news" :key="index" class="news-item">
        <div class="date">{{ item.date }}</div>
        <div style="position: relative;">
          <el-image
            :class="{'transparent':selected===item.id}"
            class="image"
            :src="item.img"
            lazy
            fit="cover"
            @mouseenter="enterImg(item.id)"
            @mouseleave="leaveImg()"
            @click="goToDetail(item)"
          >
            <div slot="error">
              <el-image :src="defaultImg" fit="cover" />
            </div>
          </el-image>
          <h3 class="title gradient">{{ item.title }}</h3>
        </div>
        <div class="text-container">
          {{ item.summary }}
        </div>
      </div>
    </div>

    <div v-else class="desktop-news-container">
      <section v-for="(item, index) in news" :key="index" class="news-item">
        <el-image
          :class="{'transparent':selected===item.id}"
          class="image"
          :src="item['img']"
          lazy
          fit="fill"
          @mouseenter="enterImg(item.id)"
          @mouseleave="leaveImg()"
          @click="goToDetail(item)"
        >
          <div slot="error">
            <el-image fit="fill" style="height: 150px;" :src="defaultImg" />
          </div>
        </el-image>

        <div class="text-container">
          <div class="top">
            <el-link type="primary" underline>
              <div><h3 @click="goToDetail(item)">{{ item.title }}</h3></div>
            </el-link>
            <div>{{ item.summary }}</div>
          </div>
          <div class="bottom">
            <span class="date">{{ item.date }}</span>
            <span v-if="item.tags.length>0" class="title">标签：</span>
            <el-tag
              v-for="tag in item.tags"
              :key="tag"
              class="tag"
              type="primary"
              size="mini"
              effect="plain"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

      </section>
    </div>

    <div style="height: 10px" />
    <!-- https://element.eleme.cn/#/zh-CN/component/pagination -->
    <div style="display: flex;justify-content: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        :page-count="3"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
    <div style="height: 40px" />
  </div>
</template>

<script>
  import {getNews} from '@/request/company'

  export default {
    name: 'NewsGallery',
    data() {
      return {
        defaultImg: require('@/assets/news/news.jpg'),
        currentPage: 1,
        pageSize: 5,
        total: 10,
        selected: null,
        news: [],
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.device === 'mobile'
      },
    },
    created() {
      this.fetchData(1)
    },
    methods: {
      fetchData(num) {
        getNews(num, this.pageSize).then(data => {
          data.content.forEach(item => {
            item.tags = item.tags.map(tag => tag.value)
          })
          this.news = data['content']
          this.total = data['totalElements']
        })
      },
      enterImg(id) {
        this.selected = id
      },
      handleCurrentChange(e) {
        this.currentPage = e
        this.fetchData(this.currentPage)
      },
      leaveImg() {
        this.selected = null
      },
      goToDetail(item) {
        if (item.link) {
          window.open(item.link, 'up')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   按照结构
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
  .app-container-mobile {
    background-color: #ededed;
  }

  .app-container-desktop {
    background-color: #ffffff;
    min-height: 1000px;
  }

  /* -- 移动端 */
  .mobile-news-container {
    background-color: #ededed;

    .news-item {
      margin-bottom: 15px;
      background-color: #fff;
      margin-left: 10px;
      margin-right: 10px;
      border-radius: 6px;

      .date {
        height: 35px;
        padding-right: 5px;
        color: #c3c3c3;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      .image {
        height: 160px;
      }

      .title {
        font-size: medium;
        font-family: "黑体";
        font-weight: bold;
        position: absolute;
        bottom: 0px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
        left: 0;
        color: white;
      }

      .text-container {
        font-size: small;
        font-family: "黑体";
        color: #767474;
        padding: 10px;
      }
    }
  }

  /* -- pc端 */
  .desktop-news-container {
    max-width: 800px;
    margin: 0 auto;

    .news-item {
      display: flex;
      justify-content: center;
      margin: 0 auto 30px;

      .image {
        width: 260px;
        height: 150px;
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 20px;
      }

      .image:hover {
        cursor: pointer;
      }

      .text-container {
        display: flex;
        width: 420px;
        flex-grow: 0;
        flex-shrink: 0;
        flex-direction: column;
        justify-content: space-between;

        .date {
          color: #999999;
          padding-right: 20px;
        }

        .title {
          color: #999999;
          font-size: smaller;
        }

        .tag {
          margin-right: 5px;
        }
      }
    }
  }

  /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   根据属性
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
  .transparent {
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    opacity: 0.5;
  }

  .gradient {
    background: #333333;
    background: -webkit-gradient(linear, 0 0, 0 bottom, from(transparent), to(#333333));
    background: -webkit-linear-gradient(transparent, #333333);
    background: -moz-linear-gradient(transparent, #333333);
    background: -ms-linear-gradient(transparent, #333333);
    background: -o-linear-gradient(transparent, #333333);
    background: linear-gradient(transparent, #333333);
  }
</style>
