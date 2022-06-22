<template>
  <!-- 底图 -->
  <sm-web-map :mapOptions="mapOptions" @load="preLoad">
    <!--   比例尺   -->
    <sm-scale position="bottom-right"></sm-scale>
    <!-- 坐标转换 -->
    <sm-coordinate-conversion position="bottom-right" :collapsed="true"></sm-coordinate-conversion>
    <!-- 测量工具 -->
    <sm-measure position="bottom-right"></sm-measure>
    <!--   指南针工具   -->
    <sm-compass position="bottom-right" :visualize-pitch="true"></sm-compass>
    <!--   缩放工具   -->
    <sm-zoom position="bottom-right"></sm-zoom>
    <!--  建筑点击事件  -->
    <building-info v-if="POIData" :POIData.sync="POIData" :cachePopup="cachePopup" :token="token"></building-info>
    <!--  撒点 聚合  -->
    <point-layer v-if="uuid1" :uuid.sync="uuid1" :isCluster="isCluster" :token="token"></point-layer>
  </sm-web-map>
</template>

<script>
import mapUtil from 'mapbox-onemap-js'
import BuildingInfo from './BuildingInfo'
import PointLayer from './PointLayer.vue'
export default {
  name: "MapView",
  components: {
    BuildingInfo, PointLayer
  },
  props: {
    container: {
      type: String,
      default: 'map'
    },
    // mapbox底图地址
    styleUrl: {
      type: String,
      require: true
    },
    // 视角
    zoom: {
      type: Number,
      default: 10
    },
    // 坐标系
    crs: {
      type: String,
      default: 'EPSG:4490'
    },
    center: {
      type: Array,
      default() {
        return [120.28293631994264, 30.198482347363537]
      }
    },
    antialias: {
      type: Boolean,
      default: true
    },
    uuid: {
      type: String,
      default: ""
    },
    // 是否聚合
    isCluster: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      mapOptions: null,
      POIData: null,
      cachePopup: null, // 缓存弹窗
      uuid1: this.uuid
    }
  },
  created() {
    window.map = null
    window.mapBoxParams = {
      hasClusterLayers: [],
      pointMapLayer: {},
      popup: null,
      imageLayer: null,
      noClusterLayers: [],
      POIMarker: null,
    }

    const {
      container,
      styleUrl,
      zoom,
      crs,
      center,
      antialias
    } = this

    this.mapOptions = {
      container,
      style: styleUrl,
      zoom,
      crs,
      center,
      antialias
    }

  },
  methods: {
    preLoad(e) {
      window.map = e.map
      this.uuid1 = "62973ca9e4b083f6673e7eba"
      // 初始化一张图底图，提供默认底图样式。
      mapUtil.initMap(e.map, (point) => {
        point && console.log('point', point)
        this.POIData = point
      })
    }
  }
}
</script>

<style scoped>
</style>
