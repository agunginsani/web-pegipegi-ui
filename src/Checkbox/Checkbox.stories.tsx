import Checkbox from './Checkbox.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    value: {
      control: 'text',
    },
    indeterminate: {
      control: 'boolean',
      defaultValue: false,
    },
    modelValue: {
      control: 'array',
      defaultValue: [],
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    'onUpdate:modelValue': {
      table: {
        category: 'Events',
      },
    },
  },
} as Meta<typeof Checkbox>;

export const Template: StoryFn<typeof Checkbox> = (args) => ({
  components: { Checkbox },
  setup() {
    return { args };
  },
  template: '<Checkbox v-bind="args" />',
});

Template.storyName = 'Checkbox';
