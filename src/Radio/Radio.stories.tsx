import Radio from './Radio.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Radio',
  component: Radio,
  argTypes: {
    value: {
      control: 'text',
    },
    modelValue: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    'onUpdate:modelValue': {
      table: {
        category: 'Events',
      },
    },
    onClick: {
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
    onFocus: {
      table: {
        category: 'Events',
      },
    },
    onBlur: {
      table: {
        category: 'Events',
      },
    },
  },
} as Meta<typeof Radio>;

export const Template: StoryFn<typeof Radio> = (args) => ({
  components: { Radio },
  setup() {
    return { args };
  },
  template: `
    <label for="radio">
      <Radio id="radio" v-bind="args" />
    </label>
  `,
});

Template.args = {
  value: 'radio',
  modelValue: '',
  disabled: false,
};

Template.storyName = 'Radio';
