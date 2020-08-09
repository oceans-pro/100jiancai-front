<template>
  <div class="box">
    <div class="up-line" />
    <div class="content">
      <div class="num" :class="numBindingClass">{{ num }}</div>
      <div class="words" :class="wordsBindingClass">
        <div class="chinese">{{ chinese }}</div>
        <div class="english">{{ english }}</div>
      </div>
    </div>
    <div class="down-line" />
  </div>
</template>
<script>
  import '../../assets/css/animate.min.css'

  export default {
    name: 'StepBox',
    props: {
      num: {
        type: String,
        default: '01',
      },
      chinese: {
        type: String,
        default: '公司简介',
      },
      english: {
        type: String,
        default: 'COMPANY INFO',
      },
      triggerHeight: {
        type: Number,
        default: 200,
      },
    },
    data() {
      return {
        numBindingClass: '',
        wordsBindingClass: '',
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        // 获取滚动时的高度
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop < this.triggerHeight + 200 && scrollTop > this.triggerHeight - 200) {
          this.numBindingClass = 'animated bounceInLeft'
          this.wordsBindingClass = 'animated bounceInUp'
        } else {
          this.numBindingClass = ''
          this.wordsBindingClass = ''
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .bounceInLeft {
    display: inline-block;
    animation: bounceInLeft; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 0.9s; /* don't forget to set a duration! */
  }

  .box {
    width: 250px;
    margin: 20px auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .content {
      display: flex;
      justify-content: center;

      .num {
        color: #043d87;
        font-size: 60px;
        padding-right: 5px;
      }

      .words {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .english {
          color: #999999;
        }

        .chinese {
          font-size: 30px;
          font-weight: bold;
        }
      }
    }
  }

  .up-line, .down-line {
    width: 150px;
    height: 10px;
    border: 3px solid black;
  }

  .up-line {
    border-bottom: none;
  }

  .down-line {
    border-top: none;
  }

</style>
