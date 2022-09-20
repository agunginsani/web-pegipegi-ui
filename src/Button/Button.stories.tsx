import Button from './Button.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['filled', 'outline', 'text'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    block: {
      control: 'boolean',
    },
    default: {
      control: 'text',
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
} as Meta<typeof Button>;

export const Template: StoryFn<typeof Button> = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">{{ args.default }}</Button>',
});

Template.args = {
  variant: 'filled',
  size: 'medium',
  disabled: false,
  block: false,
  default: 'Button',
};

Template.storyName = 'Button';
