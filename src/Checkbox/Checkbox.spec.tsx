import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox.vue';
import { defineComponent, ref, watch } from 'vue';

const initialValue = undefined;

const ControlledCheckbox = defineComponent({
  inheritAttrs: false,
  emits: ['valueChanged'],
  setup(props, { attrs, emit }) {
    const value = ref(initialValue);

    watch(value, (newValue) => {
      emit('valueChanged', newValue);
    });

    return () => (
      <div>
        <label for="checkbox">Checkbox</label>
        <Checkbox
          id="checkbox"
          {...attrs}
          v-model={value.value}
          value="checkbox"
        />
      </div>
    );
  },
});

it('handles <ControlledCheckbox />', async () => {
  const user = userEvent.setup();
  const props = {
    onValueChanged: vi.fn(),
  };
  render(ControlledCheckbox, { props });

  const checkbox = screen.getByRole('checkbox', { name: /checkbox/i });

  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(props.onValueChanged).toHaveBeenLastCalledWith(['checkbox']);

  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(props.onValueChanged).toHaveBeenLastCalledWith([]);
});

it('handles <ControlledCheckbox disabled />', () => {
  render(ControlledCheckbox, { props: { disabled: true } });
  expect(screen.getByRole('checkbox')).toBeDisabled();
});
