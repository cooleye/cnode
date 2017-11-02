<template lang="html">
    <div class="container">
      <mheader title="登录"  showicon="false"/>
      <div class="main">
          <div class="">
            <input type="text" name="" v-model="token">
          </div>
          <div class="">
            <MButton title="登录" @mclick="login" mstyle="margin-top:10px;"/>
          </div>

      </div>
    </div>
</template>

<script>

import Header from '../../components/Header';
import MButton from '../../components/Button';

export default {
  components:{
    mheader: Header,MButton
  },
  data() {
    return {
      token:''
    }
  },
  methods:{

    login() {
      if(this.token != '' && this.token != undefined){
        this.$store.dispatch('login',this.token)

        .then( (res) => {
            console.log(res)
            if(res.data.success === true){
                this.$store.dispatch('saveuser',res.data)
                this.$router.push('/mine')
            }
        })
        .catch( (err) =>{
            console.log('error:',err)
        })
      }

    }
  }
}
</script>

<style lang="css" scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: -14px;
  background-color: #fff;
  flex: 1;
  justify-content: center;
}
.main{
  display: flex;
  flex:1;
  flex-direction: column;
}
.main input{
  width: 9rem;
  height: 45px;
  border: solid 1px #ccc;
  outline: none;
  border-radius: 5px;
  padding-left: 15px;
}
</style>
