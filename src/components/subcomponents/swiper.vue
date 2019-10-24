<template>
  <div>
    <mt-swipe :auto="1000">
      <mt-swipe-item v-for="item in swipelist" :key="item.id">
        <img :src="item.image_url" alt :class="{full:isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["swipelist", "isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  text-align: center;
  image {
    //width: 100%;
    height: 100%;
  }
}
.full{
  width: 100%;
}
</style>