<template>
  <div style="page-break-after: always;" class="label-wrapper">
    <div class="left">
      <img :src="qrCodeUrl" alt="">
    </div>
    <div class="right">
      <p class="content" v-if="showField">
        <span v-for="field in fieldList"
          :style="{ 'font-size': `${fontSize}pt` }">{{ `${field.fieldName}：${field.fieldValue}` }}</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

type Field = {
  fieldName: string;
  fieldValue: string
}

defineProps({
  logoUrl: {
    type: String,
    default: ''
  },
  qrCodeUrl: {
    type: String,
    default: ''
  },
  showField: {
    type: Boolean,
    default: true
  },
  fieldList: {
    type: Array as PropType<Field[]>,
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
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

div.left {
  text-align: center;
  vertical-align: top;
  width: 100%;
}

div.right {
  padding: 0;
  overflow: hidden;
}

div.left>img {
  width: 70%;
}

div.right .content {
  display: flex;
  flex-direction: column;
}
</style>
