<script lang="ts">
  import { defineComponent } from 'vue';

  defineComponent({
    name: 'PTextarea',
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
  };

  withDefaults(defineProps<TextareaProps>(), {
    disabled: false,
    error: false,
    modelValue: '',
  });

  const emit = defineEmits<TextareaEmits>();

  function handleInput(event: Event) {
    emit('input', event);
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
</script>

<template>
  <textarea
    :class="[
      'p-3 border rounded-lg rounded-tl-none outline-none resize',
      'focus:border-orange-400',
      'disabled:bg-platinum-50',
      !disabled && error
        ? 'bg-red-25 border-red-400 text-red-400'
        : 'bg-transparent border-gray-50 text-gray-900',
    ]"
    resize
    :disabled="disabled"
    :value="modelValue"
    @input="handleInput"
  ></textarea>
</template>
