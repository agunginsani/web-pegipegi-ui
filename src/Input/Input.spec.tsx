import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Input from './Input.vue';
import { defineComponent, ref, watch } from 'vue';

const initialValue = 'initial value';

const ControlledInput = defineComponent({
  emits: ['valueChanged'],
  setup(props, { attrs, emit }) {
    const value = ref(initialValue);

    watch(value, (newValue) => {
      emit('valueChanged', newValue);
    });

    return () => (
      <div>
        <label for="name">Name</label>
        <Input id="name" v-model={value.value} {...attrs} />
      </div>
    );
  },
});

it('handles <ControlledInput />', async () => {
  const user = userEvent.setup();
  const props = {
    onValueChanged: vi.fn(),
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
  expect(props.onValueChanged).toHaveBeenLastCalledWith(
    initialValue + newValue
  );
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
