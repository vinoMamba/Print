<script setup lang="ts">
import { ref, h, createApp } from "vue";
import { toDataURL } from "qrcode"
import Label from "./components/Label.vue";
import Label2 from "./components/Label2.vue";

function close() {
  window.close()
}
async function print() {
  const qrCodeUrl = await toDataURL('http://47.114.35.157:6818/pages/scan/assets?assetId=1529044134669631489&corpId=ding73b7db4ffb45819f35c2f4657eb6378f')
  const div = document.createElement('div')
  div.id = 'printMe'
  document.body.appendChild(div)
  createApp({
    render() {
      const list = []
      for (let i = 0; i < 1; i++) {
        const label = h(Label2, {
          qrCodeUrl: qrCodeUrl,
          logoUrl: 'http://47.114.35.157:8301/group1/default/20220525/15/30/5/8de1e5248538881989c104eb8481e4b7.png?name=8de1e5248538881989c104eb8481e4b7.png&download=1',
          fieldList: ['资产编码：ZHS-122311'],
          fontSize: 9
        }, {})
        list.push(label)
      }
      return list
    }
  }).mount(div)
}
const printObj = ref(
  {
    id: "printMe",
    popTitle: '打印标签',
    extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
    beforeOpenCallback(vue: any) {
      vue.printLoading = true
    },
    openCallback(vue: any) {
      vue.printLoading = false
    },
    closeCallback() {
      document.body.removeChild(document.getElementById('printMe')!)
    }
  }
)
</script>

<template>
  <main>
    <img src="./assets/print.png" alt="">
    <p>请使用Chrome浏览器，以获得最佳打印效果</p>
    <div class="button-wrapper">
      <button v-print="printObj" @click="print">打印</button>
      <button @click="close">关闭</button>
    </div>
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
<style scoped>
main {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  background-color: #eff0f4;
  padding-top: 100px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  font-size: 20px;
}

.button-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
}

button {
  border-radius: 4px;
  font-size: 16px;
  margin: 4px;
  padding: 4px 32px;
  cursor: pointer;
  border: none;
  outline: none;
  color: white;
  background-color: #48a5ff;
}
</style>
