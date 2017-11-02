import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topics:[],
    accessToken:'78f5c563-49cf-4c6a-a161-e028335718a4',
    user:{}
  },
  mutations: {
    getTopics(state,params){

    },
    saveuser(state,user){
      state.user = user;
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
    },
    messages({ commit,state }) {
      return axios.get('https://cnodejs.org/api/v1/messages?accesstoken='+state.accessToken)
    },
    topics( {commit,state},params){
      return axios.post('https://cnodejs.org/api/v1/topics',{
        accesstoken: state.accessToken,
        title: params.title,
        tab: params.tab,
        content: params.content
      })
    },
    login( { commit,state},token) {
        return axios.post('https://cnodejs.org/api/v1/accesstoken',{
          accesstoken: token
        })
    },
    saveuser( {commit},user) {
        commit('saveuser',user)
    }
  },
  getters: {
    accesstoken: (state) => state.accessToken,
    user: ( state) => state.user
  }
})
