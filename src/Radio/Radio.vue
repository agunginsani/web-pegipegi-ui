<script lang="ts">
  import { defineComponent, ref } from 'vue';

  defineComponent({
    name: 'PRadio',
  });
</script>

<script lang="ts" setup>
  type RadioProps = {
    value?: string;
    disabled?: boolean;
    label?: string;
    modelValue?: string;
  };

  type RadioEmits = {
    (e: 'update:modelValue', value: string): void;
  };

  withDefaults(defineProps<RadioProps>(), {
    value: '',
    disabled: false,
    label: '',
    modelValue: '',
  });

  const emit = defineEmits<RadioEmits>();

  const uuid = Date.now() + Math.random();

  function handleRadioChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
</script>

<template>
  <label
    :for="`radio-${uuid}`"
    :class="[
      'flex gap-[5px]',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <div
      :class="[
        'relative w-[20px] h-[20px] rounded-full border-[2.5px]',
        disabled ? 'border-neutral-200' : 'border-orange-400',
      ]"
    >
      <div
        v-if="value === modelValue"
        :class="[
          'absolute w-[10px] h-[10px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full',
          disabled ? 'bg-neutral-200' : 'bg-orange-400',
        ]"
      ></div>
    </div>
    <span v-if="label">{{ label }}</span>
  </label>
  <input
    :id="`radio-${uuid}`"
    class="sr-only"
    type="radio"
    name="radio"
    :value="value"
    :disabled="disabled"
    :checked="value === modelValue"
    @change="handleRadioChange"
  />
</template>
