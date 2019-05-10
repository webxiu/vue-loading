export const showBack = callback=>{
    let showDistance = 500,//滑动显示距离
        oldScrollTop,//旧的距离
        requestFrame;//requestAnimationFrame动画对象
    //滚动监听
    document.addEventListener('scroll',()=>{
        showBackFun();
    },false)
    //触摸监听
    document.addEventListener('touchstart',()=>{
        showBackFun();
    },{passive:true})//passive使滑动更自然
    document.addEventListener('touchmove',()=>{
        showBackFun();
    },{passive:true})
    document.addEventListener('touchend',()=>{
        oldScrollTop = document.documentElement.scrollTop;
        moveEend();

    },{passive:true})

    //移动结束时调用
    const moveEend = ()=>{
        requestFrame = requestAnimationFrame(()=>{
            if(document.documentElement.scrollTop != oldScrollTop){
                //由于惯性还在滑动
                oldScrollTop = document.documentElement.scrollTo;
                //再调用自己判断是否滚动
                moveEend()
            }else{//如果不滚动了
                cancelAnimationFrame(requestFrame);
            }
            showBackFun()
        })
    }

    
    //判断是否显示
    const showBackFun=()=>{
        if(document.documentElement.scrollTop > showDistance){
            callback(true)//显示执行
        }else{
            callback(false)//隐藏执行
        }
    }

        
}