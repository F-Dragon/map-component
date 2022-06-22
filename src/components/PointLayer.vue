<template></template>
<script>
import { message } from 'ant-design-vue';
import SprinkleModal from "./SprinkleModal.vue";
import mapUtil from "mapbox-onemap-js";
import Vue from "vue";
export default {
  name: "PointLayer",
  data() {
    return {
      appConfig: {
        //需要展示的icon
        imageUrl: "https://xiaoshan-demo.oss-cn-hangzhou.aliyuncs.com/ywtg/icon_dynamic_yellow.50e2b7ad.png",
        //需要展示的字段名
        showTitle: "LD_ID",
        //图片大小 默认16
        iconSize: 80,
        //增加的类名 可选
        className: "classname1"
      }
    }
  },
  props: ["uuid", "isCluster", "token"],
  created() {
    this.getMapTreeData(this.uuid)
  },
  components: { SprinkleModal },
  methods: {
    async getMapTreeData(uuid) {
      const url = `/api/iserver/info/${uuid}`
      let resData = await this.$http.get(url);
      if (!resData.data.err && resData.data.success) {
        const { mapDataSet, mapDataSource, projectDisplayUrl } = resData.data.res;
        const attributeFilter = "";
        let result = await mapUtil.getResBySQL(projectDisplayUrl, mapDataSource, mapDataSet, attributeFilter, this.token);
        const servicesResult = result.result.features;
        if (servicesResult.features.length !== 0) {
          this.addPointLayer(servicesResult)
        } else {
          message.warning("撒点失败")
        }
      } else {
        message.warning("数据错误")
      }
    },
    createPopUp(currentFeature) {
      const p = Vue.extend(SprinkleModal);
      let vm = new p({
        propsData: {
          objes: currentFeature
        }, //传参
      });
      vm.$mount(); //挂载
      return vm.$el;
    },
    addPointLayer(servicesResult,) {
      const { showTitle, iconSize, imageUrl, className } = this.appConfig
      if (this.isCluster) {
        mapUtil.isClusterLayer(window.map, servicesResult, imageUrl, this.uuid);
      } else {
        for (const marker of servicesResult.features) {
          const popupTemp = this.createPopUp(marker); //第二步中的创建内容的方法
          mapUtil.noClusterLayer(window.map, marker, imageUrl, this.uuid, popupTemp, showTitle, iconSize, className);
        }
      }
    }
  },
}
</script>
<style lang="less">
.classname1 {
  color: white;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding-top: 12px;
}
</style>
