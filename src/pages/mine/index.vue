<template lang="html">
  <div class="container">

    <mheader title="个人中心" showicon="false"/>
    <div class="banner">
        <div class="banner-bg">
        </div>
    </div>
    <div class="avatar" @click="loginfunc">
        <img :src="user.avatar_url" alt="">
        <h3 >{{user.loginname}}</h3>
    </div>

    <ListItem name="发表主题" icon-name="icon-publish" arrow="true" mstyle="color:red;font-size:16px;" linkTo="/publish"/>
    <ListItem name="我的消息" icon-name="icon-message2" arrow="true" mstyle="color:green;font-size:16px;" linkTo="/message"/>
  </div>
</template>

<script>
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';

export default {
  components:{
    mheader: Header,ListItem
  },
  data(){
    return {
      user:{
        avatar_url:'../../static/moren.jpg',
        loginname:'您还未登录，请先登录'
      },
      login:false
    }
  },
  mounted(){

    var user = this.$store.getters.user;
    if(user.success === true){
        this.login = true;
        this.user = user;
    }
  },
  methods:{
    loginfunc() {
      if(!this.login){
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="css" scoped>

.container{
  margin-top: 0px;
  width: 100%;
  margin-top: -14px;
}
.banner{
  width: 100%;
  height: 4rem;
  overflow: hidden;
  position: relative;
}
.banner .banner-bg{
  width: 100%;
  height: 100%;
  background: url('../../assets/timg.jpeg') no-repeat;
  background-size: 100% 100%;

   -webkit-filter: blur(5px);
      -moz-filter: blur(5px);
       -ms-filter: blur(5px);
           filter: blur(5px);
}
.avatar{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 3rem;
  position: relative;
  font-size: 14px;
}
.avatar img{
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  position: absolute;
  top: -2rem;
}
</style>
