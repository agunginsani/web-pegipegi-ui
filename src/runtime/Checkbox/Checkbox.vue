<script lang="ts" setup>
  type CheckboxProps = {
    value?: string;
    indeterminate?: boolean;
    disabled?: boolean;
    modelValue?: Array<string>;
  };

  type CheckboxEmits = {
    (e: 'input', value: Event): void;
    (e: 'update:modelValue', value: Array<string>): void;
  };

  const props = withDefaults(defineProps<CheckboxProps>(), {
    value: '',
    indeterminate: false,
    disabled: false,
    modelValue: () => [],
  });

  const emit = defineEmits<CheckboxEmits>();

  function handleChange(event: Event) {
    const { value, checked } = event.target as HTMLInputElement;
    if (checked) {
      emit('update:modelValue', [...props.modelValue, value]);
    } else {
      emit(
        'update:modelValue',
        props.modelValue.filter((val) => val !== value)
      );
    }
  }
</script>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PCheckbox',
    inheritAttrs: false,
  });
</script>

<template>
  <label class="flex items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :checked="modelValue.includes(value)"
      :value="value"
      v-bind="$attrs"
      @change="handleChange"
      @input="$emit('input', $event)"
    />
    <!-- Enabled state. -->
    <img
      class="peer-checked:hidden peer-indeterminate:hidden peer-disabled:hidden"
      src="./outline.svg"
      alt=""
    />
    <img
      class="hidden peer-checked:inline peer-indeterminate:hidden peer-disabled:hidden"
      src="./checked.svg"
      alt=""
    />
    <img
      class="hidden peer-indeterminate:inline peer-disabled:hidden"
      src="./indeterminate.svg"
      alt=""
    />
    <!-- Disabled state. -->
    <img
      class="peer-checked:hidden peer-indeterminate:hidden peer-enabled:hidden"
      src="./outline-disabled.svg"
      alt=""
    />
    <img
      class="hidden peer-checked:inline peer-indeterminate:hidden peer-enabled:hidden"
      src="./checked-disabled.svg"
      alt=""
    />
    <img
      class="hidden peer-indeterminate:inline peer-enabled:hidden"
      src="./indeterminate-disabled.svg"
      alt=""
    />
  </label>
</template>
