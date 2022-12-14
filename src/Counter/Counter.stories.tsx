import Counter from './Counter.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Counter',
} as Meta<typeof Counter>;

export const Template: StoryFn<typeof Counter> = () => ({
  components: { Counter },
  setup() {
    const count = ref(0);
    const countWithMax = ref(5);
    return { count, countWithMax };
  },
  template: `
    <div class="grid gap-y-2">
      <Counter v-model="count" />
      <Counter disabled />
      <Counter v-model="countWithMax" :max="5" />
    </div>
  `,
});

Template.storyName = 'Counter';
