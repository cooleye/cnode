<template lang="html">
  <div class="cover" :style="mstyle" @click="click">
      {{title}}
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:['mstyle','title'],
  methods:{
    click() {
      this.$emit('mclick')
    }
  }
}
</script>

<style lang="css" scoped>
.cover{
  width:9.5rem;
  height: 45px;
  text-align: center;
  line-height: 45px;
  border-radius: 5px;
  background-color: #39f;
  color: #fff;
  font-size: 18px;
  margin: 0 auto;
}
</style>
