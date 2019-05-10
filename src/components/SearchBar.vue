<template>
    <div style="background:#bbb;">
        <!-- 假搜索框 -->
        <div class="searchResult" v-if="!searchVisible">
            <slot name='left-icon'>
               <div id="msCancelBtn" class="jd-header-icon-back J_ping" style="display: block;"><span></span></div>
            </slot>
            <!-- 点击隐藏窗口显示弹层 -->
           <div class="searchInput" @click="()=>searchVisible=true">
                <slot name='title-icon'>
                    <form action="/search/search.action" class="jd-header-search-form"><div class="jd-header-search-box" id="msSearchBox" style="margin-right: 32px;"><i id="search-input-left-jd" class="jd-header-icon-jd"></i><i id="search-input-left-icon" class="jd-header-icon-fdj"></i><div class="jd-header-search-input"><input value="" maxlength="20" name="keyword" id="msKeyWord" type="text" cleardefault="no" autocomplete="off" placeholder="投影仪" class="hilight2"><input name="catelogyList" type="text" value="" style="display:none;"><div class="head-input-icon J_ping" id="msSearchTab" report-eventid="MSearch_SearchTab" style="display:none;"></div></div><a href="javascript:void(0);" class="jd-header-icon-close" id="msSearchClearBtn" style="display:none;"></a></div><a href="javascript:void(0)" style="display: none;" id="msSearchBtn" class="jd-header-icon-search1"><span>搜索</span></a></form>
                </slot>
           </div>
            <slot name='right-icon'>
                <div id="msShortcutLogin" class="jd-header-icon-new-shortcut-text J_ping" style="display: block;"><span>登录</span></div>
            </slot>
        </div>
        <!-- 弹层 真输入框 使用ui框架-->
        <mt-popup v-model="searchVisible"
            :closeOnClickModal="true"
            :modal="false"
            class="modal-popup"
        >
            <div class="searchContainer">
                <!-- 输入框 -->
                <div class="search-top">
                    <div class="searchInput">
                        <div class="search-box">
                            <i class="searchIcon searchContentIcon"></i>
                            <!-- v-searchFocus指令 -->
                            <input v-model="keyword" class="keyword-input" placeholder="请输入查询内容" v-searchFocus />
                            <span class="clear" @click="keyword=''" v-show="keyword.length>0">&times;</span>
                        </div>
                    </div>
                    <span @click="()=>{keyword='';searchVisible=false;}">取消</span>
                </div>
                <!-- 列表展示 -->
                <div class="search-result-content"               v-if="keyword.length>0">
                    <div style="width: 100%;height: 100%;">
                        <div class="search-result-goods" style="border-bottom:1px solid #ccc;padding:5px 0;">
                            <i></i>
                            <span><strong>搜索</strong> "{{keyword}} " 的结果共{{searchResultData.length}}条</span>
                        </div>
                        <ul class="search-result-list" v-if="searchResultData.length>0">
                            <li class="result-item" 
                                v-for="(v,i) in searchResultData" :key="i"
                                @click="selectedProduct(v)"
                                >
                                <h3>{{v.title}}</h3>
                                <p>{{v.name}}</p>
                            </li>
                        </ul>
                        <p class="data-none" v-else>暂无数据...</p>
                    </div>
                </div>
            </div>

        </mt-popup>
    </div>
    
</template>

<script>
export default {
    name:'SearchBar',
    data(){
        return{
            pageNo:1,//查询第几页
            pageSize:5,//查询多少条
            searchVisible:false,//默认不显示弹层
            keyword:'',//搜索关键字
            searchResultData:[],//搜索结果
        }
    },
    //指令实现光标定位
    directives:{
        searchFocus:{
            update(el){
                el.focus()
            }
        }

    },
    watch:{
        keyword(key){
            //每输入一次发一次请求,需要优化 delay函数优化
            this.searchResult(key)
        }
    },
    methods:{
        // async searchResult(keyword){
        // 搜索查询数据
        searchResult(keyword){
            if(keyword){
                fetch('http://localhost/api/detail_query/?name='+keyword+"&title="+keyword)
                .then(res =>{
                    return res.json();
                })
                .then(res => {
                    console.log(111,res)
                    this.searchResultData = res
                })
            }
        },
        //点击查询出来的产品列表,按关键字搜索, prod可不要
        selectedProduct(prod){
            this.$router.push({path:'/searchDatail',query:{keyword:this.keyword}})

        }
    }
    
}
</script>

