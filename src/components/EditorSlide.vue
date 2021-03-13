<template>
  <div
    class="editor-slide border border-gray-300 bg-white p-4 rounded focus:outline-none focus:ring focus:border-blue-300"
    tabindex="0"
    @click.self="focus"
    @keydown.self="onKeydown"
  >
    <div @click.stop @keydown.stop>
      <Input
        label="Title"
        placeholder="Enter title"
        v-model="lowerThird.title"
      />
      <Textarea
        class="mt-2"
        label="Subtitle"
        rows="3"
        placeholder="Enter subtitle"
        v-model="lowerThird.subtitle"
      />
    </div>
    <!-- <Position class="mt-2" label="Position" v-model="lowerThird.position" /> -->
  </div>
</template>

<script>
import Input from './Input.vue';
import Textarea from './Textarea.vue';
import Position from './Position.vue';

export default {
  name: 'EditorSlide',

  components: { Input, Textarea, Position },

  props: {
    lowerThird: Object,
  },

  methods: {
    focus() {
      this.$el.focus();
    },

    onKeydown(e) {
      if (e.key === 'Delete') {
        this.$emit('remove');
        e.preventDefault();
      } else if (e.key === 'd') {
        this.$emit('duplicate');
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        this.$emit('move-up');
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        this.$emit('move-down');
        e.preventDefault();
      } else if (e.key === 'b') {
        this.$emit('insert-before');
        e.preventDefault();
      } else if (e.key === 'a') {
        this.$emit('insert-after');
        e.preventDefault();
      }
    },
  },
};
</script>
