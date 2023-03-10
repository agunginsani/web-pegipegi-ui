import Textarea from './Textarea.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Textarea',
} as Meta<typeof Textarea>;

export const Template: StoryFn<typeof Textarea> = () => ({
  components: { Textarea },
  setup() {
    const description = ref('');
    return { description };
  },
  template: `
    <div class="grid gap-y-2">
      <div class="grid gapy-y-2">
        <label for="description">Please describe yourself?</label>
        <Textarea id="description" v-model="description" />
      </div>
      <div class="grid gapy-y-2">
        <label for="description-1">Please describe yourself?</label>
        <Textarea id="description-1" disabled value="War should be stopped!" />
      </div>
      <div class="grid gapy-y-2">
        <label for="description-2">Please describe yourself?</label>
        <Textarea id="description-2" value="Heil Hitler! Heil Mein Führer!" readonly error />
      </div>
    </div>
  `,
});

Template.args = {
  modelValue: '',
  disabled: false,
  error: false,
  placeholder: '',
};

Template.storyName = 'Textarea';
