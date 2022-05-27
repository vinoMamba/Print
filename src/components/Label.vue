<template>
  <div style="page-break-after: always;" class="label-wrapper">
    <div class="left">
      <img :src="url" alt="">
    </div>
    <div class="right">
      <img :src="logoUrl" alt="" v-if="logoUrl">
      <div class="content">
        <p class="field" v-for="field in fieldList" :key="field.fieldName" :style="{ 'font-size': `${fontSize}pt` }">
          <span class="field-title" v-if="showField">{{ field.fieldName }}：</span>
          <span class="field-content">{{ field.fieldValue }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue';
import { toDataURL } from "qrcode"

const props = defineProps({
  logoUrl: {
    type: String,
    default: ''
  },
  qrCodeUrl: {
    type: String,
    default: ''
  },
  fieldList: {
    type: Array as PropType<{ fieldName: string; fieldValue: string }[]>,
    default: () => []
  },
  showField: {
    type: Boolean,
    default: true
  },
  fontSize: {
    type: Number,
    default: 12
  },
  labelType: {
    type: Number,
    default: 2
  },
})
const url = ref('')
onMounted(async () => {
  url.value = await toDataURL(props.qrCodeUrl)
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
  padding: 14px;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
}

div.left>img {
  width: 90%;
}

div.right .content {
  /** 设置字体 */
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.content .field {
  display: flex;
  flex-direction: row;
}

.content .field-content {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content .field-title {
  flex-shrink: 0;
  white-space: nowrap;
}

div.right>img {
  margin-bottom: 8px;
  width: 90%;
  height: 34%;
}
</style>
