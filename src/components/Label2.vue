<template>
  <div style="page-break-after: always;" class="label-wrapper"
    :style="{ 'flexDirection': labelType === 3 ? 'column-reverse' : 'column' }">
    <div class="left">
      <img :src="url" alt="">
    </div>
    <div class="right">
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
import { toDataURL } from 'qrcode';
import { onMounted, PropType, ref } from 'vue';

const props = defineProps({
  logoUrl: {
    type: String,
    default: ''
  },
  qrCodeUrl: {
    type: String,
    default: ''
  },
  labelType: {
    type: Number,
    default: 2
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
  }
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
