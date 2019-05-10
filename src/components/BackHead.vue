<template>
  <div class="backHead" v-if="status" @click="gotop">TOP</div>
</template>

<script>
import { showBack } from "../utils/showBack.js";
export default {
  name: "BackHead",
  data() {
    return {
      status: false
    };
  },
  mounted() {
    showBack(status => {
      this.status = status;
    });
  },
  methods: {
    gotop() {
      let timer = setInterval(() => {
        let top = document.documentElement.scrollTop;
        if (top <= 0) clearInterval(timer);
        //向上滚动一段距离而不是直接回到顶部
        document.documentElement.scrollTop = top - top / 50;
      });
    }
  }
};
</script>

<style scoped>
.backHead {
  position: fixed;
  bottom: 72px;
  right: 9px;
  z-index: 9999;
  width: 38px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  background: rgba(11, 22, 33, 0.5);
}
</style>

