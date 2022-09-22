import Switch from './Switch.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Switch',
  component: Switch,
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    modelValue: {
      control: 'array',
      defaultValue: [],
    },
    value: {
      control: 'text',
      defaultValue: 'switchVal',
    },
  },
  'update:modelValue': { table: { category: 'Events' } },
} as Meta<typeof Switch>;

export const Template: StoryFn<typeof Switch> = (args) => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: '<Switch v-bind="args" />',
});

Template.storyName = 'Switch';
