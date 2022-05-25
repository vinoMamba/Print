<template>
  <div>
    {{ title }}
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'hello'
  }
})
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  margin: 0 auto;
}

div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  width: 100%;
  height: 45mm;
  border: 1px solid black;
}
</style>

<style media="print" scoped>
@page {
  size: 100mm 50mm;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  margin: 0 auto;
}

#printMe {
  display: block;
}

div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  width: 100%;
  height: 45mm;
  border: 1px solid black;
}
</style>
