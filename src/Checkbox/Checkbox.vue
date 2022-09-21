<script lang="ts">
  import { defineComponent } from 'vue';

  defineComponent({
    name: 'PCheckbox',
  });
</script>

<script lang="ts" setup>
  type CheckboxProps = {
    id?: string;
    value?: string;
    refs?: string;
    checked?: boolean;
    disabled?: boolean;
    type?: 'selected' | 'indeterminate' | 'unselected' | 'checked';
  };

  type CheckboxEmits = {
    (e: 'input', value: Event): void;
    (e: 'update:checked', value: boolean): void;
  };

  withDefaults(defineProps<CheckboxProps>(), {
    id: '',
    value: '',
    refs: '',
    checked: false,
    disabled: false,
    type: 'selected',
  });

  const emit = defineEmits<CheckboxEmits>();

  function handleCheck(event: Event) {
    emit('input', event);
    emit('update:checked', (event.target as HTMLInputElement).checked);
  }
</script>

<template>
  <div>
    <input
      :id="id"
      :ref="refs"
      type="checkbox"
      class="opacity-0 absolute disabled:pointer-events-none cursor-pointer w-5 h-5"
      :checked="checked"
      :disabled="disabled"
      :value="checked"
      @change="handleCheck"
    />
    <div
      :class="[
        'rounded-md w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2',
        {
          'bg-white border-2 border-gray-50': !checked,
          'bg-orange-400 border-orange-400 focus-within:border-orange-400':
            type === 'selected' && checked,
          'bg-white border-white': checked,
          'bg-platinum-300 border-gray-300':
            disabled && checked && type === 'selected',
        },
      ]"
    >
      <svg
        v-if="type === 'indeterminate' && checked"
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
      <svg
        v-else
        class="fill-current hidden w-3 h-3 text-orange-400 pointer-events-none"
        version="1.1"
        viewBox="0 0 17 12"
        xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <g
            transform="translate(-9 -11)"
            :class="[
              {
                'fill-white': type === 'selected' || disabled,
                'fill-orange-400': checked,
                'fill-gray-300': type === 'checked' && disabled,
              },
            ]"
          >
            <path
              d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>
