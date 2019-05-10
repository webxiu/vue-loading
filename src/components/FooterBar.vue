<template>
    <ul class="nav-bar">
        <li :class="['barIcon','home',$route.name==='index'?'active':'']" @click="$router.push('/index')"></li>
        <li :class="['barIcon','category',$route.name==='category'?'active':'']" @click="$router.push('/category')"></li>
        <li :class="['barIcon','find',$route.name==='find'?'active':'']" @click="$router.push('/find')"></li>
        <li :class="['barIcon','cart',$route.name==='cart'?'active':'']" @click="$router.push('/cart')"></li>
        <li :class="['barIcon','myHome',$route.name==='myHome'?'active':'']" @click="$router.push('/myHome')"></li>
    </ul>
</template>

<script>

export default {
    name:'FooterBar',
    data(){
        return{
            status:false,
        }
    },
    
}
</script>

<style scoped>
    .nav-bar{
        position: fixed;
        width:100%;
        margin: 0 auto;
        bottom: -1px;
        left: 0;
        right:0;
        height: 3.8rem;
        /* padding: 0.66667rem 0 0; */
        background: #fff;
        overflow: hidden;
        clear: both;
        box-shadow: 0px 0px 20px -8px #999;
        display:flex;
        
        z-index: 5000;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        border-top: 1px solid #eee;
    }
   .nav-bar .barIcon{
       flex: 1;
       width: .0625rem;
        height: 4rem;
       cursor: pointer;
       /* background: url('https://m.360buyimg.com/mobilecms/jfs/t15145/137/2502885754/3106/de5e0b14/5aa10cd2N46f18ce6.png') 0 0 no-repeat; */
       background-size: 100% 100%;
   }


   .home{
       background: url('https://m.360buyimg.com/mobilecms/jfs/t18526/211/696109898/3876/a61be82c/5aa10cd2N1318ac50.png') 0 0 no-repeat;
       background-size: 100% 100%;
   }
   .home.active{
       background: url('https://m.360buyimg.com/mobilecms/jfs/t15145/137/2502885754/3106/de5e0b14/5aa10cd2N46f18ce6.png') 0 0 no-repeat;
        background-size: 100% 100%;
        width: .0625rem;
        height: 4rem;
   }


   .category{
       background: url('https://m.360buyimg.com/mobilecms/jfs/t19183/49/696491919/3763/dec8cceb/5aa10cdbNa9cd0320.png') 0 0 no-repeat;
       background-size: 100% 100%;
   }
   .category.active{
       background: url('https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/33669/19/3432/3731/5cb48c9cEb2f5593b/060ffe532d67562b.png') 0 0 no-repeat;
       background-size: 100% 100%;
        width: .0625rem;
        height: 4rem;
   }

   .find{
       background: url('https://img11.360buyimg.com/jdphoto/s130x100_jfs/t25261/337/1250179439/2765/db2976c3/5b8e4ac3N749fb56e.png') 0 0 no-repeat;
       background-size: 100% 100%;
       
   }
   .find.active{
       background: url('https://img11.360buyimg.com/jdphoto/s130x100_jfs/t26308/300/329634942/2532/1b7a4155/5b8e4acdN888f9e54.png') 0 0 no-repeat;
       background-size: 100% 100%;
        width: .0625rem;
        height: 4rem;
   }

   .cart{
       background: url('https://m.360buyimg.com/mobilecms/jfs/t18583/69/717127328/4407/5e47882b/5aa10ceaN649eec12.png') 0 0 no-repeat;
       background-size: 100% 100%;
   }
   .cart.active{
       background: url('https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/33669/19/3432/3731/5cb48c9cEb2f5593b/060ffe532d67562b.png') 0 0 no-repeat;
       background-size: 100% 100%;
        width: .0625rem;
        height: 4rem;
   }
   .myHome{
       background: url('https://m.360buyimg.com/mobilecms/jfs/t17782/11/2358895717/4684/ad19de7f/5af43af1N04ef5a16.png') 0 0 no-repeat;
       background-size: 100% 100%;
   }
   .myHome.active{
       background: url('https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/33669/19/3432/3731/5cb48c9cEb2f5593b/060ffe532d67562b.png') 0 0 no-repeat;
       background-size: 100% 100%;
        width: .0625rem;
        height: 4rem;
   }
</style>

