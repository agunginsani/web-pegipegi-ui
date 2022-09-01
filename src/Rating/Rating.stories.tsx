import Rating from "./Rating.vue";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Rating",
  component: Rating,
  parameters: { actions: { argTypesRegex: "^on.*" } },
  argTypes: {
    value: {
      control: "radio",
      options: [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0],
      defaultValue: 5,
    },
    max: {
      control: "number",
      defaultValue: 5,
    },
    precision: {
      control: "number",
      defaultValue: 0.5 | 1,
    },
  },
} as Meta<typeof Rating>;

export const Template: StoryFn<typeof Rating> = (args) => ({
  components: { Rating: Rating },
  setup() {
    return { args };
  },
  template: '<Rating v-bind="args" />',
});

Template.storyName = "Rating";
