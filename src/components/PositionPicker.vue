<template>
  <div>
    <label>
      <input
        type="radio"
        :checked="modelValue === 'top-left'"
        name="position"
        value="top-left"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div></div>
    </label>
    <label>
      <input
        type="radio"
        :checked="modelValue === 'top-right'"
        name="position"
        value="top-right"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div></div>
    </label>
    <label>
      <input
        type="radio"
        :checked="modelValue === 'bottom-left'"
        name="position"
        value="bottom-left"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div></div>
    </label>
    <label>
      <input
        type="radio"
        :checked="modelValue === 'bottom-right'"
        name="position"
        value="bottom-right"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div>{{ modelValue }}</div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'PositionPicker',
  props: {
    modelValue: String,
  },
};
</script>
