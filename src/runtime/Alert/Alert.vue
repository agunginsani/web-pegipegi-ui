<script lang="ts" setup>
  type AlertProps = {
    color?: 'accent' | 'warning' | 'positive' | 'negative';
  };

  withDefaults(defineProps<AlertProps>(), {
    color: 'accent',
  });
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'PAlert',
  });
</script>
<template>
  <div
    role="alert"
    :class="[
      'text-black flex w-full justify-between gap-x-3 rounded-lg p-3',
      {
        'text-white': color !== 'warning',
        'bg-blue-dodger-600': color === 'accent',
        'bg-yellow-candle-300': color === 'warning',
        'bg-green-emerald-600': color === 'positive',
        'bg-red-flower-700': color === 'negative',
      },
    ]"
  >
    <slot name="icon" />
    <div class="w-full text-left">
      <slot />
    </div>
    <slot name="action" />
  </div>
</template>
