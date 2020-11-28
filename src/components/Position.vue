<template>
  <div>
    <label>
      <div>{{ label }}</div>
      <div>
        <PositionPicker
          :modelValue="modelValue"
          @update:modelValue="$emit('update:modelValue', $event)"
        />
      </div>
    </label>
  </div>
</template>

<script>
import PositionPicker from './PositionPicker.vue';

export default {
  name: 'Position',
  components: { PositionPicker },
  props: {
    label: String,
    modelValue: String,
  },
};
</script>
