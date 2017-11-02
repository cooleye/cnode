<template lang="html">
    <div class="header" @click="click">
        <h1>{{title}}</h1>
        <i class="icon iconfont icon-publish" v-if="showicon=='true'" style="float:right;margin-top:-45px;margin-right:10px;"></i>
    </div>
</template>

<script>
export default {
  props:['title','showicon'],
  methods:{
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="css">
.header{
  width: 100%;
  text-align: center;
  height: 45px;
  line-height: 45px;
  position: fixed;
  top: 0;
  background: #fff;
}
</style>
