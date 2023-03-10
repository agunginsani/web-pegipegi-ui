import Button from './Button.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Button',
} as Meta<typeof Button>;

export const Template: StoryFn<typeof Button> = () => ({
  components: { Button },
  template: `
    <div class="grid gap-y-2">
      <div class="flex items-center gap-x-2">
        <Button variant="outline" size="small">Click</Button>
        <Button variant="outline">Click</Button>
        <Button variant="outline" size="large">Click</Button>
      </div>
      <div class="flex items-center gap-x-2">
        <Button size="small">Click</Button>
        <Button>Click</Button>
        <Button size="large">Click</Button>
      </div>
      <div class="flex items-center gap-x-2">
        <Button variant="text" size="small">Click</Button>
        <Button variant="text">Click</Button>
        <Button variant="text" size="large">Click</Button>
      </div>
    </div>
  `,
});

Template.storyName = 'Button';
