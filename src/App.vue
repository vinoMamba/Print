<script setup lang="ts">
import { ref, h, createApp } from "vue";
import Label from "./components/Label.vue";

const containerRef = ref<HTMLDivElement | null>(null)
function close() {
  window.close()
}
function print() {
  const div = document.createElement('div')
  div.id = 'printMe'
  document.body.appendChild(div)
  createApp({
    render() {
      const list = []
      for (let i = 0; i < 1000; i++) {
        const label = h(Label, {
          props: {
            title: `hello ${i}`
          }
        })
        list.push(label)
      }
      return list
    }
  }).mount(div)
}
const printObj = ref(
  {
    id: "printMe",
    popTitle: 'good print',
    extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
    beforeOpenCallback(vue: any) {
      vue.printLoading = true
    },
    openCallback(vue: any) {
      vue.printLoading = false
      console.log('执行了打印')
    },
    closeCallback(vue: any) {
      console.log('关闭了打印工具')
      document.body.removeChild(document.getElementById('printMe')!)
    }
  }
)
</script>

<template>
  <main>
    <button v-print="printObj" @click="print">打印</button>
    <button @click="close">关闭</button>
    <div ref="containerRef" class="container">
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
  border: 1px solid red;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
<style scoped>
main {

  height: 100vh;
  width: 100vw;
}
</style>
