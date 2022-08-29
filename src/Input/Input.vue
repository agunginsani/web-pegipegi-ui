<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "PInput",
  });
</script>

<script lang="ts" setup>
  type InputProps = {
    size?: "small" | "medium" | "large";
    error?: boolean;
    disabled?: boolean;
  };

  withDefaults(defineProps<InputProps>(), {
    size: "medium",
    error: false,
    disabled: false,
  });
</script>

<template>
  <input
    :class="[
      'border rounded-lg rounded-tl-none outline-none',
      'focus:border-orange-400',
      'disabled:bg-platinum-50',
      {
        'px-3 py-2': size === 'small',
        'p-3': size === 'medium',
        'p-4': size === 'large',
      },
      !disabled && error
        ? 'bg-red-25 border-red-400 text-red-400'
        : 'bg-transparent border-gray-50 text-gray-900',
    ]"
    :disabled="disabled"
  />
</template>
