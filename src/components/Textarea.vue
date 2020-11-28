<template>
  <label class="flex flex-col">
    <div class="text-sm">{{ label }}</div>
    <textarea
      class="mt-1 w-full bg-gray-200 border-none rounded-sm relative"
      :placeholder="placeholder"
      :value="modelValue"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    label: String,
    placeholder: String,
    modelValue: String,
    rows: String,
  },
};
</script>
