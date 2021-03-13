<template>
  <div class="w-full">
    <div class="px-5 pt-5 flex items-center w-full">
      <div
        class="text-xl bg-gray-900 text-white cursor-default select-none leading-none pl-5 pr-2 h-9 flex items-center rounded-full rounded-r-none"
        title="Lower thirds that do the limbo"
      >
        Hermes
      </div>
      <button
        class="bg-gray-900 text-white rounded-full rounded-l-none pr-3 pl-2 h-9 flex items-center cursor-default hover:opacity-80 focus:opacity-80"
        title="Menu"
        @click="showMenu = !showMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-down"
          :style="{ transform: `rotate(${showMenu ? '180deg' : '0'})` }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="text-gray-500 text-sm ml-auto flex pr-4">
        <div>
          By
          <a
            class="underline hover:text-gray-900 focus:text-gray-900"
            href="https://twitter.com/JosephusPaye"
            target="_blank"
            rel="noopener"
            >Josephus</a
          >
          for
          <a
            class="underline hover:text-gray-900 focus:text-gray-900"
            href="https://twitter.com/JosephusPaye/status/1214853295023411200"
            target="_blank"
            rel="noopener"
            >#CreateWeekly</a
          >.
        </div>
        <a
          class="ml-2 hover:text-gray-900 focus:text-gray-900"
          href="https://github.com/JosephusPaye/hermes"
          target="_blank"
          rel="noopener"
          title="View source on GitHub"
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
              d="M13.18 11.309c-0.718 0-1.3 0.807-1.3 1.799 0 0.994 0.582 1.801 1.3 1.801s1.3-0.807 1.3-1.801c-0.001-0.992-0.582-1.799-1.3-1.799zM17.706 6.626c0.149-0.365 0.155-2.439-0.635-4.426 0 0-1.811 0.199-4.551 2.080-0.575-0.16-1.548-0.238-2.519-0.238-0.973 0-1.945 0.078-2.52 0.238-2.741-1.881-4.552-2.080-4.552-2.080-0.789 1.987-0.781 4.061-0.634 4.426-0.928 1.008-1.495 2.219-1.495 3.871 0 7.186 5.963 7.301 7.467 7.301 0.342 0 1.018 0.002 1.734 0.002s1.392-0.002 1.732-0.002c1.506 0 7.467-0.115 7.467-7.301 0-1.652-0.566-2.863-1.494-3.871zM10.028 16.915h-0.056c-3.771 0-6.709-0.449-6.709-4.115 0-0.879 0.31-1.693 1.047-2.369 1.227-1.127 3.305-0.531 5.662-0.531 0.010 0 0.020 0 0.029 0s0.018 0 0.027 0c2.357 0 4.436-0.596 5.664 0.531 0.735 0.676 1.045 1.49 1.045 2.369 0 3.666-2.937 4.115-6.709 4.115zM6.821 11.309c-0.718 0-1.3 0.807-1.3 1.799 0 0.994 0.582 1.801 1.3 1.801s1.301-0.807 1.301-1.801c0-0.992-0.582-1.799-1.301-1.799z"
            ></path>
          </svg>
        </a>
      </div>
    </div>

    <div
      class="bg-white shadow-lg inline-block rounded mt-1 py-4 px-4 ml-5 mr-5 max-w-xs"
      v-if="showMenu"
    >
      <label class="inline-flex">
        <input
          type="file"
          class="sr-only"
          accept=".hermeslt"
          @change="onFileChange"
        />
        <div
          class="text-gray-100 bg-gray-900 px-4 py-px rounded-full hover:bg-gray-700 focus:bg-gray-700"
        >
          Import
        </div>
      </label>
      <button
        class="text-gray-100 bg-gray-900 px-4 py-px rounded-full ml-1 cursor-default hover:bg-gray-700 focus:bg-gray-700"
        @click="onExport"
      >
        Export
      </button>
      <button
        class="text-gray-100 bg-gray-900 px-4 py-px rounded-full ml-1 cursor-default hover:bg-gray-700 focus:bg-gray-700"
        @click="onReset"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      showMenu: false,
    };
  },

  methods: {
    onFileChange(e) {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (e) => {
          const text = e.target.result;

          try {
            const data = JSON.parse(text);
            this.showMenu = false;
            this.$emit('import', data);
          } catch (err) {
            alert(`Selected file "${file.name}" is not valid`);
            console.log('File import error', err);
          }
        });

        reader.readAsText(file);
      }
    },

    onExport() {
      this.showMenu = false;
      this.$emit('export');
    },

    onReset() {
      this.showMenu = false;
      this.$emit('reset');
    },
  },
};
</script>
