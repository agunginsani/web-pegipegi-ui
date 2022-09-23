import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox.vue';
import { defineComponent, ref, watch } from 'vue';

const initialValue = ['Checkbox Value'];

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
          aria-label="checkbox"
          {...attrs}
          v-model={value.value}
        />
      </div>
    );
  },
});

it('handles <ControlledCheckbox />', async () => {
  const user = userEvent.setup();
  render(ControlledCheckbox);

  const checkbox = screen.getByRole('checkbox', { name: /checkbox/i });

  await user.click(checkbox);
  expect(checkbox).toBeChecked();

  // // isChecked = false
  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

it('handles <ControlledCheckbox disabled />', () => {
  render(ControlledCheckbox, { props: { disabled: true } });
  expect(screen.getByRole('checkbox')).toBeDisabled();
});
