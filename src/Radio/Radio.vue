<script lang="ts">
  import { defineComponent, ref } from 'vue';

  defineComponent({
    name: 'PRadio',
  });
</script>

<script lang="ts" setup>
  type RadioProps = {
    label?: string;
    disabled?: boolean;
    modelValue?: string;
    value?: string;
  };

  type RadioEmits = {
    (e: 'update:modelValue', value: string): void;
  };

  withDefaults(defineProps<RadioProps>(), {
    label: '',
    disabled: false,
    modelValue: '',
    value: '',
  });

  const emit = defineEmits<RadioEmits>();

  const radio = ref<HTMLInputElement | null>(null);
  const uuid = Date.now() + Math.random();

  function handleRadioChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
</script>

<template>
  <label
    :for="`radio-${uuid}`"
    :class="[
      'flex gap-[5px] cursor-pointer',
      { 'cursor-not-allowed': radio?.disabled },
    ]"
  >
    <div
      class="relative w-[20px] h-[20px] rounded-full border-[2.5px] border-orange-400"
    >
      <div
        v-if="value === modelValue"
        class="bg-orange-400 w-[10px] h-[10px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
      ></div>
    </div>
    <span v-if="label">{{ label }}</span>
  </label>
  <input
    :id="`radio-${uuid}`"
    ref="radio"
    class="sr-only"
    type="radio"
    name="radio"
    :value="value"
    :disabled="disabled"
    @change="handleRadioChange"
  />
</template>
