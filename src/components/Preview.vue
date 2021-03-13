<template>
  <div class="h-screen relative">
    <div
      class="px-20 flex w-full pt-5 text-gray-500 absolute select-none text-sm"
    >
      <div>Drag and drop an image onto a slide to preview.</div>
      <button
        class="ml-auto hover:text-black focus:text-black"
        @click="downloadAll"
      >
        Download all
      </button>
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
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import LowerThird from './LowerThird.vue';

export default {
  name: 'Preview',

  components: { LowerThird },

  props: {
    lowerThirds: Array,
    backgroundImage: String,
  },

  methods: {
    downloadAll() {
      const zip = new JSZip();

      const slides = Array.from(
        this.$el.querySelectorAll('.lower-third-slide svg.slide-rendered')
      );

      slides.forEach((slide, i) => {
        const fileName =
          slide.closest('.lower-third-slide')?.dataset.fileName ?? 'slide.svg';

        const count = String(i + 1).padStart(String(slides.length).length, '0');

        const svg =
          `<?xml version="1.0" standalone="no"?>` +
          '\n' +
          slide.outerHTML.replace(/&nbsp;/g, '&#x00a0;');

        zip.file(`${count} - ${fileName}`, svg);
      });

      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'Lower Thirds.zip');
      });
    },
  },
};
</script>

<style scoped>
.preview {
  counter-reset: slides-counter;
}

.preview::after {
  content: '';
  display: block;
  height: 32px;
  width: 100%;
}
</style>
