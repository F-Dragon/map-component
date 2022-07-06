<template>
  <div class="w-[calc(100%)] h-full relative">
    <map-view v-if="style" :styleUrl="style" :token="token"></map-view>
  </div>
</template>
<script>
import MapView from '../../components/MapView'
export default {
  name: "HomeContent",
  data() {
    return {
      token: '平台获取',
      basePath: '/api/iserver/services/62afd824e4b0d4b0392aawer/TileServer/TileServer?style=d_xsywtg&srs=EPSG:4490&request=GetStyle&hztk=aGtjLjEyNy4wLjAuMS4xNjUzNTY5NDQ4NDg5.4C7E9E863934007F89AFD11E5AB380A04B22F10C',
      style: null,
    };
  },
  components: {
    MapView,
  },
  created() {
    localStorage.setItem('token', this.token);
    console.log('token', this.token)
    this.style = `${window.location.origin}${this.basePath}&uc_access_token=${this.token}`
  },
  beforeDestroy() {
    window.mapBox = null;
  },
}
</script>
<style lang="less" scoped>
</style>
