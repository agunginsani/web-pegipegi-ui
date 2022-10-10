<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PSwitch',
    inheritAttrs: false,
  });
</script>

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

<template>
  <label>
    <input
      v-bind="$attrs"
      :checked="props.modelValue.includes(props.value)"
      :value="props.value"
      class="peer sr-only"
      type="checkbox"
      :disabled="props.disabled"
      @change="onSwitchChange"
    />
    <div
      :class="{
        // base styling
        'top-2 w-[52px] rounded-full bg-neutral-tuna-50 h-[16px] translate-y-[8px] transition-all duration-300 peer-checked:[&>*]:left-6': true,
        // enable modifier
        'peer-checked:bg-purple-affair-200 peer-checked:[&>*]:bg-purple-affair-700':
          !props.disabled,
        // disabled modifier
        '[&>*]:bg-neutral-tuna-200 bg-neutral-tuna-25 peer-checked:[&>*]:bg-neutral-tuna-200 peer-checked:bg-neutral-tuna-50':
          props.disabled,
      }"
    >
      <div
        class="rounded-full w-[28px] h-[28px] bg-neutral-tuna-300 absolute top-[2px] left-0 duration-300 transition-all -translate-y-[8px]"
      ></div>
    </div>
  </label>
</template>
