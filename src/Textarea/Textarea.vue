<script lang="ts">
  export default {
    name: 'PTextarea',
    inheritAttrs: false,
  };
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
      'relative p-3 pr-7 h-full w-full border rounded-lg rounded-tl-none outline-none focus-within:border-orange-400',
      disabled ? 'bg-platinum-50 text-gray-300' : 'bg-white',
      !disabled && error
        ? 'bg-red-25 border-red-400 text-red-400'
        : 'bg-transparent border-gray-50 text-gray-900',
    ]"
  >
    <textarea
      :class="[
        '-mb-2 h-full w-full border-none resize-none outline-none bg-transparent',
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
