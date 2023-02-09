<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import patternIcon from './pattern.svg';

  export default defineComponent({
    name: 'PBanner',
    inheritAttrs: false,
  });
</script>

<script lang="ts" setup>
  type BannerProps = {
    color?: 'neutral' | 'accent' | 'info' | 'warning' | 'positive' | 'negative';
    priority?: 'high' | 'low';
  };

  const props = withDefaults(defineProps<BannerProps>(), {
    color: 'neutral',
    priority: 'high',
  });

  type BannerEmits = {
    (e: 'close'): void;
  };
  const emit = defineEmits<BannerEmits>();

  function onClose(): void {
    emit('close');
  }

  const wrapperStyle = computed(() => {
    switch (props.color) {
      case 'accent':
        switch (props.priority) {
          case 'low':
            return 'bg-orange-inter-50';
          default:
            return 'bg-orange-inter-600';
        }
      case 'info':
        switch (props.priority) {
          case 'low':
            return 'bg-blue-dodger-50';
          default:
            return 'bg-blue-dodger-600';
        }
      case 'warning':
        switch (props.priority) {
          case 'low':
            return 'bg-yellow-candle-50';
          default:
            return 'bg-yellow-candle-300';
        }
      case 'positive':
        switch (props.priority) {
          case 'low':
            return 'bg-green-emerald-50';
          default:
            return 'bg-green-emerald-600';
        }
      case 'negative':
        switch (props.priority) {
          case 'low':
            return 'bg-red-flower-50';
          default:
            return 'bg-red-flower-700';
        }
      default:
        return 'bg-neutral-tuna-0';
    }
  });

  const contentStyle = computed(() => {
    switch (props.color) {
      case 'accent':
        switch (props.priority) {
          case 'low':
            return 'text-neutral-tuna-900';
          default:
            return 'text-neutral-tuna-0';
        }
      case 'info':
        switch (props.priority) {
          case 'low':
            return 'text-blue-dodger-700';
          default:
            return 'text-neutral-tuna-0';
        }
      case 'warning':
        return 'text-neutral-tuna-900';
      case 'positive':
        switch (props.priority) {
          case 'low':
            return 'text-green-emerald-700';
          default:
            return 'text-neutral-tuna-0';
        }
      case 'negative':
        switch (props.priority) {
          case 'low':
            return 'text-red-flower-700';
          default:
            return 'text-neutral-tuna-0';
        }
      default:
        return 'text-neutral-tuna-900';
    }
  });

  const buttonStyle = computed(() => {
    switch (props.color) {
      case 'accent':
        switch (props.priority) {
          case 'low':
            return 'fill-neutral-tuna-900';
          default:
            return 'fill-neutral-tuna-0';
        }
      case 'info':
        switch (props.priority) {
          case 'low':
            return 'fill-blue-dodger-700';
          default:
            return 'fill-neutral-tuna-0';
        }
      case 'warning':
        return 'fill-neutral-tuna-900';
      case 'positive':
        switch (props.priority) {
          case 'low':
            return 'fill-green-emerald-700';
          default:
            return 'fill-neutral-tuna-0';
        }
      case 'negative':
        switch (props.priority) {
          case 'low':
            return 'fill-red-flower-700';
          default:
            return 'fill-neutral-tuna-0';
        }
      default:
        return 'fill-orange-inter-600';
    }
  });
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${patternIcon})` }"
    class="relative flex items-stretch gap-3 rounded-lg bg-[length:105px_72px] bg-right-bottom bg-no-repeat py-2 pl-5 pr-11"
    :class="wrapperStyle"
  >
    <slot name="icon" />
    <div class="text-sm" :class="contentStyle">
      <slot name="title" />
      <slot name="description" />
    </div>
    <div class="absolute top-5 right-5">
      <slot v-if="$slots.action" name="action" />
      <button v-else @click="onClose()">
        <svg
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="['h-3.5 w-3.5', buttonStyle]"
        >
          <path
            d="M1.67216 13.4369C1.36587 13.7432 0.869266 13.7432 0.562972 13.4369C0.256679 13.1306 0.256679 12.634 0.562972 12.3278L5.89073 6.99999L0.562972 1.67224C0.256679 1.36594 0.256679 0.869342 0.562972 0.563049C0.869266 0.256755 1.36587 0.256755 1.67216 0.563049L6.99992 5.89081L12.3277 0.563049C12.634 0.256755 13.1306 0.256755 13.4369 0.563049C13.7432 0.869342 13.7432 1.36594 13.4369 1.67224L8.10911 6.99999L13.4369 12.3278C13.7432 12.634 13.7432 13.1306 13.4369 13.4369C13.1306 13.7432 12.634 13.7432 12.3277 13.4369L6.99992 8.10918L1.67216 13.4369Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
