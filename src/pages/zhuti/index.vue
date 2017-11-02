<template lang="html">
  <div class="container">

    <div class="header">
      <router-link to="/?tab=all"><i class="icon iconfont icon-LC_icon_left_line">返回</i></router-link>
      <h1 class="title">主题</h1>
    </div>
    <div class="content" v-if="!loading">
      <div class="louzhu">
          <div>
            <img  class="avatar" :src="data.author.avatar_url" alt="">
          </div>
          <div class="author-loginname">
            <p>{{data.author.loginname }}</p>
            <p>{{data.create_at}}</p>
          </div>
      </div>

      <div class="blog-title">
        <h1 font-size="16px">{{data.title}}</h1>
      </div>

      <div v-html="data.content"  class="cover">
      </div>

      <div class="replies">
        <div class="rep-header">
            共{{ data.reply_count}}条回复
        </div>
          <ul>
            <li v-for="rep in data.replies">
              <div class="louzhu" style="border:none;">
                <div>
                  <img  class="avatar" :src="rep.author.avatar_url" alt="">
                </div>
                <div class="author-loginname">
                  <p>{{rep.author.loginname }}</p>
                  <p style="color:#5af;float:right">{{rep.create_at}}</p>
                </div>
              </div>

              <div class="reply-content" v-html="rep.content"></div>
            </li>
          </ul>
      </div>

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
      data: [],
      loading: false
    }
  },
  created: function(){
    var id = this.$route.query.id;
    this.loading = true;
    this.$store.dispatch('getTheTopic',id)
    .then((res) => {
      // console.log(res)
      if(res.statusText == 'OK'){
        this.data = res.data.data;
        this.loading = false;
      }
    })
  }
}
</script>

<style lang="css" scoped="">
@import "/static/animation.css";

.container{
  width: 100%;height: 100%;
}
.content{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #fff;
  margin-top: -14px;
}

.header{
  width: 100%;
  height: 45px;
  background-color: #fff;
  position: fixed;
  top: 0;
  line-height: 45px;
  text-align: left;
}
.header .icon{
  position: absolute;
  left: 5px;
}
.title{
  text-align: center;
  font-size: 20px;
}
.cover{
  width: 100%;
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
.louzhu{
  text-align: left;
  padding: 10px;
  height: 30px;
  line-height: 30px;
  border-bottom: solid 1px #eee;
}
.louzhu div{
  float: left;
}

.louzhu .author-loginname{
  margin-left: 10px;
}
.louzhu .author-loginname p{
  height: 15px;
  line-height: 15px;
}

.louzhu .avatar{
  width: 30px;
  height: 30px;
  border: solid 1px #aaa;
  border-radius: 50%;
}
.blog-title{
  font-size: 16px;
  font-weight: 800;
  /*text-align: center;*/
  padding: 10px;
  text-align: left;
}
.rep-header{
  border-left: solid 3px #3af;
  border-bottom: solid 1px #eee;
  border-top: solid 1px #eee;
  padding-top: 10px;
  padding:10px;
}
</style>
