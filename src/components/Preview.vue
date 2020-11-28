<template>
  <div class="preview grid grid-cols-1 gap-8 h-full overflow-y-auto p-16">
    <LowerThird
      v-for="lowerThird in lowerThirds"
      :key="lowerThird.id"
      :lowerThird="lowerThird"
      :backgroundImage="backgroundImage"
    />
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
