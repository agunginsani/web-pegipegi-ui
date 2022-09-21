import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { defineComponent, ref, watch } from 'vue';
import Textarea from './Textarea.vue';

const initialValue = 'initial value';

const ControlledTextarea = defineComponent({
  emits: ['valueChanged'],

  setup(props, { attrs, emit }) {
    const value = ref(initialValue);

    watch(value, (newValue) => {
      emit('valueChanged', newValue);
    });

    return () => {
      <div>
        <label for="Textarea1">Textarea1</label>
        <Textarea id="Textarea1" v-model={value.value} {...attrs}></Textarea>
      </div>;
    };
  },
});

it('handles <ControlledTextarea />', async () => {
  const user = userEvent.setup();
  const props = {
    onValueChanged: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
    onInput: vi.fn(),
  };
  render(ControlledTextarea, { props });
  const textbox = screen.getByRole('textbox', { name: /Textarea/i });
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

it('handles <ControlledTextarea disabled />', () => {
  render(ControlledTextarea, { props: { disabled: true } });
  expect(screen.getByRole('textbox', { name: /Textarea/i })).toBeDisabled();
});
