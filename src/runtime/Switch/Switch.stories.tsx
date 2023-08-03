import Switch from './Switch.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Switch',
} as Meta<typeof Switch>;

export const List: StoryFn<typeof Switch> = () => ({
  components: { Switch },
  setup() {
    const values = ref<Array<string>>(['banana']);
    return { values };
  },
  template: `
    <div class="grid gap-y-2">
      <p>Selected values: {{ values.join(', ') }}</p>
      <div class="flex gap-x-1">
        <Switch id="apple" value="apple" v-model="values" />
        <label for="apple">Apple</label>
      </div>
      <div class="flex gap-x-1">
        <Switch id="forbidden-apple" value="forbidden-apple" v-model="values" disabled />
        <label for="forbidden-apple">Forbidden Apple</label>
      </div>
      <div class="flex gap-x-1">
        <Switch id="melon" value="melon" v-model="values" />
        <label for="melon">Melon</label>
      </div>
      <div class="flex gap-x-1">
        <Switch id="banana" value="banana" v-model="values" disabled />
        <label for="banana">Banana</label>
      </div>
    </div>
  `,
});

export const Single: StoryFn<typeof Switch> = () => ({
  components: { Switch },
  setup() {
    const isChecked = ref(false);
    return { isChecked };
  },
  template: `
    <div class="grid gap-y-2">
      <p>Is checked: {{ isChecked }}</p>
      <Switch @input="isChecked = $event.target.checked" />
    </div>
  `,
});
