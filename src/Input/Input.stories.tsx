import Input from './Input.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    modelValue: {
      control: 'text',
      defaultValue: '',
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

Template.storyName = 'Input';
