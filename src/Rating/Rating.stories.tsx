import Rating from './Rating.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Rating',
} as Meta<typeof Rating>;

export const Full: StoryFn<typeof Rating> = () => ({
  components: { Rating },
  setup() {
    const value = ref(0);
    return { value };
  },
  template: `
    <div class="grid gap-y-2">
      <p>Your rating: {{ value }}</p>
      <Rating v-model="value" />
    </div>
  `,
});

export const Half: StoryFn<typeof Rating> = () => ({
  components: { Rating },
  setup() {
    const value = ref(0);
    return { value };
  },
  template: `
    <div class="grid gap-y-2">
      <p>Your rating: {{ value }}</p>
      <Rating v-model="value" :precision="0.5" />
    </div>
  `,
});

export const CustomMaximum: StoryFn<typeof Rating> = () => ({
  components: { Rating },
  setup() {
    const value = ref(0);
    return { value };
  },
  template: `
    <div class="grid gap-y-2">
      <p>Your rating: {{ value }}</p>
      <Rating v-model="value" :max="10" />
    </div>
  `,
});
