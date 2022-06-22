<template>
  <div class="PointDataModal">
    <div class="PointDataModal-bg">
      <ul>
        <li v-for="(val, key, index) in properties">
          <div>
            <label :title="key">{{ key }}</label>
            <p :title="val">{{ val }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SprinkleModal",
  data() {
    return {
      properties: null
    }
  },
  props: ["objes"],
  created() {
    this.properties = this.objes.properties
  },

}
</script>
<style lang="less" scoped>
.PointDataModal {
  width: 370px;
  height: 287px;
  background: url(../assets/images/SprinkleModal.png);
  background-size: 100% 100%;
  padding: 26px 27px 33px 26px;

  .PointDataModal-bg {
    height: calc(100%);
    backdrop-filter: blur(12px);
    padding: 6px 3px 6px 6px;
    border-radius: 8px;
  }

  ul {
    overflow: auto;
    height: 100%;

    li {
      margin-bottom: 20px;
      margin-right: 15px;

      div {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 14px;

        label {
          width: 150px;
          opacity: 0.5;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        p {
          width: calc(100% - 150px);
          text-align: right;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }


}
</style >
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

}
</style>