<script lang="ts">
  import { defineComponent } from "vue";

  defineComponent({
    name: "PButton",
  });
</script>

<script lang="ts" setup>
  type ButtonProps = {
    variant?: "filled" | "outline" | "text";
    size?: "small" | "medium" | "large";
  };

  withDefaults(defineProps<ButtonProps>(), {
    variant: "filled",
    size: "medium",
  });
</script>

<template>
  <button
    class="border font-bold disabled:text-platinum-400"
    :class="{
      'bg-orange-400 hover:bg-orange-500 border-orange-400 hover:border-orange-500 text-white disabled:bg-platinum-50 disabled:border-platinum-50':
        variant === 'filled',
      'bg-transparent text-orange-400 border-orange-400 hover:border-orange-500 hover:text-orange-500 disabled:border-gray-50 disabled:text-platinum-400':
        variant === 'outline',
      'border-transparent hover:bg-orange-25 disabled:bg-transparent text-orange-400':
        variant === 'text',
      'py-2 px-4 text-sm rounded-[18px]': size === 'small',
      'py-3 px-6 text-sm rounded-[22px]': size === 'medium',
      'py-4 px-8 text-md rounded-[28px]': size === 'large',
    }"
  >
    <slot />
  </button>
</template>
