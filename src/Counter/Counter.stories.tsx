import Counter from './Counter.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Counter',
  component: Counter,
  argTypes: {
    modelValue: {
      control: 'number',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      defaultValue: 100,
    },
    min: {
      control: 'number',
      defaultValue: 0,
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
} as Meta<typeof Counter>;

export const Template: StoryFn<typeof Counter> = (args) => ({
  components: { Counter },
  setup() {
    return { args };
  },
  template: '<Counter v-bind="args" />',
});

Template.storyName = 'Counter';