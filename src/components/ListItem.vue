<template lang="html">
  <router-link :to="linkTo">
  <div class="item">
      <i class="icon iconfont" :class="iconName"  :style="mstyle"></i>
      <span>{{name}}</span>
      <div style="float:right" v-if="arrow=='true'">
        <i class="icon iconfont icon-right"></i>
      </div>
  </div>
  </router-link>
</template>

<script>
export default {
  data(){
    return{
      className:'red'
    }
  },
  props:['name','arrow','icon-name','mstyle','linkTo']
}
</script>

<style lang="css" scoped>
.item{
  width: 100%;
  height: 45px;
  background: #fff;
  border-top: solid 1px #eee;
  line-height: 45px;
  padding-left: 10px;
  font-size: 14px;
}
.item i{
  /*color: red;*/
  float: left;
}
.item span{
  float: left;
  margin-left: 10px;
}
.item .icon-right{
  float: right;
  margin-right: 15px;
  color: #aaa;
}

.blue{
  color: blue !important;
}
</style>
