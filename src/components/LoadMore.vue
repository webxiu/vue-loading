<template>
  <div
    class="loadmore"
    id="ScrollLoadMore"
    v-infinite-scroll="onloadMoreScroll"
    infinite-scroll-disabled="LoadMoreLoading"
    infinite-scroll-distance="10"
    v-if="!LoadMoreError"
  >
    <div class="loadmore-content" :style="{'transform':'translate3d(0,'+translate+'px,0'}">
      <!-- top部分 -->
      <slot name="top">
        <div class="loadmore-top" v-if="topMethod">
          <div v-if="topStatus !== 'loading'" :class="topStatus ==='drop' ? 'drop' : 'pull'">
            <span>{{topStatus ==='drop' ? '释放更新' : '下拉刷新'}}</span>
          </div>
          <div v-if="topStatus === 'loading'">
            <span>{{topText}}</span>
          </div>
        </div>
      </slot>

      <slot></slot>
      <!-- bottom部分 -->
      <slot name="LoadmoreText">
        <div v-if="!AllLoaded && LoadMoreLoading" class="loadmoreText">
          <span>加载中...</span>
        </div>
        <div v-if="AllLoaded" class="loadmoreText AllLoaded">
          <span>加载完了</span>
        </div>
      </slot>
    </div>
  </div>
</template>


<script>
export default {
  name: "loadMore",
  props: {
    topPullText: {
      type: String,
      default: "下拉更新"
    },
    topDropText: {
      type: String,
      default: "释放更新"
    },
    topLoadingText: {
      type: String,
      default: "加载中..."
    },
    topDistance: {
      type: Number,
      default: 70 //下拉触发加载的距离
    },
    topMethod: {
      //外部传入,下拉时调用
      type: Function
    },
    command: {
      //外部传入,请求方法
      type: Function
    },
    param: {
      //外部传入,请求方法
      type: Object,
      default: () => {
        return {
          pageNo: 0,
          pageSize: 1
        };
      }
    }
  },
  data() {
    return {
      translate: 0,
      startY: 0,
      currentY: 0,
      topStatus: "",
      topText: "",
      direction: "", //滑动方向
      AllLoaded: false,
      LoadMoreError: false,
      LoadMoreLoading: false,
      scrollEventTarget: null //滚动对象
    };
  },
  watch: {
    topStatus(val) {
      switch (val) {
        case "pull":
          this.topText = this.topPullText;
          break;
        case "drop":
          this.topText = this.topDropText;
          break;
        case "loading":
          this.topText = this.topLoadingText;
          break;
      }
    }
  },
  methods: {
    //加载数据
    async onloadMoreScroll() {
      if (
        this.AllLoaded ||
        this.LoadMoreLoading ||
        !this.command ||
        this.LoadMoreError
      ) {
        return;
      }
      this.LoadMoreLoading = true;
      let response = await this.command(this.param).catch(() => {
        this.LoadMoreError = true;
        this.LoadMoreLoading = false;
        throw new Error("the command has error:" + this.command);
      });
      //发送数据
      setTimeout(() => {
        this.$emit("loadMore", response);
        this.param.pageNo++;
        this.LoadMoreLoading = false;
      });
    },
    //下拉刷新后回弹
    onTopLoaded() {
      this.translate = 0;
      this.topStatus = "pull";
    },
    bindTouchEvents() {
      this.$el.addEventListener("touchstart", this.handleTouchStart);
      this.$el.addEventListener("touchmove", this.handleTouchMove);
      this.$el.addEventListener("touchend", this.handleTouchEnd);
    },
    getScrollEventTarget(el) {
      let currentNode = el;
      //得到滚动对象
      while (
        currentNode &&
        currentNode.tagName !== "HTML" &&
        currentNode.tagName !== "BODY" &&
        currentNode.tagName === 1
      ) {
        //1--元素节点
        let overflowY = document.defaultView.getComputedStyle(currentNode)
          .overflowY;
        if (overflowY === "scroll" || overflowY === "auto") {
          return currentNode;
        }
        currentNode = currentNode.parentNode;
      }
      return window;
    },
    // 得到滚动事件对象的scrollTop
    getScrollTop(element) {
      if (element === window) {
        //取最大值
        return Math.max(
          window.pageYOffset || 0,
          document.documentElement.scrollTop
        );
      } else {
        return element.scrollTop;
      }
    },
    //初始化
    init() {
      this.topStatus = "pull";
      this.topText = this.topPullText;
      //this.scrollEventTarget = this.getScrollEventTarget(this.$el)
      if (typeof this.topMethod === "function") {
        this.bindTouchEvents();
      }
    },
    //下拉开始
    handleTouchStart(event) {
      //得到Y值
      this.startY = event.touches[0].clientY;
      //得到滚动距离
      //this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
      if (this.topStatus !== "loading") {
        this.topStatus = "pull";
      }
      console.log(this.startY);
    },
    //下拉移动
    handleTouchMove(event) {
      this.currentY = event.touches[0].clientY; //移动的Y值
      let distance = this.currentY - this.startY; //移动距离
      this.direction = distance > 0 ? "down" : "up"; //比较得方向
      console.log(444, distance);
      if (
        typeof this.topMethod === "function" &&
        this.direction === "down" &&
        this.topStatus !== "loading"
      ) {
        this.translate = distance;
        //改变状态
        this.topStatus = this.translate >= this.topDistance ? "drop" : "pull";
      }
    },
    //下拉释放
    handleTouchEnd(event) {
      if (this.direction === "down" && this.translate > 0) {
        if (this.topStatus === "drop") {
          this.translate = "50"; //回退到50
          this.topStatus = "loading";
          this.topMethod();
        } else {
          this.translate = "0";
          this.topStatus = "pull";
        }
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.loadmoreText {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background: transparent;
  padding: 10px 0;
}
.loadmoreText span {
  padding-left: 10px;
}
.AllLoaded {
  color: #999;
}
.arrow-down {
  color: #ccc;
  transition: 0.2s;
}
.arrow-pull {
  transform: rotate(0deg);
}
.arrow-drop {
  transform: rotate(-180deg);
}

.loadmore-top div {
  font-size: 15px;
  color: #666;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.loadmore-top div span {
  padding-left: 10px;
}
</style>


