<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue';

  export default defineComponent({
    name: 'PCounter',
    inheritAttrs: false,
  });
</script>

<script lang="ts" setup>
  type CounterProps = {
    max?: number;
    min?: number;
    modelValue?: number;
    disabled?: boolean;
  };

  const props = withDefaults(defineProps<CounterProps>(), {
    max: 100,
    min: 0,
    modelValue: 0,
    disabled: false,
  });

  type CounterEmits = {
    (e: 'update:modelValue', value: number): void;
  };
  const emit = defineEmits<CounterEmits>();

  const counterDisplay = computed(() => {
    if (props.modelValue > 99) {
      return `99+`;
    }
    return props.modelValue;
  });

  onMounted(() => {
    if (props.modelValue > props.max) {
      emit('update:modelValue', props.max);
    }
  });

  const disabledIncrement = computed(
    () => props.modelValue >= props.max || props.disabled
  );

  const disabledDecrement = computed(
    () => props.modelValue <= props.min || props.disabled
  );

  function incrementCounter(): void {
    emit('update:modelValue', props.modelValue + 1);
  }

  function decrementCounter(): void {
    emit('update:modelValue', props.modelValue - 1);
  }
</script>

<template>
  <div class="flex gap-1.5 items-center">
    <button
      class="w-9 h-9 rounded-full bg-neutral-tuna-50"
      :class="{ 'cursor-auto pointer-events-none': disabledDecrement }"
      @click="decrementCounter()"
    >
      <svg
        width="16"
        height="4"
        viewBox="0 0 16 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="m-auto"
        :class="
          disabledDecrement ? 'fill-neutral-tuna-200' : 'fill-orange-inter-600'
        "
      >
        <path
          d="M14.3333 0.666672H1.66666C0.666729 0.666672 0.666656 1.44772 0.666656 2.00001C0.666656 2.55229 0.666584 3.33334 1.66666 3.33334H14.3333C15.3333 3.33334 15.3333 2.55229 15.3333 2.00001C15.3333 1.44772 15.3333 0.666672 14.3333 0.666672Z"
        />
      </svg>
      <span class="sr-only">Decrement</span>
    </button>
    <input
      v-bind="$attrs"
      readonly
      class="w-9 text-center text-lg font-bold text-neutral-tuna-tuna-900 outline-0"
      :class="{ 'text-neutral-tuna-200': disabled }"
      :value="counterDisplay"
    />
    <button
      class="w-9 h-9 rounded-full bg-neutral-tuna-50"
      :class="{ 'cursor-auto pointer-events-none': disabledIncrement }"
      @click="incrementCounter()"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="m-auto"
        :class="
          disabledIncrement ? 'fill-neutral-tuna-200' : 'fill-orange-inter-600'
        "
      >
        <path
          d="M15.3333 8C15.3333 7.44772 15.3333 6.66667 14.3333 6.66667L9.33333 6.66667V1.66667C9.33333 0.666672 8.55228 0.666672 8 0.666672C7.44771 0.666672 6.66666 0.666672 6.66666 1.66667V6.66667L1.66666 6.66667C0.666664 6.66667 0.666664 7.44772 0.666664 8C0.666664 8.55229 0.666664 9.33334 1.66666 9.33334H6.66666V14.3333C6.66666 15.3333 7.44771 15.3333 8 15.3333C8.55228 15.3333 9.33333 15.3333 9.33333 14.3333L9.33333 9.33334H14.3333C15.3333 9.33334 15.3333 8.33334 15.3333 8Z"
        />
      </svg>
      <span class="sr-only">Increment</span>
    </button>
  </div>
</template>
