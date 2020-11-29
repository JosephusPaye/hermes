<template>
  <div class="h-screen relative">
    <div class="text-center w-full pt-5 text-gray-500 absolute text-sm">
      Drag and drop an image onto a slide to preview.
    </div>
    <div class="h-full bg-gray-200 overflow-y-auto p-16">
      <div
        class="preview grid grid-cols-1 gap-8 h-full mx-auto ma-w max-w-6xl relative bg-gray-200 z-10"
      >
        <LowerThird
          v-for="lowerThird in lowerThirds"
          :key="lowerThird.id"
          :lowerThird="lowerThird"
          :backgroundImage="backgroundImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LowerThird from './LowerThird.vue';

export default {
  name: 'Preview',
  components: { LowerThird },
  props: {
    lowerThirds: Array,
    backgroundImage: String,
  },
};
</script>

<style scoped>
.preview::after {
  content: '';
  display: block;
  height: 32px;
  width: 100%;
}
</style>
