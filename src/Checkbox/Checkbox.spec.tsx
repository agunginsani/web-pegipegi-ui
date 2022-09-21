import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox.vue';
import { defineComponent, ref, watch } from 'vue';

const initialValue = true;

const ControlledInput = defineComponent({
  emits: ['valueChanged'],
  setup(props, { attrs, emit }) {
    const value = ref(initialValue);

    watch(value, (newValue) => {
      emit('valueChanged', newValue);
    });

    return () => (
      <div>
        <label for="checkbox">Checkbox</label>
        <Checkbox id="checkbox" checked={value.value} {...attrs} />
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

  // isChecked = true
  render(ControlledInput, { props });
  const checkbox = screen.getByRole('checkbox', { name: /checkbox/i });
  expect(checkbox).toBeChecked();

  // isChecked = false
  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

it('handles <ControlledInput disabled />', () => {
  render(ControlledInput, { props: { disabled: true } });
  expect(screen.getByRole('checkbox', { name: /checkbox/i })).toBeDisabled();
});
