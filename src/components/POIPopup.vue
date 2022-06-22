<template>
  <div class="poi-content">
    <div class="poi-header">
      <span class="poi-title" :title="properties.name || properties.CS">{{ properties.name || properties.CS }}</span>
      <img src="../assets/images/jiantou.png" class="poi-big-img">
      <img src="../assets/images/close.png" class="poi-close" @click="closePoi">
      <div class="poi-adress">
        <img src="../assets/images/location.png">
        <span :title="properties.adress">
          {{ properties.adress }}
        </span>
      </div>
      <img src="../assets/images/guangbiao.png" class="poi-guangbiao">
    </div>
    <div class="poi-footer">
      <ul>
        <li v-for="(item, index) in showList">
          <div>
            <label :title="item.label">{{ item.label + "：" }}</label>
            <p :title="properties[item.text]">{{ properties[item.text] }}</p>
          </div>
        </li>
        <li>
          <div>
            <label :title="'人口'">{{ "人口" + "：" }}</label>
            <p :title="properties.rk">{{ properties.rk }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import mapUtil from "mapbox-onemap-js";

export default {
  name: "POIPopup",
  data() {
    return {
      properties: null,
      showList: [
        {
          label: "镇街",
          text: "ZJ",
        },
        {
          label: "村社",
          text: "CS",
        },
        {
          label: "网格名称",
          text: "WGMC",
        },
      ],
    }
  },
  props: ["objes"],
  created() {
    this.properties = this.objes.result.features.features[0].properties
    this.properties.name = this.properties.LZMC.split(this.properties.ZJ)[1];
    this.properties.adress = this.properties.LZMC.split(this.properties.name)[0];
    this.properties.rk = Math.round(Math.random() * 100);
  },
  methods: {
    closePoi() {
      mapUtil.closePoi(map)
    }
  },

}
</script>
<style lang="less">
.mapboxgl-popup-tip {
  display: none;
}

.mapboxgl-popup-content {
  background: transparent;
  box-shadow: none;
  -webkit-box-shadow: none;

  .mapboxgl-popup-close-button {
    display: none;
  }

  .poi-content {
    background: url(../assets/images/poiBcg.png);
    background-size: 100% 100%;
    width: 376px;
    height: 290px;
    padding: 25px 25px 25px 29px;

    .poi-header {
      width: 322px;
      height: 80px;
      background: #064B91;
      border-radius: 8px 8px 0px 0px;
      padding-top: 20px;
      padding-left: 17px;
      position: relative;

      .poi-title {
        font-size: 16px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 16px;
        width: 180px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 20px;
        display: block;
      }

      .poi-big-img {
        position: absolute;
        right: 28px;
        top: -4px;
        width: 97px;
        height: 84px;
      }

      .poi-adress {
        display: flex;
        margin-top: 12px;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 12px;

        img {
          width: 8px;
          height: 10px;
          margin-right: 7px;
        }

        span {
          width: 150px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
          height: 18px;
        }
      }

      .poi-guangbiao {
        width: 321px;
        height: 2px;
        position: absolute;
        bottom: 0;
      }

      .poi-close {
        position: absolute;
        width: 24px;
        width: 24px;
        right: 10px;
        top: 5px;
        cursor: pointer;
      }
    }

    .poi-footer {
      height: calc(100% - 80px);
      padding: 12px;
      background: rgba(11, 23, 35, 0.2);
      border: 1px rgba(255, 255, 255, 0.4) solid;
      border-radius: 0px 0px 8px 8px;
      backdrop-filter: blur(12px);

      li {
        margin-bottom: 20px;

        div {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 14px;

          label {
            opacity: 0.5;
          }

        }
      }
    }
  }
}
</style>
