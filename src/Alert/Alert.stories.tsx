import Alert from './Alert.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Alert',
} as Meta<typeof Alert>;

export const Template: StoryFn<typeof Alert> = () => ({
  components: { Alert },
  template: `
    <div class="grid gap-y-2">
      <Alert color="accent">Text</Alert>
      <Alert color="warning">
        Text
        <template #action>
          <button>Action</button>
        </template>
      </Alert>
      <Alert color="positive">
        <template #icon>
          <img src="https://picsum.photos/20" height="20" />
        </template>
        Text
        <template #action>
          <button>Action</button>
        </template>
      </Alert>
      <Alert color="negative">Text</Alert>
    </div>
  `,
});

Template.storyName = 'Alert';
