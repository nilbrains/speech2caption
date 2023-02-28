<script setup>
import { NSpace, NInput } from "naive-ui";
import { useSettingStore } from "../store";
const setting = useSettingStore();
</script>

<template>
  <div class="caption">
    <n-space vertical>
      <n-input
        v-model:value="setting.background"
        type="text"
        placeholder="背景颜色"
      >
        <template #prefix> 背景颜色 </template></n-input
      >

      <n-input
        v-model:value="setting.fontsize"
        type="text"
        placeholder="字体大小"
      >
        <template #prefix> 字体大小 </template></n-input
      >

      <n-input v-model:value="setting.color" type="text" placeholder="字体颜色">
        <template #prefix> 字体颜色 </template></n-input
      >
    </n-space>
  </div>
</template>

<style></style>
