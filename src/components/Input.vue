<template>
  <label class="flex flex-col">
    <div class="text-sm">{{ label }}</div>
    <input
      class="mt-1 w-full leading-none h-8 bg-gray-200 border-none rounded-sm relative"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: String,
    placeholder: String,
    modelValue: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
  },
  emits: ['update:modelValue'],
};
</script>
