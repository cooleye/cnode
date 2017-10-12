import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topics:[],
    accessToken:'',
    user:{}
  },
  mutations: {
    getTopics(state,params){

    }
  },
  actions: {
    getTopics({ commit },params){
      return axios.get('https://cnodejs.org/api/v1/topics',{
        params:{
            page: params.page,
            tab:  params.tab,
            limit: params.limit,
            mdrender: params.mdrender
        }
      })
    },
    getTheTopic({ commit },id){
      return axios.get('https://cnodejs.org/api/v1/topic/'+id,{
        params:{
          mdrender:true
        }
      })
    }
  },
  getters: {}
})
