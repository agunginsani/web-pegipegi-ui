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
    <input
      v-bind="$attrs"
      class="peer sr-only"
      type="radio"
      name="radio"
      :value="value"
      :disabled="disabled"
      :checked="value === modelValue"
      @change="handleRadioChange"
    />
    <div
      :class="[
        'relative w-[20px] h-[20px] rounded-full border-[2.5px]',
        'peer-disabled:border-neutral-tuna-200 peer-disabled:cursor-not-allowed border-orange-inter-600 cursor-pointer',
        '[&>*]:hidden peer-checked:[&>*]:block peer-disabled:[&>*]:bg-neutral-tuna-200 peer-checked:[&>*]:bg-orange-inter-600',
      ]"
    >
      <div
        class="absolute w-[10px] h-[10px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
    </div>
  </label>
</template>
