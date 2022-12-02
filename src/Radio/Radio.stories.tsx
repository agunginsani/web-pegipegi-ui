import Radio from './Radio.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Radio',
} as Meta<typeof Radio>;

export const Template: StoryFn<typeof Radio> = () => ({
  components: { Radio },
  setup() {
    const value = ref('banana');
    return { value };
  },
  template: `
    <div class="grid gap-y-2">
      <p>Selected value: {{ value }}</p>
      <div class="flex gap-x-1 items-center">
        <Radio id="apple" value="apple" v-model="value" />
        <label for="apple">Apple</label>
      </div>
      <div class="flex gap-x-1 items-center">
        <Radio id="forbidden-apple" value="forbidden-apple" v-model="value" disabled />
        <label for="forbidden-apple">Forbidden Apple</label>
      </div>
      <div class="flex gap-x-1 items-center">
        <Radio id="melon" value="melon" v-model="value" />
        <label for="melon">Melon</label>
      </div>
      <div class="flex gap-x-1 items-center">
        <Radio id="banana" value="banana" v-model="value" disabled />
        <label for="banana">Banana</label>
      </div>
    </div>
  `,
});

Template.storyName = 'Radio';
