import Avatar from './Avatar.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
} as Meta<typeof Avatar>;

export const Template: StoryFn<typeof Avatar> = (args) => ({
  components: { Avatar },
  setup() {
    return { args };
  },
  template: '<Avatar v-bind="args">{{ args.default }}</Avatar>',
});

Template.args = {
  src: '',
  alt: '',
  size: 'md',
};

Template.storyName = 'Avatar';
