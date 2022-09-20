import Input from './Input.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    modelValue: {
      control: 'text',
    },
    'onUpdate:modelValue': {
      table: {
        category: 'Events',
      },
    },
    onInput: {
      table: {
        category: 'Events',
      },
    },
    onMouseenter: {
      table: {
        category: 'Events',
      },
    },
    onMouseleave: {
      table: {
        category: 'Events',
      },
    },
    onBlur: {
      table: {
        category: 'Events',
      },
    },
    onFocus: {
      table: {
        category: 'Events',
      },
    },
  },
} as Meta<typeof Input>;

export const Template: StoryFn<typeof Input> = (args) => ({
  components: { Input },
  setup() {
    return { args };
  },
  template: '<Input v-bind="args" />',
});

Template.args = {
  modelValue: '',
  size: 'medium',
  disabled: false,
  error: false,
};

Template.storyName = 'Input';
