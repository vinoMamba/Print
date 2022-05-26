<template>
  <div style="page-break-after: always;" class="label-wrapper">
    <div class="left">
      <img :src="qrCodeUrl" alt="">
    </div>
    <div class="right">
      <img :src="logoUrl" alt="" v-if="logoUrl">
      <p class="content">
        <span v-for="field in fieldList" :key="field" :style="{ 'font-size': `${fontSize}pt` }">{{ field }}</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  logoUrl: {
    type: String,
    default: ''
  },
  qrCodeUrl: {
    type: String,
    default: ''
  },
  fieldList: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  fontSize: {
    type: Number,
    default: 12
  }
})
</script>

<style media="print" scoped>
@page {
  size: auto;
  margin: 0;
  padding: 0;
}

div.label-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

div.left {
  text-align: center;
  vertical-align: top;
  width: 50%;
  max-height: 50mm;
}

div.right {
  padding: 8px;
  padding-left: 0;
  padding-bottom: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

div.left>img {
  width: 90%;
}

div.right .content {
  display: flex;
  flex-direction: column;
}

div.right>img {
  width: 90%;
  height: 30%;
}
</style>
