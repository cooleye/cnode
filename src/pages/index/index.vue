<template lang="html">
  <div class="container">
      <router-view/>
      <div class="footer">
          <router-link to="/?tab=all"" >
            <i class="icon iconfont icon-all"></i>
            <div  class="icon-name ease">
              首页
            </div>
            </router-link>
          <router-link to="/message">  <i class="icon iconfont icon-message2"></i>
            <div  class="icon-name ease">
              消息
            </div></router-link>
          <router-link to="/publish">  <i class="icon iconfont icon-publish"></i>
            <div  class="icon-name ease">
              发布
            </div></router-link>
          <router-link to="/mine">  <i class="icon iconfont icon-mine2"></i>
            <div  class="icon-name ease">
              我的
            </div></router-link>
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css"  scoped>
  .container{
    width:100%;
    height:100%;
  }
.footer{
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  padding-top: 2px;
  border-top:solid 1px #ddd;

}
.footer a{
  flex: 1;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
}
.footer a .icon{
  margin-top: 0;
}
.icon-name{
  width: 100%;
  height: 12px;
  line-height: 12px;
  margin: 0;padding: 0;
}

.active{
  color:#80bd01;
  font-weight:800;
  font-size:14px;
}
.ease{
  transition:font-size 0.2s ease;
}
</style>