<style scoped>
/*坐边*/
.searchResult {
    position: relative;
}
.jd-header-icon-back {
    z-index: 120;
    position: absolute;
    width: 40px;
    height: 44px;
}
.jd-header-icon-back span {
    margin: 14px 0 0 15px;
    width: 20px;
    height: 18px;
    display: block;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgAgMAAAAdw9KTAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURUdwTP///////////waf0AoAAAADdFJOUwDjSYAlncUAAAAbSURBVBjTY5j/Hwq+MdTDmH+RmUgK6AuGhcsAU5tyB6Ji+x0AAAAASUVORK5CYII=') no-repeat;
    background-size: 100% 100%;
}
/*右边*/
.jd-header-icon-new-shortcut-text {
    z-index: 120;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 44px;
}
.jd-header-icon-new-shortcut-text span {
    display: inline-block;
    margin: 10px 0;
    color: #111;
    font-size: 14px;
}
/* 中间 */
.jd-header-search-form {
    display: block;
    overflow: hidden;
    margin: 0 10px 0 40px;
    padding: 0;
    height: 44px;
}
.jd-header-search-form .jd-header-search-box {
    margin-right: 52px;
    margin-top: 7px;
    height: 30px;
    position: relative;
}
.jd-header-icon-jd {
    display: block;
}
.jd-header-search-input {
    display: inline-block;
    width: 100%;
    border: none;
    border-radius: 15px;
    height: 30px;
    overflow: hidden;
    background: #f7f7f7;
    font-size: 12px;
    -webkit-box-align: center;
    line-height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 35px;
    padding-right: 10px;
    box-sizing: border-box;
}
.jd-header-icon-jd::after {
    content: "";
    position: absolute;
    border-right: 1px solid #ddd;
    top: 0;
    left: 26px;
    height: 16px;
}
.jd-header-search-input {
    padding-left: 68px;
}
.mjd-header .m_common_container .m-common-header-search .jd-header-search-form .jd-header-search-box .jd-header-icon-fdj {
    display: block;
    width: 18px;
    height: 15px;
    background: url('https://st.360buyimg.com/so/images/search/jd-sprites.png?__inline') no-repeat;
    background-position: -80px 0;
    background-size: 200px;
    margin-left: 10px;
    margin: 8px 0 0 15px;
    position: relative;
    z-index: 1;
    float: left;
}
.jd-header-search-input input {
    border: 0;
    background: 0 0;
    font-size: 12px;
    color: #232326;
    padding-left: 5px;
    width: 19em;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    height: auto;
    margin: 0 0 0 5px;
    vertical-align: middle;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    line-height: 30px;
}

.search-box{
    padding-left: 2px;
}
.keyword-input{
    padding:2px 5px;
}

/*弹层*/
.modal-popup{
    width: 100%;
    height: 100%;
    background:#fff;
}
  
  .search-top{
      display: flex;
      margin-top: 5px;
  }
  .search-top span{
      flex:0.1
  }
  .search-top .searchInput{
      flex:0.9
  }

  /*结果列表*/
  ul,li{
      list-style: none;
  }

  .search-result-list{
      overflow-y:auto;
      padding: 5px 10px;
      height: 100vh;
  }
  .result-item{
      border-bottom: 2px solid #ccc;
      padding:5px 0;
        width: 95%;
        margin: 0 auto;
  }
  .result-item>p{
    margin:10px 0 0 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .data-none{
      margin-top: 50px;
    text-align: center;
    color: #c76d6d;
  }
</style>
