import Banner from './Banner.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import logoDummy from './logo-dummy.svg';

export default {
  title: 'Banner',
} as Meta<typeof Banner>;

export const Template: StoryFn<typeof Banner> = () => ({
  components: { Banner },
  setup() {
    return { logoDummy };
  },
  template: `
    <div class="flex gap-x-5">
      <div class="grid gap-y-2">
        <Banner color="neutral" priority="high">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
          <template #action>Button</template>
        </Banner>
        <Banner color="accent" priority="high">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="info" priority="high">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="warning" priority="high">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="positive" priority="high">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="negative" priority="high">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
      </div>
      <div class="grid gap-y-2"> 
        <Banner color="neutral" priority="low">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="accent" priority="low">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="info" priority="low">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="warning" priority="low">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="positive" priority="low">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
        <Banner color="negative" priority="low">
          <template #icon><img width="14" height="14" :src="logoDummy" alt="logo"/></template>
          <template #title><strong>Title Message</strong></template>
          <template #description><p>Write a short message with a maximum of only 2 lines.</p></template>
        </Banner>
      </div>
    </div>
  `,
});

Template.storyName = 'Banner';
