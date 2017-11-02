<template lang="html">
  <div class="container">
      <div class="tab">
        <router-link to="/?tab=all" @click="routeTo('all')">全部</router-link>
        <router-link to="/?tab=good" @click="routeTo('good')">精华  </router-link>
        <router-link to="/?tab=share" @click="routeTo('share')">分享</router-link>
        <router-link to="/?tab=ask" @click="routeTo('ask')">问答</router-link>
        <router-link to="/?tab=job" @click="routeTo('job')">  招聘 </router-link>
      </div>
      <div class="content">
          <ul>
            <li v-for="item in lists">
                <router-link :to="'/zhuti/?id=' + item.id" >
                  <div class="item">
                    <div class="item-top">
                        <div class="item-top-left">
                          <!-- <img class="avatar" :src="item.author.avatar_url? '../assets/logo.png' : item.author.avatar_url" alt=""> -->
                        </div>
                        <div class="item-top-right">
                          <p class="loginname">{{item.author.loginname}}</p>
                          <p>{{item.create_at | date}}</p>
                        </div>
                    </div>
                    <h1 class="item-title">
                      <span v-if="item.top" class="top" style="border-color:red;color:red;">置顶</span>
                      <span v-if="item.tab && !item.top" class="top">{{ item.tab | tab }}</span>
                      {{item.title}}</h1>
                    <div class="item-bottom" style="font-size:12px;">
                        <div class="post-views">
                            <i class="iconfont icon-eye"> {{ item.visit_count}}</i>
                        </div>
                        <div class="post-replies">
                            <i class="iconfont icon-message"> {{ item.reply_count}}</i>
                        </div>
                        <div class="post-last-reply">
                            {{ item.last_reply_at | reply_time}}
                        </div>
                    </div>




                  </div>
                </router-link>
            </li>
          </ul>
      </div>
      <div class="loading-page" v-if="loading">
        <div class="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data: function(){
      return{
        lists: [],
        loading: false
      }
  },
  mounted: function(){
    var tab = this.$route.query.tab;
    console.log(tab)
    this.loading = true;
    this.$store.dispatch('getTopics',{
      page: 1,
      tab: tab,
      limit: 10,
      mdrender: false
    })
    .then((res) => {
      console.log(res)
      if(res.data.success == true){
        this.lists = res.data.data;
        this.loading = false;
      }
    })
  },
  filters:{
      tab (ele){
          switch (ele) {
            case 'ask':
              return '问答'
              break;
            case 'share':
              return '分享'
              break;
            case 'good':
              return '置顶'
              break;
            case 'job':
              return '招聘'
              break;
            default: return ""

          }
      },
      date(ele) {
          var date = new Date(ele);
          var y = date.getFullYear();
          var m = date.getMonth();
          var d = date.getDate();
          var hh = date.getHours();
          var mm = date.getMinutes();
          var ss = date.getSeconds();
          return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
      },
      reply_time(ele) {
          var lr = new Date(ele);
          var now = new Date;
          var dt = now - lr;
          var s = dt/1000;
          var m = s/60;
          var h = m/60;
          // console.log(h,m,s)
          if(s < 60){
            return s + '秒前';
          }else if(s < 3600){
            return parseInt(s/60) + '分钟前';
          }else if( s < 86400 ){
            return parseInt(s/60/60) + '小时前';
          }else if( s < 2592000){
            return parseInt(s/60/60/24) + '天前';
          }else if(s < 31104000){
            return parseInt(s/60/60/24/30) + '月前';
          }else if(s < 311040000){
            return parseInt(s/60/60/24/30/12) + '年前';
          }

      }
  },
  beforeRouteUpdate (to, from, next) {

    this.loading = true;
    next();
    this.$store.dispatch('getTopics',{
      page: 1,
      tab: to.query.tab,
      limit: 10,
      mdrender: false
    })
    .then((res) => {
      if(res.data.success == true){
        this.setDate(res.data.data)
        this.loading = false;
      }

    })

  },
  methods:{
    setDate(data){
      // console.log(data)
      this.lists = data
    },
    routeTo(path){
      this.$route.push(path)
    }
  }
}
</script>

<style lang="css" scoped>
@import "/static/animation.css";

.container{
  width: 100%;
  height: ;
}
.tab{
  width: 100%;
  height: 45px;
  background-color: #fff;
  position: fixed;
  top: 0;
  display: flex;
  line-height: 45px;
  border-bottom: solid 1px #ddd;
  margin-bottom: 0;
}
.tab a{
  flex: 1;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
}
.exactActive{
  border-bottom: 2px solid #80bd01;
}
.content{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-top: -12px;
}
.content ul{
  margin-bottom: 100px;
}

ul{
  width: 100%;
}
ul li{
  margin-bottom: 10px;
  background-color: #fff;
  text-align: left;
  padding: 10px;
  /*box-shadow: 0 1px 5px #ccc;*/
}
.item{
  display: flex;
  flex-direction: column;
}
.item .item-top{
  display: flex;
  flex: 2;
  flex-direction: row;
}
.item .item-top .item-top-left{
  flex: 1;
}
.item .item-top .item-top-right{
  flex: 4;
  font-size: 12px;
}
.item .item-bottom{
  display: flex;
  flex: 1;
  flex-direction: row;
}
.avatar{
  width: 35px;
  height: 35px;
  border: solid 1px #ddd;
  border-radius: 50%;
}
.top{
  width: 50px;height: 20px;
  font-size: 15px;
  border: solid 1px #38f;
  border-radius: 3px;
  color: #38f;
  padding:0 2px;
}
.loginname{
  font-size: 14px;
  font-weight: 800;
}
.item-bottom{
  height: 30px;
}
.item-title{
  font-size: 16px;
  border-bottom: solid 1px #eee;
  padding-top: 5px;
  padding-bottom: 5px;
}
.item-bottom div{
  flex:1;
  text-align: center;
  line-height: 20px;
  margin-top: 10px;
  font-weight: 200;
}
.item-bottom i{
  font-size: 12px;
}
.item-bottom .post-replies{
  border-left: solid 1px #eee;
  border-right: solid 1px #eee;
}
.loading-page{
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  top: 47px;
  left: 0;
  z-index: 999;
  background-color: #fff;
}


</style>
