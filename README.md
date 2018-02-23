# 项目介绍：
  ### cnode 是一个nodejs的社区，本程序使用 vue重写，调用cnode提供的接口
  ### 接口地址： https://cnodejs.org/api

## 技术栈
  vue + vue-router + vuex + es6 + webpack + axios

## 目录结构说明：
  1、源码在 src目录下，assets存放一些静态资源文件
  2、components 下存放公用组件文件
  3、pages 是项目中的页面文件
  4、router是路由目录
  5、store是vuex的状态管理文件
  6、入口文件是main.js

## 运行环境：
  - nodejs，git

## 如何运行：
  1. 使用 git把代码克隆到本地  git clone https://github.com/cooleye/cnode.git  （或者把代码拷贝到本地）
  2. 使用npm 安装依赖  npm install
  3. 运行 npm start
  4. 打包 npm run build ,打包完后，生成 dist目录，讲dist目录里的文件上线即可

## 代码解读：
  1. 在 App.vue 中，可以看到 有一个`<router-view/>`标签，里面显示的内容，我们在 路由中可以找到，
     打开router下的index.js,可以看到路由的配置，
     
     ```
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
             ...(此处省略，详见 index.js)
           ]
         },
         ...(此处省略，详见 index.js)
       ]
     })
     ```
     
     在默认情况下，会加载 Index模块，Index模块已经在
     文件顶部引入了`import Index from '@/pages/index'`  
  2. 在 pages/index里找到 index.vue,可以看到 <div class="footer">，这个就是底部菜单了。这里我们使用
    
    ```
    <router-link to="/?tab=all"" >
      <i class="icon iconfont icon-all"></i>
      <div  class="icon-name ease">
        首页
      </div>
    </router-link>
    ```

    来实现页面的跳转,默认情况下，我们会显示所有的数据，也就是显示第一个标签页，设置默认路由
    `router.push({path:'/?tab=all'})`
    跳转到了path 为"/"的路由，参数为tab=all。
  3. 然后我们打开 pages/index 下的tab.vue,在 mounted 生命周期函数中，获取路由传参var `tab = this.$route.query.tab;`
    调用接口获取数据。
    ```
    this.$store.dispatch('getTopics',{
      page: 1,
      tab: tab,
      limit: 10,
      mdrender: false
    })
    .then((res) => {
      console.log(res)
      if(res.data.success == true){
        this.lists = res.data.data;
        this.loading = false;
      }
    })
    ```
    这里我们使用了 vuex，把接口的调用放到了store中， 在组件加载成功后， dispatch一个action "getTopics",那么就会
    执行store中
    ```
     getTopics({ commit },params){
      return axios.get('https://cnodejs.org/api/v1/topics',{
        params:{
            page: params.page,
            tab:  params.tab,
            limit: params.limit,
            mdrender: params.mdrender
        }
      })
    }
    ```
    
    这个函数，在这里使用axios进行get请求，传入需要的参数，因为这里是异步请求，所以return 出请求的结果，在上面 dispatch
    后获取请求得到的数据，`this.lists = res.data.data;` 然后在页面 就可以对请求到的数据进行显示了`<li v-for="item in lists">`
    4. 对渲染的每一条数据，我们在外层都包一层 `<router-link :to="'/zhuti/?id=' + item.id" >`，进行路由跳转，并且传入对应的id，
    点击这一条文章，就会根据id跳转到对应的文章详情页了。
    打开 pages/zhuti 下 index.vue组件，在created生命周期函数里，获取传过来的id，`var id = this.$route.query.id;`
    然后根据id请求接口，获取文章的请求数据
    ```
    this.$store.dispatch('getTheTopic',id)
    .then((res) => {
      // console.log(res)
      if(res.statusText == 'OK'){
        this.data = res.data.data;
        this.loading = false;
      }
    })
    ```
    5. 发表文章也是类似，点击发表按钮`<mheader title="发表" showicon="true" @click="publish"/>`，执行publish函数
    ```
    publish() {
      var title = this.title;
      var tab = this.tab;
      var con = this.con;
      if(title != '' && tab !='请选择' && con != ''){
        this.$store.dispatch('topics',{
          title: title,
          tab: tab,
          content: con
        })
        .then( (res) => {
            console.log(res)
        })
        .catch( (res) => {
          console.log(res)
        })
      }
    }，
    ```
    调用发布文章接口
    6. 登录功能的实现，用户登录 cnode网站，在设置页面可以看到自己的 accessToken，使用post方法调用/accesstoken接口，验证是否登录成功。
