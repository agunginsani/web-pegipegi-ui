<script lang="ts">
  import { computed, defineComponent, ComputedGetter } from 'vue';

  defineComponent({
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
  const isChecked = computed(
    () => props.modelValue?.includes(props.value) || false
  );

  function handleCheck(event: Event) {
    const { value } = event.target as HTMLInputElement;
    const tempArr = props.modelValue || [];

    if (!tempArr.includes(value)) tempArr.push(value);
    else {
      const findIndex = props.modelValue.findIndex((key) => key === value);
      tempArr.splice(findIndex, 1);
    }

    emit('update:modelValue', tempArr);
  }
</script>

<template>
  <input
    v-bind="$attrs"
    type="checkbox"
    class="opacity-0 absolute disabled:pointer-events-none cursor-pointer w-5 h-5"
    :disabled="disabled"
    :checked="isChecked"
    :value="value"
    @change="handleCheck"
  />
  <div
    :class="[
      'rounded-md w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2',
      {
        'bg-white border-2 border-gray-50': !isChecked,
        'bg-platinum-100 border-gray-300': disabled && !indeterminate,
      },
    ]"
  >
    <!-- Unselected Condition || Outline Component -->
    <svg
      v-if="!isChecked"
      class="fill-current hidden w-3 h-3 text-orange-400 pointer-events-none"
      version="1.1"
      viewBox="0 0 17 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fill-rule="evenodd">
        <g class="fill-white" transform="translate(-9 -11)">
          <path
            d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
          />
        </g>
      </g>
    </svg>

    <!-- TO DO: binding component indeterminate -->
    <svg
      v-else-if="indeterminate"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 0.00012207C1.79086 0.00012207 0 1.79098 0 4.00012V16.0001C0 18.2093 1.79086 20.0001 4 20.0001H16C18.2091 20.0001 20 18.2093 20 16.0001V4.00012C20 1.79098 18.2091 0.00012207 16 0.00012207H4ZM5.5 8.50012H14.5C15.3284 8.50012 16 9.17169 16 10.0001C16 10.8285 15.3284 11.5001 14.5 11.5001H5.5C4.67157 11.5001 4 10.8285 4 10.0001C4 9.17169 4.67157 8.50012 5.5 8.50012Z"
        :class="[
          'fill-orange-400',
          {
            'fill-gray-300': disabled,
          },
        ]"
      />
    </svg>

    <!-- TO DO: binding component selected -->
    <svg
      v-else
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="[
        'fill-orange-400',
        {
          'fill-gray-300 bg-white': disabled,
        },
      ]"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 0.00012207C1.79086 0.00012207 0 1.79098 0 4.00012V16.0001C0 18.2093 1.79086 20.0001 4 20.0001H16C18.2091 20.0001 20 18.2093 20 16.0001V4.00012C20 1.79098 18.2091 0.00012207 16 0.00012207H4ZM6.93225 14.4396C7.69018 15.1886 8.90647 15.1867 9.66215 14.4354L16.5543 7.58299C17.1464 6.99432 17.1489 6.03409 16.5599 5.44232C15.9703 4.84992 15.0133 4.85315 14.4277 5.4495L9.69094 10.2728L8.29906 11.6705L6.91595 10.2645L5.56705 8.87453C4.98512 8.27487 4.02759 8.26878 3.43815 8.86099C2.85053 9.45137 2.85447 10.4098 3.44693 10.9953L6.93225 14.4396Z"
      />
    </svg>
  </div>
</template>
