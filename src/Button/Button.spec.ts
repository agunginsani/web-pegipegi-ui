import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Button from './Button.vue';

it('renders and emits correctly', async () => {
  const user = userEvent.setup();
  const { emitted, rerender } = render(Button, {
    slots: { default: 'Example' },
  });
  await user.click(screen.getByRole('button', { name: /example/i }));
  expect(emitted('click').length).toBe(1);
  expect(emitted('focus').length).toBe(1);
  expect(emitted('mouseover').length).toBe(1);
  await user.unhover(screen.getByRole('button', { name: /example/i }));
  expect(emitted('mouseleave').length).toBe(1);
  await user.tab();
  expect(emitted('blur').length).toBe(1);
  await user.tab();
  expect(emitted('focus').length).toBe(2);
  await rerender({ disabled: true });
  expect(screen.getByRole('button', { name: /example/i })).toBeDisabled();
});
