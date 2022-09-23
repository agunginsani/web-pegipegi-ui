<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PRadio',
    inheritAttrs: false,
  });
</script>

<script lang="ts" setup>
  type RadioProps = {
    value?: string;
    modelValue?: string;
    disabled?: boolean;
  };

  type RadioEmits = {
    (e: 'update:modelValue', value: string): void;
  };

  withDefaults(defineProps<RadioProps>(), {
    value: '',
    modelValue: '',
    disabled: false,
  });

  const emit = defineEmits<RadioEmits>();

  function handleRadioChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  }
</script>

<template>
  <label>
    <div
      :class="[
        'relative w-[20px] h-[20px] rounded-full border-[2.5px]',
        disabled
          ? 'border-neutral-tuna-200 cursor-not-allowed'
          : 'border-orange-inter-600 cursor-pointer',
      ]"
    >
      <div
        v-if="value === modelValue"
        :class="[
          'absolute w-[10px] h-[10px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full',
          disabled ? 'bg-neutral-tuna-200' : 'bg-orange-inter-600',
        ]"
      ></div>
    </div>
    <input
      v-bind="$attrs"
      class="sr-only"
      type="radio"
      name="radio"
      :value="value"
      :disabled="disabled"
      :checked="value === modelValue"
      @change="handleRadioChange"
    />
  </label>
</template>
