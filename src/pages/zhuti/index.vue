<template lang="html">
  <div class="container">

    <div class="header">
      <router-link to="/?tab=all"><i class="icon iconfont icon-LC_icon_left_line">返回</i></router-link>
      <h1 class="title">主题</h1>
    </div>
    <div class="content">
      <h1 font-size="16px">{{data.title}}</h1>
      <hr>
      <div v-html="data.content"  class="cover">
      </div>
      <hr>
      <div class="replies">
        <div class="rep-header">
            评论
        </div>
          <ul>
            <li v-for="rep in data.replies">
              <img class="avatar" :src="rep.author.avatar_url" alt="">
              <span>{{rep.author.loginname}}</span>
              <p>{{rep.create_at}}</p>
              <div class="reply-content" v-html="rep.content"></div>
            </li>
          </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data: function(){
    return{
      data: []
    }
  },
  mounted: function(){
    var id = this.$route.query.id;
    this.$store.dispatch('getTheTopic',id)
    .then((res) => {
      // console.log(res.data.data)
      this.data = res.data.data;
    })
  }
}
</script>

<style lang="css" scoped="">
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

</style>
