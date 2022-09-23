<script lang="ts">
  import { defineComponent } from 'vue';

  defineComponent({
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

  function onSwitchChange() {
    let result: Array<string> = [];
    if (props.modelValue.includes(props.value)) {
      result = props.modelValue.filter((val) => val !== props.value);
    } else {
      result = [...props.modelValue, props.value];
    }
    emit('update:modelValue', result);
  }
</script>

<template>
  <div>
    <input
      v-bind="$attrs"
      :checked="props.modelValue.includes(props.value)"
      :value="props.value"
      class="peer w-[52px] h-[52px] absolute opacity-0 z-[1]"
      type="checkbox"
      :disabled="props.disabled"
      @change="onSwitchChange"
    />
    <div
      :class="{
        // base styling
        'top-2 w-[52px] rounded-full bg-neutral-50 h-[16px] translate-y-[8px] transition-all duration-300': true,
        // peer modifier
        'peer-checked:bg-orange-75 peer-checked:[&>*]:bg-orange-400 peer-checked:[&>*]:left-6': true,
        // disabled modifier
        '[&>*]:bg-neutral-100 bg-[#F6F6F9] peer-checked:[&>*]:bg-neutral-100 peer-checked:bg-neutral-50 ':
          props.disabled,
      }"
    >
      <div
        class="rounded-full w-[28px] h-[28px] bg-neutral-400 absolute top-[2px] left-0 duration-300 transition-all -translate-y-[8px]"
      ></div>
    </div>
  </div>
</template>
