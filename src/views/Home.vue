<template>
  <div class="home w-full h-full bg-[#141313] min-w-[1000px]">
    <!-- <HomeHeader class="h-[60px]"></HomeHeader> -->
    <router-view class="h-[calc(100%)]"></router-view>
  </div>
</template>
<script>
// import HomeHeader from "./HomePage/HomeHeader.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    // HomeHeader,
  },
  created() { },
  methods: {},
};
</script>
<style lang="less">
</style>
