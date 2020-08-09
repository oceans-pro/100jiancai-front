<template>
  <div class="body bg-white">
    <step-box
      num="02"
      chinese="我们的优势"
      english="ADVANTAGES"
      :trigger-height="isMobile?1000:800"
    />


    <div v-if="$store.getters.device==='desktop'">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in advantages" :key="index" :span="6" class="advantage-item">
          <el-image
            :src="item.src|slimFilter"
            :class="bindingClass[index]"
            class="image"
            @mouseenter="handleEnter(index)"
            @mouseleave="handleLeave(index)"
          />
          <h2>{{ item.title }}</h2>
          <div class="content">
            {{ item.content }}
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-if="$store.getters.device==='mobile'">
      <div>
        <el-row :gutter="10">
          <el-col v-for="(item, index) in advantages.slice(0,2)" :key="index" :span="12" class="advantage-item">
            <el-image
              :src="item.src|slimFilter"
              :class="bindingClass[index]"
              class="image"
              @mouseenter="handleEnter(index)"
              @mouseleave="handleLeave(index)"
            />
            <h2>{{ item.title }}</h2>
            <div class="content">
              {{ item.content }}
            </div>
          </el-col>
        </el-row>
      </div>

      <div>
        <el-row :gutter="10">
          <!-- 下面是复制的，暂时没有找到优雅的方法来解决复制的问题-->
          <el-col v-for="(item, index) in advantages.slice(2,4)" :key="index" :span="12" class="advantage-item">
            <el-image
              :src="item.src"
              :class="bindingClass[index]"
              class="image"
              @mouseenter="handleEnter(index)"
              @mouseleave="handleLeave(index)"
            />
            <h2>{{ item.title }}</h2>
            <div class="content">
              {{ item.content }}
            </div>
          </el-col>
        </el-row>
      </div>

    </div>

  </div>
</template>
<script>
  import '@/assets/css/animate.min.css'
  import StepBox from '@/components/StepBox/StepBox.vue'
  import {getAdvantage} from '@/request/company'
  import {slim} from '@/utils/qiniu-util'

  export default {
    name: 'Advantage',
    components: {StepBox},
    filters: {
      slimFilter(url) {
        return slim(url)
      },
    },
    data() {
      return {
        bindingClass: ['', '', '', ''],
        advantages: [ // 备选数据
          {
            src: require('@/assets/home/icon/advantage_1.png'),
            title: '经验优势',
            content: '地产集团已经相继开发过普通住宅、高端住宅、公寓、商业、综合体等各类物业超过100万平米，具备丰富的开发、施工、营销和运营经验',
          },
          {
            src: require('@/assets/home/icon/advantage_2.png'),
            title: '品牌优势',
            content: '地产集团已经相继开发过普通住宅、高端住宅、公寓、商业、综合体等各类物业超过100万平米，具备丰富的开发、施工、营销和运营经验',
          },
          {
            src: require('@/assets/home/icon/advantage_3.png'),
            title: '人才优势',
            content: '经过多年发展，公司技术力量雄厚，有职称人员15人，其中高级工程师3人；中级职称7人，初级职称5人。集团在组织架构、管理体系方面日趋市场化、标准化，人员体系合理，运营体系日趋成熟',
          },
          {
            src: require('@/assets/home/icon/advantage_4.png'),
            title: '风险防控',
            content: '地产集团管理体系完善，各部门间沟通频繁，发现问题能够及时处理，风险控制能力强',
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
        getAdvantage().then(data => {
          for (let i = 0; i < 4; i++) {
            this.advantages[i].title = data[i].title
            this.advantages[i].content = data[i].content
          }
        })
      },
      handleEnter(index) {
        console.log(index)
        this.$set(this.bindingClass, index, 'animated bounce')
      },
      handleLeave(index) {
        this.$set(this.bindingClass, index, '')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .body {
    margin-top: 30px;
    padding: 35px;

    .advantage-item {
      margin-top: 20px;
      text-align: center; // 图片文字居中
      .image {
        width: 80px;
        height: 80px;
        margin: 0 auto;
      }

      h2 {
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .content {
        // text-align-last:justify;
        text-align: justify;
        text-justify: distribute-all-lines; // 这行必加，兼容baiie浏览器
      }
    }
  }
</style>
