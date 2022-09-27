<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PCheckbox',
    inheritAttrs: false,
  });
</script>

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

<template>
  <label class="flex items-center">
    <input
      v-bind="$attrs"
      type="checkbox"
      class="peer sr-only"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :checked="modelValue.includes(value)"
      :value="value"
      @change="handleChange"
    />
    <!-- Enabled state. -->
    <img
      class="peer-disabled:hidden peer-indeterminate:hidden peer-checked:hidden"
      src="./outline.svg"
      alt=""
    />
    <img
      class="hidden peer-disabled:hidden peer-checked:inline peer-indeterminate:hidden"
      src="./checked.svg"
      alt=""
    />
    <img
      class="hidden peer-disabled:hidden peer-indeterminate:inline"
      src="./indeterminate.svg"
      alt=""
    />
    <!-- Disabled state. -->
    <img
      class="peer-enabled:hidden peer-indeterminate:hidden peer-checked:hidden"
      src="./outline-disabled.svg"
      alt=""
    />
    <img
      class="hidden peer-enabled:hidden peer-checked:inline peer-indeterminate:hidden"
      src="./checked-disabled.svg"
      alt=""
    />
    <img
      class="hidden peer-enabled:hidden peer-indeterminate:inline"
      src="./indeterminate-disabled.svg"
      alt=""
    />
  </label>
</template>