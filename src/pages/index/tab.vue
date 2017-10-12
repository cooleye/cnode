<template lang="html">
  <div class="container">
      <div class="tab">
        <router-link to="/?tab=all">全部</router-link>
        <router-link to="/?tab=good">精华  </router-link>
        <router-link to="/?tab=share">分享</router-link>
        <router-link to="/?tab=ask">问答</router-link>
        <router-link to="/?tab=job">  招聘 </router-link>
      </div>
      <div class="content">
          <ul>
            <li v-for="item in lists">
                <router-link :to="'/zhuti/?id=' + item.id" >
                  <img class="avatar" :src="item.author.avatar_url" alt="">
                  <span>{{item.author.loginname}}</span>
                  <p v-if="item.top" class="top">置顶</p>
                  <p v-if="item.tab && !item.top" class="top">{{ item.tab | tab }}</p>
                  <h1>{{item.title}}</h1>
                  <p>{{item.create_at}}</p>
                </router-link>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  data: function(){
      return{
        lists: []
      }
  },
  mounted: function(){
    var tab = this.$route.query.tab;
    this.$store.dispatch('getTopics',{
      page: 1,
      tab: tab,
      limit: 10,
      mdrender: false
    })
    .then((res) => {
      if(res.data.success == true){
        this.lists = res.data.data;
      }
    })
  },
  filters:{
      tab: function(ele){
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
      }
  },
  beforeRouteUpdate (to, from, next) {

    this.$store.dispatch('getTopics',{
      page: 1,
      tab: to.query.tab,
      limit: 10,
      mdrender: false
    })
    .then((res) => {
      if(res.data.success == true){
        this.setDate(res.data.data)
      }
        next()
    })

  },
  methods:{
    setDate(data){
      console.log(data)
      this.lists = data
    }
  }
}
</script>

<style lang="css" scoped>
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

ul{
  width: 100%;
}
ul li{
  width: 100%;
  height: 5rem;
  margin-bottom: 10px;
  background-color: #fff;
  text-align: left;
  padding: 5px;
}
.avatar{
  width: 40px;
  height: 40px;
  border: solid 1px #aaa;
  border-radius: 50%;
}
.top{
  width: 50px;height: 20px;
  font-size: 18px;
  background-color: #aaf;
  color: #fff;
}

</style>
