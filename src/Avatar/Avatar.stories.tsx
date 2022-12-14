import Avatar from './Avatar.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Avatar',
} as Meta<typeof Avatar>;

export const Text: StoryFn<typeof Avatar> = () => ({
  components: { Avatar },
  template: `
    <div class="flex gap-x-2">
      <Avatar size="small">RR</Avatar>
      <Avatar>RR</Avatar>
      <Avatar size="large">RR</Avatar>
    </div>
  `,
});

export const Image: StoryFn<typeof Avatar> = () => ({
  components: { Avatar },
  template: `
    <div class="flex gap-x-2">
      <Avatar src="https://picsum.photos/100" alt="Dummy" size="small" />
      <Avatar src="https://picsum.photos/100" alt="Dummy" />
      <Avatar src="https://picsum.photos/100" alt="Dummy" size="large" />
    </div>
  `,
});
