<template>
  <div class="border border-gray-300 bg-white p-4 rounded">
    <Input label="Title" placeholder="Enter title" v-model="lowerThird.title" />
    <Textarea
      class="mt-2"
      label="Subtitle"
      rows="3"
      placeholder="Enter subtitle"
      v-model="lowerThird.subtitle"
    />
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
};
</script>
