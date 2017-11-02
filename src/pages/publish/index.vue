<template lang="html">
  <div class="container">
      <mheader title="发表" showicon="true" @click="publish"/>
      <div class="content">
        <form class="" action="index.html" method="post">
            <div class="title">
                <input type="text"  placeholder="标题" name="" v-model="title">
            </div>
            <div class="select">
                <select name="tab" v-model="tab">
                    <option value="请选择">请选择</option>
                    <option value="ask">分享</option>
                    <option value="share">问答</option>
                    <option value="job">招聘</option>
                    <option value="dev">测试</option>
                </select>
            </div>
            <div class="con">
              <textarea name="name" placeholder="内容"  v-model="con"></textarea>
            </div>
        </form>

      </div>
  </div>
</template>

<script>
import Header from '../../components/Header';
export default {
  data() {
    return{
      title:'',
      tab:'',
      con:''
    }
  },
  components:{
    mheader: Header
  },
  methods:{
    publish() {
      var title = this.title;
      var tab = this.tab;
      var con = this.con;
      if(title != '' && tab !='请选择' && con != ''){
        this.$store.dispatch('topics',{
          title: title,
          tab: tab,
          content: con
        })
        .then( (res) => {
            console.log(res)
        })
        .catch( (res) => {
          console.log(res)
        })
      }

    }
  }
}
</script>

<style lang="css">
.container{
  width: 100%;
  height: 100%;
}
.content{
  margin-top: -14px;
  width: 100%;
  height: 100%;
}
form{
  width: 100%;height: 100%;
}
.title{
  width: 100%;
  height: 45px;
}
.title input{
  width: 100%;
  background: #fff;
  height: 45px;
  outline: none;
  appearance:none;
  border: none;
  padding-left: 5px;
  font-size: 14px;
}
.select{
  width: 100%;
  height: 45px;
  margin-top: 1px;
  background-color: #fff;
}
.select select{
  width: 100%;
  height: 45px;
  border: none;
  outline: none;
  appearance:none;
  border-radius: none;
  background: none;
  padding: 5px;
  font-size: 14px;
}
.con{
  height: 100%;
  margin-top: 1px;
  display: flex;
  background-color: #f00;
}
.con textarea{
  flex: 1;
  max-width: 10rem;
  min-width: 10rem;
  padding: 5px;
  outline: none;
  appearance:none;
  border: none;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
