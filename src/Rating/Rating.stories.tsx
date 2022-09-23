import Rating from './Rating.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Rating',
  component: Rating,
  argTypes: {
    modelValue: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    precision: {
      control: 'radio',
      options: [0.5, 1],
    },
    readonly: {
      control: 'boolean',
    },
    'onUpdate:modelValue': {
      table: {
        category: 'Events',
      },
    },
  },
} as Meta<typeof Rating>;

export const Template: StoryFn<typeof Rating> = (args) => ({
  components: { Rating },
  setup() {
    return { args };
  },
  template: '<Rating v-bind="args" />',
});

Template.args = {
  modelValue: 3,
  max: 5,
  precision: 1,
  readonly: false,
};

Template.storyName = 'Rating';
