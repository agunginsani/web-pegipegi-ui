import Rating from './Rating.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Rating',
  component: Rating,
  argTypes: {
    value: {
      control: 'number',
      defaultValue: 3,
    },
    max: {
      control: 'number',
      defaultValue: 5,
    },
    precision: {
      control: 'radio',
      options: [0.5, 1],
      defaultValue: 1,
    },
    readonly: {
      control: 'boolean',
      defaultValue: false,
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
    const rating = ref(args.value);
    return { args, rating };
  },
  template: '<Rating v-bind="args" v-model="rating" />',
});

Template.storyName = 'Rating';
