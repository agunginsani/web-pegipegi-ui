import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';
import { defineComponent, ref, watch } from 'vue';
import Textarea from './Textarea.vue';

const initialValue = 'initial textarea content';

const ControlledTextarea = defineComponent({
  inheritAttrs: false,
  emits: ['valueChanged'],
  setup(props, { attrs, emit }) {
    const value = ref(initialValue);
    watch(value, (newValue) => {
      emit('valueChanged', newValue);
    });
    return () => (
      <div>
        <label for="TextArea1">MyTextarea</label>
        <Textarea id="TextArea1" v-model={value.value} {...attrs} />
      </div>
    );
  },
});

it('handles <ControlledTextarea />', async () => {
  const viMock = {
    onValueChanged: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
    onInput: vi.fn(),
  };
  render(ControlledTextarea, { props: viMock });

  // have initial value
  const textbox = screen.getByRole('textbox', { name: 'MyTextarea' });
  expect(textbox).toHaveValue(initialValue);

  // user type new value
  const user = userEvent.setup();
  const typedValue = ' user-typed value';
  const newValue = initialValue + typedValue;

  await user.type(textbox, typedValue);
  expect(viMock.onFocus).toHaveBeenCalledTimes(1);
  expect(textbox).toHaveValue(newValue);
  expect(viMock.onValueChanged).toHaveBeenLastCalledWith(newValue);
  expect(viMock.onInput).toHaveBeenLastCalledWith(expect.any(InputEvent));

  await user.tab();
  expect(viMock.onBlur).toHaveBeenCalledTimes(1);

  await user.tab();
  expect(viMock.onFocus).toHaveBeenCalledTimes(2);
});

it('handles <ControlledTextarea disabled/>', () => {
  render(ControlledTextarea, { props: { disabled: true } });
  expect(screen.getByRole('textbox', { name: 'MyTextarea' })).toBeDisabled();
});
