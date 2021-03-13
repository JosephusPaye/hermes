<template>
  <div
    class="lower-third-slide bg-white aspect-w-16 aspect-h-9 h-0"
    :data-file-name="fileName"
  >
    <div
      class="bg-cover"
      :style="
        backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : null
      "
    >
      <div class="slide-number"></div>
      <button
        class="absolute right-0 top-0 mt-4 mr-4 p-2 bg-black text-white rounded-full hover:opacity-80 focus:opacity-80"
        title="Download"
        @click="startDownload"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M15 7h-3v-6h-4v6h-3l5 5 5-5zM19.338 13.532c-0.21-0.224-1.611-1.723-2.011-2.114-0.265-0.259-0.644-0.418-1.042-0.418h-1.757l3.064 2.994h-3.544c-0.102 0-0.194 0.052-0.24 0.133l-0.816 1.873h-5.984l-0.816-1.873c-0.046-0.081-0.139-0.133-0.24-0.133h-3.544l3.063-2.994h-1.756c-0.397 0-0.776 0.159-1.042 0.418-0.4 0.392-1.801 1.891-2.011 2.114-0.489 0.521-0.758 0.936-0.63 1.449l0.561 3.074c0.128 0.514 0.691 0.936 1.252 0.936h16.312c0.561 0 1.124-0.422 1.252-0.936l0.561-3.074c0.126-0.513-0.142-0.928-0.632-1.449z"
          ></path>
        </svg>
      </button>

      <!-- <rect
          :x="titleSafePadding.left"
          :y="titleSafePadding.top"
          :width="maxSafeWidth"
          :height="maxSafeHeight"
          stroke-width="4"
          stroke="red"
          fill="transparent"
        ></rect> -->

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        :viewBox="`0 0 ${width} ${height}`"
        preserveAspectRatio="xMidYMid meet"
        ref="svg"
      >
        <g v-if="titleGroup" :transform="titleTransform">
          <TextBox :group="titleGroup" :settings="titleSettings" />
        </g>

        <g v-if="subtitleGroup" :transform="subtitleTransform">
          <TextBox
            v-if="subtitleGroup"
            :group="subtitleGroup"
            :settings="subtitleSettings"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import TextBox from './TextBox.vue';

const illegalRe = /[\/\?<>\\:\*\|":]/g;
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;

function sanitizeFileName(input, replacement = '_') {
  const sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement);

  return sanitized.slice(0, 255);
}

export default {
  name: 'LowerThirdSlide',

  components: { TextBox },

  props: {
    titleGroup: Object,
    titleSettings: Object,
    subtitleGroup: Object,
    subtitleSettings: Object,
    backgroundImage: String,
    titleSubtitleGap: Number,
    titleSafePadding: Object,
    width: Number,
    height: Number,
    maxSafeWidth: Number,
    maxSafeHeight: Number,
    index: Number,
  },

  computed: {
    titleTransform() {
      if (!this.titleGroup) {
        return undefined;
      }

      const x = this.titleSafePadding.left;
      let y = 0;

      if (this.subtitleGroup) {
        y =
          this.height -
          this.titleSafePadding.bottom -
          this.subtitleGroup.paddedHeight -
          this.titleSubtitleGap -
          this.titleGroup.paddedHeight;
      } else {
        y =
          this.height -
          this.titleSafePadding.bottom -
          this.titleGroup.paddedHeight;
      }

      return `translate(${x},${y})`;
    },

    subtitleTransform() {
      if (!this.subtitleGroup) {
        return undefined;
      }

      const x = this.titleSafePadding.left;
      const y =
        this.height -
        this.titleSafePadding.bottom -
        this.subtitleGroup.paddedHeight;

      return `translate(${x},${y})`;
    },

    fileName() {
      return sanitizeFileName(
        `${
          this.titleGroup?.lines[0].text ||
          this.subtitleGroup?.lines[0].text ||
          'slide'
        }.svg`
      );
    },
  },

  methods: {
    createDownloadableSVG() {
      const svg = this.$refs.svg.outerHTML;
      return (
        `<?xml version="1.0" standalone="no"?>` +
        '\n' +
        svg.replace(/&nbsp;/g, '&#x00a0;')
      );
    },

    startDownload() {
      const file = this.createDownloadableSVG();

      const [index, totalSlides] = this.findIndex();
      const count = String(index + 1).padStart(String(totalSlides).length, '0');

      this.download(`${count} - ${this.fileName}`, file);
    },

    download(filename, text) {
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
      );
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },

    findIndex() {
      const slides = Array.from(
        this.$el.parentElement.querySelectorAll('.lower-third-slide')
      );

      const index = slides.findIndex((element) => {
        return element === this.$el;
      });

      return [index, slides.length];
    },
  },
};
</script>

<style scoped>
.slide-number {
  font-family: 'Inter var';
  font-weight: 800;
  font-size: 172px;
  letter-spacing: -0.1em;
  position: absolute;
  opacity: 0.05;
  line-height: 1;
  top: -21px;
  left: -7px;
}

.slide-number::before {
  counter-increment: slides-counter;
  content: counter(slides-counter, decimal-leading-zero);
}
</style>
