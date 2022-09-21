<script lang="ts">
  import { defineComponent } from 'vue';

  defineComponent({
    name: 'PSwitch',
  });
</script>

<script lang="ts" setup>
  type SwitchProps = {
    disabled?: boolean; // default `false`
    modelValue?: boolean; // default `false`
  };

  type SwitchEmits = {
    (e: 'update:modelValue', value: boolean): void;
  };

  const emit = defineEmits<SwitchEmits>();

  const props = withDefaults(defineProps<SwitchProps>(), {
    disabled: false,
    modelValue: false,
  });
</script>

<template>
  <div>
    <input
      :checked="props.modelValue"
      class="peer w-[52px] h-[52px] absolute opacity-0 z-[1]"
      type="checkbox"
      :disabled="props.disabled"
      @change="emit('update:modelValue', !props.modelValue)"
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
