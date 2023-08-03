<script lang="ts" setup>
  type RadioProps = {
    value?: string;
    modelValue?: string;
    disabled?: boolean;
  };

  type RadioEmits = (e: 'update:modelValue', value: string) => void;

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

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PRadio',
    inheritAttrs: false,
  });
</script>

<template>
  <label>
    <input
      class="peer sr-only"
      type="radio"
      name="radio"
      :value="value"
      :disabled="disabled"
      :checked="value === modelValue"
      v-bind="$attrs"
      @change="handleRadioChange"
    />
    <div
      :class="[
        'relative h-[20px] w-[20px] rounded-full border-[2.5px]',
        'cursor-pointer border-neutral-tuna-300 peer-checked:border-purple-affair-700 peer-disabled:cursor-not-allowed peer-disabled:border-neutral-tuna-200',
        '[&>*]:hidden peer-checked:[&>*]:block peer-checked:[&>*]:bg-purple-affair-700 peer-disabled:[&>*]:bg-neutral-tuna-200',
      ]"
    >
      <div
        class="absolute left-1/2 top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 transform rounded-full"
      />
    </div>
  </label>
</template>
