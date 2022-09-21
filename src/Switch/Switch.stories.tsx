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
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta<typeof Switch>;

export const Template: StoryFn<typeof Switch> = (args) => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: '<Switch v-bind="args" />',
});

Template.storyName = 'Switch';
