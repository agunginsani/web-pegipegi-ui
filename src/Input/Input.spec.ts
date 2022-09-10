import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Input from './Input.vue';

it('renders and emits correctly', async () => {
  const user = userEvent.setup();
  const { emitted, rerender } = render(Input);
  expect(screen.getByRole('textbox')).toHaveValue('');
  const value = 'foo bar';
  await user.type(screen.getByRole('textbox'), value);
  expect(screen.getByRole('textbox')).toHaveValue(value);
  expect(emitted('update:modelValue').length).toBe(value.length);
  expect(emitted('update:modelValue')[value.length - 1]).toEqual([value]);
  expect(emitted('input').length).toBe(value.length);
  expect(emitted('input')[value.length - 1]).toEqual([
    expect.objectContaining({ target: expect.anything() }),
  ]);
  expect(emitted('focus').length).toBe(1);
  await user.tab();
  expect(emitted('blur').length).toBe(1);
  await user.tab();
  expect(emitted('focus').length).toBe(2);
  const initialValue = 'initial value';
  await rerender({ modelValue: initialValue });
  expect(screen.getByRole('textbox')).toHaveValue(initialValue);
});
