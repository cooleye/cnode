<template lang="html">
  <div class="container">
    <mheader title="消息"  showicon="false"/>
    <h1 v-if="!hasmeg">没有消息</h1>
  </div>
</template>

<script>
import Header from '../../components/Header';

export default {
  data() {
    return {
      has_read_messages:[],
      hasnot_read_messages:[],
      hasmeg:false
    }
  },
  components:{
    mheader: Header
  },
  mounted() {

    this.$store.dispatch('messages')
    .then((res)=>{
      console.log(res)
      this.hasnot_read_messages = res.data.data.hasnot_read_messages;
      this.has_read_messages = res.data.data.has_read_messages;
      console.log(this.hasnot_read_messages)
      if(this.hasnot_read_messages.length === 0){
        this.hasmeg = false
      }
    })
  }
}
</script>

<style lang="css" scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-top: -14px;
}
</style>
