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
    os?: 'most_device' | 'ios';
  };

  type SwitchEmits = {
    (e: 'update:modelValue', value: boolean): void;
  };

  const emit = defineEmits<SwitchEmits>();

  const props = withDefaults(defineProps<SwitchProps>(), {
    disabled: false,
    modelValue: false,
    os: 'most_device',
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
      :class="[
        'top-2 w-[52px] h-[32px] rounded-full bg-neutral-50 relative peer-checked:[&>*]:left-5 peer-checked:bg-orange-400 transition-all duration-300 [&>*]:transition-all [&>*]:duration-300',
        {
          'bg-[#F6F6F9] [&>*]:bg-[#B3B5C6] peer-checked:bg-[#FFD5A5]':
            props.disabled && props.os === 'ios',
        },
        {
          'h-[16px] translate-y-[8px] [&>*]:-translate-y-[8px] [&>*]:left-0 peer-checked:[&>*]:left-6 peer-checked:bg-[#FFD5A5] peer-checked:[&>*]:bg-orange-400':
            props.os === 'most_device',
        },
        { 'peer-checked:[&>*]:bg-white': props.os === 'ios' },
        {
          '[&>*]:bg-[#B3B5C6] bg-[#F6F6F9] peer-checked:[&>*]:bg-[#B3B5C6] peer-checked:bg-[#F6F6F9] ':
            props.disabled && props.os === 'most_device',
        },
      ]"
    >
      <div
        class="rounded-full w-[28px] h-[28px] bg-[#8A8DA6] absolute top-[2px] left-[4px]"
      ></div>
    </div>
  </div>
</template>
