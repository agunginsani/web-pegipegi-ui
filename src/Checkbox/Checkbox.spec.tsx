import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox.vue';
import { defineComponent, ref, watch } from 'vue';

const initialValue = ['Checkbox Value'];

const ControlledCheckbox = defineComponent({
  emits: ['valueChanged'],
  setup(props, { attrs, emit }) {
    const value = ref(initialValue);

    watch(value, (newValue) => {
      emit('valueChanged', newValue);
    });

    return () => (
      <div>
        <Checkbox {...attrs} v-model={value.value} />
      </div>
    );
  },
});

it('handles <ControlledCheckbox />', async () => {
  const user = userEvent.setup();
  const props = {
    onClick: vi.fn(),
  };
  render(ControlledCheckbox, { props });
  const checkbox = screen.getByRole('checkbox');

  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(props.onClick).toHaveBeenCalled();

  // isChecked = false
  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(props.onClick).toHaveBeenCalled();
});

it('handles <ControlledCheckbox disabled />', () => {
  render(ControlledCheckbox, { props: { disabled: true } });
  expect(screen.getByRole('checkbox')).toBeDisabled();
});
