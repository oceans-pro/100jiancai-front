<template>
  <div class="app-container">

    <div style="padding-top: 10px;padding-bottom: 20px;">
      人力资源是第一资源，人才工程是我司的第一工程。公司坚持“五湖四海、海纳百川，人尽其才、才尽其用”的人才理念，面向社会和高等院校招贤纳士，从人才规划、岗位晋升、绩效激励等方面建立了完备的人力资源管理体系，营造了独具特色的创新生态。
    </div>
    <el-divider><h2 class="primary-color">招聘需求</h2></el-divider>
    <div v-if="!isMobile">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="jobName" label="职位名称" width="140" />
        <el-table-column prop="content" label="招聘要求" />
        <el-table-column prop="count" label="招聘人数" width="100" />
        <el-table-column prop="date" label="发布日期" width="120" />
      </el-table>
    </div>
    <div v-if="isMobile" class="mobile-table">
      <div v-for="(item ,index) in tableData" :key="index">
        <el-card>
          <el-row>
            <el-col :span="8">职位名称：</el-col>
            <el-col :span="16">{{ item['jobName'] }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">招聘要求：</el-col>
            <el-col :span="16">{{ item.content }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">招聘人数：</el-col>
            <el-col :span="16">{{ item.count }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">发布日期：</el-col>
            <el-col :span="16">{{ item.date }}</el-col>
          </el-row>
        </el-card>
        <div style="height: 10px;" />
      </div>
    </div>

    <div style="height: 10px" />
    <el-alert v-if="tableData.length===0" :closable="false">暂无招聘需求~敬请持续关注~</el-alert>
    <div v-else class="bottom">
      <el-link href="/#/contact?from=hire" underline="underline" type="primary" target="_self">点我快速进行留言</el-link>
    </div>

  </div>
</template>

<script>
  import {getHire, getHireConfig} from '@/request/company'

  export default {
    name: 'HireTable',
    data() {
      return {
        tableData: [],
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
        getHireConfig().then(data => {
          if (data === 1) {
            getHire().then(data => {
              this.tableData = data
            })
          } else if (data === 0) {
            this.tableData = []
          }
        })
      },
    }
    ,
  }
</script>

<style lang="scss" scoped>
  .mobile-table {
    line-height: 2;
  }

  .no-data {
    text-align: center;

    .image {
      width: 300px;
      height: 300px;
    }
  }

  .bottom {
    padding-top: 20px;
  }
</style>
