<script setup>
const props = defineProps({
  url: String,
})
</script>

<!-- default.vue -->
<template>
  <div class="grid grid-cols-3 w-full h-full">
    <div class="slidev-layout col-span-2">
      <slot />
    </div>
    <div relative style="width: 100%; height: 100%">
      <iframe id="frame" class="w-full h-full" :src="props.url" />
    </div>
  </div>
</template>
