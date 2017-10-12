import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Tab from '@/pages/index/tab'

import Publish from '@/pages/publish'
import Message from '@/pages/message'
import Mine from '@/pages/mine'
import Zhuti from '@/pages/zhuti'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'Tab',
          component:Tab
        },
        {
          path: '/message',
          name: 'message',
          component: Message
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine
        }
      ]
    },
    {
      path:'/zhuti',
      name:'zhuti',
      component: Zhuti
    }
  ],
  linkActiveClass:'active',
  linkExactActiveClass:'exactActive'
})
router.push({path:'/?tab=all'})
export default router;
