import Button from "./Button.vue";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Button",
  component: Button,
  parameters: { actions: { argTypesRegex: "^on.*" } },
  argTypes: {
    variant: {
      control: "radio",
      options: ["filled", "outline", "text"],
      defaultValue: "filled",
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
  },
} as Meta<typeof Button>;

export const Template: StoryFn<typeof Button> = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Button</Button>',
});

Template.storyName = "Button";
