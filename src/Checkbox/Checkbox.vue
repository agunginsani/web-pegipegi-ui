<script lang="ts">
  import { defineComponent, computed } from 'vue';

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
  const isChecked = computed(() => props.modelValue?.includes(props.value));

  function handleChange(event: Event) {
    const results = props.modelValue.filter((val) => val !== props.value);
    if (results.length === props.modelValue.length) {
      emit('update:modelValue', [...props.modelValue, props.value]);
    } else emit('update:modelValue', results);
  }
</script>

<template>
  <label>
    <input
      v-bind="$attrs"
      type="checkbox"
      class="sr-only"
      :disabled="disabled"
      :checked="isChecked"
      :value="value"
      @change="handleChange"
    />
    <div
      :class="[
        'rounded-md w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2',
        {
          'bg-platinum-100 border-gray-50': !isChecked && disabled,
        },
      ]"
    >
      <!-- Unselected Condition || Outline Component -->
      <img v-if="!isChecked && !disabled" src="./outline.svg" alt="outline" />

      <!-- component indeterminate -->
      <div v-else-if="isChecked && indeterminate">
        <img v-if="!disabled" src="./indeterminate.svg" alt="indeterminate" />
        <img
          v-else
          src="./indeterminate-disabled.svg"
          alt="indeterminate-disabled"
        />
      </div>

      <!-- component selected -->
      <div v-else-if="isChecked && !indeterminate">
        <img v-if="!disabled" src="./checked.svg" alt="checked" />
        <img v-else src="./checked-disabled.svg" alt="checked-disabled" />
      </div>
    </div>
  </label>
</template>
