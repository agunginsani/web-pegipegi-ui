import Checkbox from './Checkbox.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    id: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    refs: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    type: {
      control: 'radio',
      options: ['selected', 'indeterminate', 'unselected', 'checked'],
      defaultValue: 'selected',
    },
  },
} as Meta<typeof Checkbox>;

export const Template: StoryFn<typeof Checkbox> = (args) => ({
  components: { Checkbox },
  setup() {
    return { args };
  },
  template: '<Checkbox v-bind="args">Button</Checkbox>',
});

Template.storyName = 'Checkbox';
