<template>
  <div class="app-container bg-white">

    <el-divider><h2 class="primary-color">在线留言</h2></el-divider>

    <div class="form-container">
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">

        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" type="textarea" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">
            <svg-icon icon-class="submit" />
            <span class="padding-left">发送</span>
          </el-button>
          <el-button type="primary" @click="clear">
            <svg-icon icon-class="clear" />
            <span class="padding-left">重置</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  import {postMessage} from '@/request/company'
  import {Loading} from 'element-ui'

  const checkText = (rule, value, callback) => {
    // eslint-disable-next-line no-misleading-character-class
    const pattern = new RegExp('[▪•‥△▽○◇□☆▷◁♤♡♢♧▲▼●◆■★▶◀♠♥♦♣☼♀☺◐☑✔☜☝☞㏂☀☾♂☹◑☒×✘☚☟㏘…▁▂▃▄▅▆▇█' +
      '∷※░▒▓▏▎▍▌▋▊▉♩♭☌♈♪♫♬§〼◎۞℗®♯♮‖¶卍卐▬℡™㏇☍☋☊㉿◪◪◔◕@㈱№♉♊♋♌♏♐♑♓♒♍↖↑↗▨▤▧◤㊤◥' +
      '☴☲☷←㊣→▩▦▥㊧㊥㊨☳☯☱↙↓↘▫◈▣◣㊦◢☶☵☰↕↔⊱⋛⋌⋚⊰¬￢▔†‡*＊✲❈✿✿❀❃❁☸✖✚✪❤ღ❦❧ி₪✎✍✌✁✄☏' +
      '✉⊹➷☡☈☇♨☄☃☂☁☎ஐ☩➹〄☮☪❂☭☠☣✈〠۩✙✟☥☦☧☨☫☬♔♚♛♗♝♘♞♖♜♙♟]')
    if (pattern.test(value)) {
      callback(new Error('有非法字符'))
    } else {
      callback()
    }
  }

  export default {
    name: 'LeaveAMessage',
    data() {
      return {
        form: {
          title: '',
          content: '',
        },
        rules: {
          title: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'},
            {validator: checkText, trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请填写留言内容', trigger: 'blur'},
            {validator: checkText, trigger: 'blur'},
          ],
        },
        loadingInstance: {},
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.startLoading()
            postMessage(this.form)
              .then(data => {
                this.stopLoading()
                this.$message({
                  message: '感谢您的建议',
                  type: 'success',
                })
                this.form = {}
              })
              .catch(e => {
                this.stopLoading()
                this.$message({
                  message: '发送失败，请重试',
                  type: 'error',
                })
                console.log('debug: ' + e)
              })
          } else {
            return false
          }
        })
      },
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                       样式相关
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      clear() {
        this.form = {}
        this.$refs['form'].resetFields()
      },
      startLoading() {
        this.loadingInstance = Loading.service({fullscreen: true})
      },
      stopLoading() {
        this.loadingInstance.close()
      },
    },
  }
</script>

<style scoped lang="scss">
  .form-container {
    margin: 0 auto;
    max-width: 800px; // = map.width
  }

  /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   按照类型
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
  .padding-left {
    padding-left: 10px;
  }
</style>
