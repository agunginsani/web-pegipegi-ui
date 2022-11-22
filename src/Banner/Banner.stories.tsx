import Banner from './Banner.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Banner',
  component: Banner,
  argTypes: {
    color: {
      control: 'radio',
      options: ['neutral', 'accent', 'info', 'warning', 'positive', 'negative'],
    },
    priority: {
      control: 'radio',
      options: ['high', 'low'],
    },
  },
} as Meta<typeof Banner>;

export const Template: StoryFn<typeof Banner> = (args) => ({
  components: { Banner },
  setup() {
    return { args };
  },
  template: ` <Banner v-bind="args">
                <template #icon><img width="14" height="14" src="./src/Banner/dummy-logo.svg" alt="logo"/></template>
                <template #title><strong>Title Message</strong></template>
                <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
              </Banner>`,
});

Template.args = {
  color: 'neutral',
  priority: 'high',
};

Template.storyName = 'Banner';
