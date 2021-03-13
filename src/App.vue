<template>
  <div class="h-screen w-screen flex">
    <div
      class="w-1/3 flex flex-col bg-gray-200 border-r-2 border-gray-300 relative"
      style="min-width: 454px; max-width: 580px"
    >
      <Header
        class="absolute z-20 top-0"
        @import="onImport"
        @export="onExport"
      />
      <Editor
        :lowerThirds="lowerThirds"
        @add="addLowerThird"
        class="pt-20 h-full overflow-y-auto"
      />
    </div>
    <div class="w-2/3 flex-grow bg-gray-200 flex flex-col">
      <Preview
        :lowerThirds="lowerThirds"
        :backgroundImage="backgroundImage"
        ref="preview"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { saveAs } from 'file-saver';

import Header from './components/Header.vue';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';

import * as storage from './storage';

function randomId(prefix = '') {
  return prefix + Math.random().toString(36).substr(2, 10);
}

const saveLowerThirds = debounce(
  (lowerThirds) => {
    storage.setLastOpenLowerThirds(lowerThirds);
  },
  300,
  {
    leading: true,
    trailing: true,
  }
);

export default {
  name: 'App',

  components: {
    Header,
    Editor,
    Preview,
  },

  data() {
    return {
      backgroundImage: '',
      lowerThirds: storage.getLastOpenLowerThirds([
        this.createLowerThird(
          'John 3:16',
          'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'
        ),
      ]),
    };
  },

  watch: {
    lowerThirds: {
      deep: true,
      handler(lowerThirds) {
        saveLowerThirds(lowerThirds);
      },
    },
  },

  mounted() {
    window.addEventListener('dragover', this.onDragOver, false);
    window.addEventListener('drop', this.onDrop, false);

    this.cleanUpDrop = () => {
      window.removeEventListener('dragover', this.onDragOver, false);
      window.removeEventListener('drop', this.onDrop, false);
    };
  },

  beforeUnmount() {
    this.cleanUpDrop && this.cleanUpDrop();
  },

  methods: {
    createLowerThird(title = '', subtitle = '') {
      return {
        id: randomId('lt-'),
        title,
        subtitle,
        position: 'bottom-left',
      };
    },

    addLowerThird() {
      this.lowerThirds.push(this.createLowerThird());

      this.$nextTick(() => {
        const newSlideInput = this.$el.querySelector(
          '.editor-slide:nth-last-child(2) input'
        );

        if (newSlideInput) {
          newSlideInput.focus();
        }
      });
    },

    onDragOver(event) {
      event.preventDefault();
    },

    onDrop(event) {
      event.preventDefault();

      const file = event.dataTransfer.files[0];

      if (file && file.type.startsWith('image/')) {
        this.backgroundImage = URL.createObjectURL(file);
      }
    },

    onImport(data) {
      if (confirm('Replace the current lower thirds with the imported data?')) {
        this.lowerThirds = data;
      }
    },

    onExport() {
      const blob = new Blob([JSON.stringify(this.lowerThirds, null, '  ')], {
        type: 'text/plain;charset=utf-8',
      });

      saveAs(blob, 'Lower Thirds.hermeslt');
    },
  },
};
</script>
