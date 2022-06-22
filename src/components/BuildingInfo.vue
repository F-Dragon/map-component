<template>
  <div></div>
</template>

<script>
import Vue from "vue";
import POIPopup from './POIPopup'
import mapUtil from "mapbox-onemap-js";
import { message } from 'ant-design-vue';
export default {
  name: "BuildingInfo",
  components: {
    POIPopup
  },
  props: ["POIData", "cachePopup", "token"],
  created() {
    this.addPolygon()
  },
  methods: {
    createPopUp(currentFeature) {
      const p = Vue.extend(POIPopup);
      let vm = new p({
        propsData: {
          objes: currentFeature
        }, //传参
      });
      vm.$mount(); //挂载
      return vm.$el;
    },
    async addPolygon() {
      try {
        const map = window.map
        let gridRes = await mapUtil.getResByPoint(this.POIData, "/api/iserver/services/62afd824e4b0d4b039qjeoit/rest/data", "grild", "COM_PY", this.token)
        const resMsg = await mapUtil.drawGrid(map, gridRes.result.features)
        resMsg && message.warning(resMsg) // 错误信息

        let buildingRes = await mapUtil.getResByPoint(this.POIData, "/api/iserver/services/62afd824e4b0d4b039u1239r/rest/data?key=BzgLigJsfr5eWMSHPPhI5QAI", "XSDTHANDFCFH", "单体化", this.token);
        if (buildingRes.result.features.features.length === 0) {
          message.warning({ content: '暂无单体化数据！', });
          this.$emit("update:POIData", null);
          return
        }
        const popupTemp = this.createPopUp(buildingRes);
        window.mapBoxParams.popup = await mapUtil.makeBuildingPopup(map, this.POIData, popupTemp)
        this.$emit("update:POIData", null);
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>

<style scoped>
</style>
