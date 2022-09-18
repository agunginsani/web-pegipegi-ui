import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Input from './Input.vue';
import { defineComponent, PropType, ref, watch } from 'vue';

const initialValue = 'initial value';

const ControlledInput = defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    onValueChange: {
      type: Function as PropType<(value: string) => void>,
      default: () => null,
    },
    onFocus: {
      type: Function as PropType<() => void>,
      default: () => null,
    },
    onBlur: {
      type: Function as PropType<() => void>,
      default: () => null,
    },
    onInput: {
      type: Function as PropType<() => void>,
      default: () => null,
    },
  },
  setup(props) {
    const value = ref(initialValue);

    watch(value, (newValue) => {
      props.onValueChange(newValue);
    });

    return () => (
      <div>
        <label for="name">Name</label>
        <Input id="name" v-model={value.value} {...props} />
      </div>
    );
  },
});

it('handles <ControlledInput />', async () => {
  const user = userEvent.setup();
  const props = {
    onValueChange: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
    onInput: vi.fn(),
  };
  render(ControlledInput, { props });
  const textbox = screen.getByRole('textbox', { name: /name/i });
  expect(textbox).toHaveValue(initialValue);
  const newValue = ' and new value';
  await user.type(textbox, newValue);
  expect(textbox).toHaveValue(initialValue + newValue);
  expect(props.onValueChange).toHaveBeenLastCalledWith(initialValue + newValue);
  expect(props.onInput).toHaveBeenLastCalledWith(expect.any(InputEvent));
  expect(props.onFocus).toHaveBeenCalledTimes(1);
  await user.tab();
  expect(props.onBlur).toHaveBeenCalledTimes(1);
  await user.tab();
  expect(props.onFocus).toHaveBeenCalledTimes(2);
});

it('handles <ControlledInput disabled />', () => {
  render(ControlledInput, { props: { disabled: true } });
  expect(screen.getByRole('textbox', { name: /name/i })).toBeDisabled();
});
