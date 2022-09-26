<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PTextarea',
    inheritAttrs: false,
  });
</script>

<script lang="ts" setup>
  type TextareaProps = {
    disabled?: boolean;
    error?: boolean;
    modelValue?: string;
  };

  type TextareaEmits = {
    (e: 'input', value: Event): void;
    (e: 'update:modelValue', value: string): void;
    (e: 'expand', value: Event): void;
  };

  const props = withDefaults(defineProps<TextareaProps>(), {
    disabled: false,
    error: false,
    modelValue: '',
  });

  const emit = defineEmits<TextareaEmits>();

  function handleInput(event: Event) {
    emit('input', event);
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }

  function handleExpand(event: Event) {
    if (!props.disabled) emit('expand', event);
  }
</script>

<template>
  <div
    :class="[
      'relative p-3 pr-7 h-full w-full border rounded-lg rounded-tl-none outline-none',
      // bg
      disabled ? 'bg-neutral-tuna-25' : error ? 'bg-red-flower-50' : 'bg-white',
      // text color
      disabled
        ? 'text-neutral-tuna-300'
        : error
        ? 'text-red-flower-700'
        : 'text-neutral-tuna-900',
      // border
      !disabled && error ? 'border-red-flower-700' : 'border-neutral-tuna-100',
      // border focus-within
      !disabled && error
        ? 'focus-within:border-red-flower-700'
        : 'focus-within:border-orange-400',
    ]"
  >
    <textarea
      :class="[
        '-mb-2 h-full w-full border-none resize-none outline-none bg-transparent placeholder:text-neutral-tuna-300 placeholder:disabled:text-neutral-tuna-100',
      ]"
      v-bind="$attrs"
      :disabled="disabled"
      :value="modelValue"
      @input="handleInput"
    ></textarea>

    <img
      :class="[
        'absolute bottom-3 right-3 ',
        !disabled ? 'cursor-pointer' : 'cursor-auto',
      ]"
      src="./expand.svg"
      alt="expand"
      @click="handleExpand"
    />
  </div>
</template>
