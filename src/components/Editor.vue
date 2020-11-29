<template>
  <div class="px-5 py-3">
    <EditorSlide
      v-for="(lowerThird, index) in lowerThirds"
      :key="lowerThird.id"
      :lowerThird="lowerThird"
      :class="{ 'mt-4': index !== 0 }"
    />
    <button
      @click="$emit('add')"
      class="mt-4 bg-black hover:opacity-80 focus:opacity-80 cursor-default text-white flex items-center justify-center py-1 w-64 mx-auto rounded-full"
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
          d="M16 10c0 0.553-0.048 1-0.601 1h-4.399v4.399c0 0.552-0.447 0.601-1 0.601s-1-0.049-1-0.601v-4.399h-4.399c-0.552 0-0.601-0.447-0.601-1s0.049-1 0.601-1h4.399v-4.399c0-0.553 0.447-0.601 1-0.601s1 0.048 1 0.601v4.399h4.399c0.553 0 0.601 0.447 0.601 1z"
        ></path>
      </svg>
      <div class="ml-1">Add another</div>
    </button>
  </div>
</template>

<script>
import EditorSlide from './EditorSlide.vue';

export default {
  name: 'Editor',
  components: { EditorSlide },
  props: {
    lowerThirds: Array,
  },
};
</script>
