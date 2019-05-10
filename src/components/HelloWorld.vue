<template>
  <div class="hello">
    <load-more v-if="data"
            :topMethod="onRefreshCallback"
            @loadMore="infiniteCallback"
            ref="myLoadMore"
        >
       <!-- banner -->
      <div class="banner">
          <mt-swipe :stopPropagation="true" :prevent="true" :auto="2000">
              <mt-swipe-item v-for="(v,i) in banner" :key=i>
                  <img :src="v.url" alt="" style="width:100%;">
              </mt-swipe-item>
          </mt-swipe>
      </div>


      <div class="scroll-container">
        <h1>vue无限滚动</h1>
        <div v-for="(o,i) in data" :key=i style="border: 1px solid #eee">
          <div style="padding: 10px;">
            <h3>{{o.id}} {{o.title}}</h3>
            <p>{{o.name}}</p>
            <img :src="o.image" style="width:100%;">
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <div v-if="isLoading" ref="load">
          <img src="http://www.kuajinghelp.com/assets/pc/images/three-dots.svg" alt="">
        </div>
      </div>
    </load-more>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import LoadMore from './LoadMore'
export default {
  name: 'HelloWorld',
  data () {
    return {
      pageNo: 1,
			pageSize: 5,
			// url: "http://127.0.0.1:3000/news/page/",
      url: "http://localhost/api/",
      banner:[],
			data: [
			  {
			    "userId": 1,
			    "id": 1,
			    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
			    "name": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
			  },
			  {
			    "userId": 1,
			    "id": 2,
			    "title": "qui est esse",
			    "name": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
			  },{
			    "userId": 1,
			    "id": 3,
			    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
			    "name": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
			  },
			  {
			    "userId": 1,
			    "id": 4,
			    "title": "qui est esse",
			    "name": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
			  },{
			    "userId": 1,
			    "id": 5,
			    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
			    "name": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
			  },
			  {
			    "userId": 1,
			    "id": 6,
			    "title": "qui est esse",
			    "name": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
			  },
			],
			isLoading: false,
			endOfTheScreen: false
    }
  },
  components:{
      LoadMore
  },
  created(){
    this.loadData(this.pageNo, this.pageSize);
    var self = this;
    window.onscroll = function(){
      self.endOfTheScreen = self.scrollCheck();
    }
  },
  watch: {
    endOfTheScreen(newValue){
      if (newValue){
        console.log("滑到低..")
        this.pageNo++;
        this.loadData(this.pageNo, this.pageSize);
      }
    }
  },
  methods:{
    //下拉刷新
    async onRefreshCallback(){
        this.getIndexData();
        //状态还原
        setTimeout(()=>{
            this.$refs.myLoadMore.onTopLoaded()
        },3000)
    },
    //触底加载数据
    infiniteCallback(response){
        if(response.content.length > 0){
            response.content.map((v)=>{
                this.recommandData.push(v)

            })
        }
    },
    scrollCheck(){
      var winHeight = window.scrollY + window.innerHeight;
      console.log(winHeight === document.documentElement.offsetHeight)
      return winHeight === document.documentElement.offsetHeight;
    },
    loadData(pageNo, pageSize){
      this.isLoading = true;
      setTimeout(()=>{
        fetch(this.url+'detail/?page='+pageNo+"&size="+pageSize)
        .then(res =>{
          return res.json();
        })
        .then(res => {
          console.log(22,res)
          if(res.length){
            for(let i in res){
              this.data.push(res[i])
              console.log("加载数据..");
            }
            this.isLoading = false;
          }else{
            this.isLoading = true;
            this.$refs.load.innerHTML = "加载完了哦~~~"
          }
        })
      }, 2000)

    },
    async getIndexData(){
        //调用状态管理器的方法
        // axios.get('http://localhost/api/banner').then(res=>{
        //     this.banner = res.data
        //     console.log(99,res.data)
        // })
        fetch(this.url+'banner/')
          .then(res =>{
            return res.json();
          })
          .then(res => {
            console.log('banner:',res)
            this.banner = res
          })
    }
  },
  mounted(){//页面一加载就调用放这里
      this.getIndexData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner{
    height: 200px;
}
.scroll-container {
    width: 80%;
    margin: 0px auto;
  }
</style>
