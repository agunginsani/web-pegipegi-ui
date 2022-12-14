import Input from './Input.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Input',
} as Meta<typeof Input>;

export const Template: StoryFn<typeof Input> = () => ({
  components: { Input },
  setup() {
    const name = ref('');
    return { name };
  },
  template: `
    <div class="grid gap-y-2">
      <div class="grid gapy-y-2">
        <label for="name">Who are you?</label>
        <Input id="name" v-model="name" size="small" />
      </div>
      <div class="grid gapy-y-2">
        <label for="name-1">Who are you?</label>
        <Input id="name-1" value="Iron Man" disabled />
      </div>
      <div class="grid gapy-y-2">
        <label for="name-2">Who are you?</label>
        <Input id="name-2" value="Nazi" readonly error size="large" />
      </div>
    </div>
  `,
});

Template.storyName = 'Input';
