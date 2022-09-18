import { defineComponent } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Button from './Button.vue';

const ExampleButton = defineComponent({
  setup(props, { attrs }) {
    return () => <Button {...attrs}>Example</Button>;
  },
});

it('handles <Button />', async () => {
  const user = userEvent.setup();
  const props = {
    onFocus: vi.fn(),
    onBlur: vi.fn(),
    onClick: vi.fn(),
    onMouseenter: vi.fn(),
    onMouseleave: vi.fn(),
  };
  render(ExampleButton, { props });
  const button = screen.getByRole('button');
  await user.click(button);
  expect(props.onClick).toHaveBeenCalledTimes(1);
  expect(props.onFocus).toHaveBeenCalledTimes(1);
  expect(props.onMouseenter).toHaveBeenCalledTimes(1);
  await user.unhover(button);
  expect(props.onMouseleave).toHaveBeenCalledTimes(1);
  await user.tab();
  expect(props.onBlur).toHaveBeenCalledTimes(1);
  await user.tab();
  expect(props.onFocus).toHaveBeenCalledTimes(2);
});

it('handles <Button disabled />', async () => {
  render(ExampleButton, { props: { disabled: true } });
  expect(screen.getByRole('button')).toBeDisabled();
});
