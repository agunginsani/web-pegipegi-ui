<script lang="ts" setup>
  type SwitchProps = {
    disabled?: boolean;
    modelValue?: Array<string>;
    value?: string;
  };

  type SwitchEmits = {
    (e: 'update:modelValue', value: Array<string>): void;
  };

  const props = withDefaults(defineProps<SwitchProps>(), {
    disabled: false,
    modelValue: () => [],
    value: '',
  });

  const emit = defineEmits<SwitchEmits>();

  function onSwitchChange(event: Event) {
    const { value, checked } = event.target as HTMLInputElement;
    const results = props.modelValue.filter((val) => val !== value);

    if (checked) results.push(value);
    emit('update:modelValue', results);
  }
</script>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PSwitch',
    inheritAttrs: false,
  });
</script>

<template>
  <label>
    <input
      :checked="props.modelValue.includes(props.value)"
      :value="props.value"
      class="peer sr-only"
      type="checkbox"
      :disabled="props.disabled"
      v-bind="$attrs"
      @change="onSwitchChange"
    />
    <div
      :class="[
        // base styling
        'top-2 h-[16px] w-[52px] translate-y-[8px] rounded-full bg-neutral-tuna-50 transition-all duration-300 peer-checked:[&>*]:left-6',
        // enable modifier
        'peer-checked:bg-purple-affair-200 peer-checked:[&>*]:bg-purple-affair-700',
        // disabled modifier
        'peer-disabled:bg-neutral-tuna-25 peer-checked:peer-disabled:bg-neutral-tuna-50 peer-disabled:[&>*]:bg-neutral-tuna-200 peer-checked:peer-disabled:[&>*]:bg-neutral-tuna-200',
      ]"
    >
      <div
        class="absolute left-0 top-[2px] h-[28px] w-[28px] -translate-y-[8px] rounded-full bg-neutral-tuna-300 transition-all duration-300"
      ></div>
    </div>
  </label>
</template>
