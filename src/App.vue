<script setup lang="ts">
import { ref, h, createApp, onMounted, VNode, RendererNode, RendererElement } from "vue";
import Label from "./components/Label.vue";
import Label2 from "./components/Label2.vue";
import axios from "axios"

type Label = {
  qrCodeUrl: string;
  logoUrl: string;
  fontSize: number;
  labelHeight: number;
  fieldList: string[];
  labelWidth: number;
  labelType: number
}
type LabelComp = VNode<RendererNode, RendererElement, {
  [key: string]: any;
}>
const labelList = ref<Label[]>([])
const LabelType = ref(1)

function close() {
  window.close()
}

async function print() {
  const div = document.createElement('div')
  div.id = 'printMe'
  document.body.appendChild(div)
  createApp({
    render() {
      const list: LabelComp[] = []
      labelList.value.forEach(item => {
        //@ts-ignore
        const label = h(LabelType.value === 1 ? Label : Label2, {
          ...item,
        }, {})
        list.push(label)
      })
      return list;
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

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('auth')
  const downloadLogoIds = urlParams.get('ids')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  axios.get('/api/asset/label/export', {
    params: {
      downloadLogoIds,
      downloadType: 1,
    }
  })
    .then(function (response) {
      const { assetLabel, assetInfoList, logoUrl } = response.data.data
      LabelType.value = assetLabel.labelType
      labelList.value = assetInfoList.map((item: any) => {
        return {
          qrCodeUrl: item.qrCodeUrl,
          logoUrl,
          fontSize: assetLabel.fontSize,
          labelHeight: assetLabel.labelHeight,
          fieldList: item.assetLabelFieldList,
          showField: assetLabel.showField === 1,
          labelWidth: assetLabel.labelWidth,
          labelType: assetLabel.labelType
        }
      })
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
})
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
