import Checkbox from './Checkbox.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref, watch } from 'vue';

export default {
  title: 'Checkbox',
} as Meta<typeof Checkbox>;

export const List: StoryFn<typeof Checkbox> = () => ({
  components: { Checkbox },
  setup() {
    const values = ref<Array<string>>(['banana']);
    const isAllSelected = ref(false);

    function handleSelectAllInput(event: Event) {
      const checked = (event.target as HTMLInputElement).checked;
      isAllSelected.value = checked;
      if (checked) {
        values.value = [...values.value, 'apple', 'melon'];
      } else {
        values.value = ['banana'];
      }
    }

    watch(values, (values) => {
      if (values.length === 1) {
        isAllSelected.value = false;
      }

      if (values.length === 3) {
        isAllSelected.value = true;
      }
    });

    return { isAllSelected, values, handleSelectAllInput };
  },
  template: `
    <div class="grid gap-y-2">
      <p>Selected values: {{ values.join(', ') }}</p>
      <div class="flex gap-x-1">
        <Checkbox :checked="isAllSelected" id="all" @input="handleSelectAllInput" :indeterminate="values.length > 1 && values.length < 3" />
        <label for="all">Select all</label>
      </div>
      <div class="flex gap-x-1">
        <Checkbox id="apple" value="apple" v-model="values" />
        <label for="apple">Apple</label>
      </div>
      <div class="flex gap-x-1">
        <Checkbox id="forbidden-apple" value="forbidden-apple" v-model="values" disabled />
        <label for="forbidden-apple">Forbidden Apple</label>
      </div>
      <div class="flex gap-x-1">
        <Checkbox id="melon" value="melon" v-model="values" />
        <label for="melon">Melon</label>
      </div>
      <div class="flex gap-x-1">
        <Checkbox id="banana" value="banana" v-model="values" disabled />
        <label for="banana">Banana</label>
      </div>
    </div>
  `,
});

export const Single: StoryFn<typeof Checkbox> = () => ({
  components: { Checkbox },
  setup() {
    const isChecked = ref(false);
    return { isChecked };
  },
  template: `
    <div class="grid gap-y-2">
      <p>Is checked: {{ isChecked }}</p>
      <Checkbox @input="isChecked = $event.target.checked" />
    </div>
  `,
});
