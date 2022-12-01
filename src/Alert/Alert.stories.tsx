import Alert from './Alert.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Alert',
  component: Alert,
  argTypes: {
    color: {
      control: 'radio',
      options: ['accent', 'warning', 'positive', 'negative'],
    },
    default: {
      control: 'text',
    },
    icon: {
      control: 'text',
    },
    action: {
      control: 'text',
    },
  },
} as Meta<typeof Alert>;

export const Template: StoryFn<typeof Alert> = (args) => ({
  components: { Alert },
  setup() {
    return { args };
  },
  template: '<Alert v-bind="args">{{ args.default }}</Alert>',
});

Template.args = {
  color: 'accent',
};

Template.storyName = 'Alert';
