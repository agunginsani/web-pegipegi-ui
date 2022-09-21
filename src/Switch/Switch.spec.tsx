import { defineComponent } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Switch from './Switch.vue';

const SwitchWrapper = defineComponent({
  setup(props, { attrs }) {
    return () => <Switch {...attrs} />;
  },
});

it('handles <Switch />', async () => {
  const user = userEvent.setup();
  const props = {
    onClick: vi.fn(),
  };
  render(SwitchWrapper, { props });
  const switcher = screen.getByRole('checkbox');
  await user.click(switcher);
  expect(props.onClick).toHaveBeenCalledTimes(1);
  expect(switcher).toBeChecked();
});

it('handles <Switch disabled />', async () => {
  const user = userEvent.setup();
  render(SwitchWrapper, { props: { disabled: true } });
  const switcher = screen.getByRole('checkbox');
  await user.click(switcher);
  expect(switcher).toBeDisabled();
  expect(switcher).not.toBeChecked();
});

it('handles <Switch disabled modelValue />', async () => {
  const user = userEvent.setup();
  render(SwitchWrapper, { props: { disabled: true, modelValue: true } });
  const switcher = screen.getByRole('checkbox');
  await user.click(switcher);
  expect(switcher).toBeDisabled();
  expect(switcher).toBeChecked();
});
