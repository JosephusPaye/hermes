<template>
  <div class="h-screen relative">
    <div class="w-full absolute">
      <div
        class="px-20 w-full mx-auto max-w-6xl flex pt-5 text-gray-500 select-none text-sm"
      >
        <div>Drag and drop an image onto a slide to preview.</div>
        <button
          class="ml-auto hover:text-black focus:text-black flex align-middle justify-center"
          @click="downloadAll"
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="mr-1"
          >
            <path
              fill="currentColor"
              d="M15 7h-3v-6h-4v6h-3l5 5 5-5zM19.338 13.532c-0.21-0.224-1.611-1.723-2.011-2.114-0.265-0.259-0.644-0.418-1.042-0.418h-1.757l3.064 2.994h-3.544c-0.102 0-0.194 0.052-0.24 0.133l-0.816 1.873h-5.984l-0.816-1.873c-0.046-0.081-0.139-0.133-0.24-0.133h-3.544l3.063-2.994h-1.756c-0.397 0-0.776 0.159-1.042 0.418-0.4 0.392-1.801 1.891-2.011 2.114-0.489 0.521-0.758 0.936-0.63 1.449l0.561 3.074c0.128 0.514 0.691 0.936 1.252 0.936h16.312c0.561 0 1.124-0.422 1.252-0.936l0.561-3.074c0.126-0.513-0.142-0.928-0.632-1.449z"
            ></path>
          </svg>
          Download all
        </button>
      </div>
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
