import Radio from './Radio.vue';
import { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

export default {
  title: 'Radio',
  component: Radio,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    value: {
      control: 'radio',
      options: ['One', 'Two'],
      defaultValue: 'One',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as Meta<typeof Radio>;

export const Template: StoryFn<typeof Radio> = (args) => ({
  components: { Radio },
  setup() {
    const picked = ref(args.value);
    return { args, picked };
  },
  template: `
    <div class="flex gap-[10px]">
      <Radio v-bind="args" label="One" v-model="picked" value="One" />
      <Radio v-bind="args" label="Two" v-model="picked" value="Two" />
    </div>
    `,
});

Template.storyName = 'Radio';
