<template>
  <div class="no-class-container">
    <div v-if="showTop" class="up-footer">
      <div class="left hidden-sm-and-down">
        <a
          rel="nofollow"
          href="/"
        ><img
          :src="require('@/assets/logo_big.png')|slimFilter"
          alt="混凝土搅拌站"
        ></a>
      </div>
      <div class="right">
        <h2>联系我们</h2>
        <div class="contact-content">
          <div class="text">
            <div>电话：{{ contact.telephone }}</div>
            <div>手机：{{ contact.mobilePhone }}</div>
            <div>微信：{{ contact.wechat }}</div>
            <div>Q Q：{{ contact.qq }}</div>
            <div>邮箱：{{ contact.mail }}</div>
            <div>地址：{{ contact.address }}</div>
          </div>
          <div class="qrcode hidden-sm-and-down">
            <img
              :src="require('@/assets/qrcode.jpg')|slimFilter"
              alt="百年建材有限公司的二维码"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-footer ">
      <div class="left">
        <div>版权所有 ©{{ year }} 潍坊百年建材有限公司</div>
        <div>鲁ICP备20015492号-1</div>
      </div>
      <div class="right hidden-sm-and-down">
        <a rel="nofollow" href="/">回到首页</a> |
        <a rel="nofollow" href="https://cdn.100jiancai.cn/html/statement/main.html">法律声明</a> |
        <a rel="nofollow" href="/contact">联系我们</a> |
        <a rel="nofollow" href="https://www.cnblogs.com/oceans/">技术支持</a> |
        <a
          rel="nofollow"
          href="https://web.umeng.com/main.php?c=site&a=frame&siteid=1279140969#!/1596373862723/site/overview/1/1279140969/2020-08-02/2020-08-02"
        >
          网站统计
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {getContact} from '@/request/company'
  import knowDevice from '../mixin/knowDevice'
  import {slim} from '@/utils/qiniu-util'

  export default {
    name: 'Footer',
    filters: {
      slimFilter(url) {
        return slim(url)
      },
    },
    mixins: [knowDevice],
    data() {
      return {
        year: new Date().getFullYear(),
        contact: {
          'address': '',
          'datetime': '',
          'mail': '',
          'mobilePhone': '',
          'qq': '',
          'telephone': '',
          'wechat': '',
        },
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.device === 'mobile'
      },
      showTop() {
        return !this.$route.fullPath.startsWith('/contact')
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getContact().then(data => {
          this.contact = data
          this.$store.commit('company/SET_CONTACT', this.contact)
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .up-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 300px;
    background-color: #333333;
    color: #c6c6c6;
    padding: 20px;

    .left {
      width: 300px;
      display: flex;
      justify-content: center;

      img {
        height: 215px;
      }
    }

    .right {
      width: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 2;

      h2 {
        width: 100%;
        border-bottom: #c6c6c6;
        /*padding-bottom: 10px;*/
        border-bottom-style: ridge;
      }

      .contact-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .qrcode {
          img {
            width: 150px;
          }
        }
      }
    }
  }

  .bottom-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #c6c6c6;
    height: 50px;
    background-color: #0e1113;
    font-size: medium;

    .left {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      div {
        padding: 0 5px;
      }
    }

    .right > a {
      color: #c6c6c6;
      text-decoration: none;
    }
  }

  @media only screen and (max-width: 700px) {
    .up-footer {
    }
  }
</style>
