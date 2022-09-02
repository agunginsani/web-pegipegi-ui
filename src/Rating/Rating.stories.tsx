import Rating from "./Rating.vue";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Rating",
  component: Rating,
  parameters: { actions: { argTypesRegex: "^on.*" } },
  argTypes: {
    value: {
      control: "number",
      defaultValue: 3,
    },
    max: {
      control: "number",
      defaultValue: 5,
    },
    precision: {
      control: "radio",
      options: [0.5, 1],
      defaultValue: 1,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
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
