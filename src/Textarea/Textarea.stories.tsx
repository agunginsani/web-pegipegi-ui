import Textarea from './Textarea.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Textarea',
  component: Textarea,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    modelValue: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    'onUpdate:modelValue': {
      table: {
        category: 'Events',
      },
    },
    onExpand: {
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
} as Meta<typeof Textarea>;

export const Template: StoryFn<typeof Textarea> = (args) => ({
  components: { Textarea },
  setup() {
    return { args };
  },
  template: '<Textarea v-bind="args" />',
});

Template.args = {
  modelValue: '',
  disabled: false,
  error: false,
  placeholder: '',
};

Template.storyName = 'Textarea';
