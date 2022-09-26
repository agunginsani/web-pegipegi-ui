import { defineComponent } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Counter from './Counter.vue';

const ControlledCounter = defineComponent({
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () => <Counter aria-label="total passenger" {...attrs} />;
  },
});

it('handles <ControlledCounter />', async () => {
  const user = userEvent.setup();
  const props = {
    max: 2,
    min: 0,
    modelValue: 1,
    disabled: false,
  };
  render(ControlledCounter, { props });
  const decrementButton = screen.getByRole('button', { name: /Decrement/i });
  const incrementButton = screen.getByRole('button', { name: /Increment/i });
  const counterDisplay = screen.getByRole('textbox', {
    name: /total passenger/i,
  });
  await user.click(decrementButton);
  expect(counterDisplay).toHaveValue('0');
  await user.click(incrementButton);
  expect(counterDisplay).toHaveValue('1');
});

it('handles <ControlledCounter /> with value > 99', async () => {
  const user = userEvent.setup();
  const props = {
    max: 100,
    min: 0,
    modelValue: 100,
    disabled: false,
  };
  render(ControlledCounter, { props });
  const incrementButton = screen.getByRole('button', { name: /Increment/i });
  const counterDisplay = screen.getByRole('textbox', {
    name: /total passenger/i,
  });
  await user.click(incrementButton);
  expect(counterDisplay).toHaveValue('99+');
});

it('handles <ControlledCounter /> with value > max', async () => {
  const props = {
    max: 2,
    min: 0,
    modelValue: 100,
    disabled: false,
  };
  await render(ControlledCounter, { props });
  const counterDisplay = screen.getByRole('textbox', {
    name: /total passenger/i,
  });
  expect(counterDisplay).toHaveValue('2');
});

it('handles <ControlledCounter disabled />', async () => {
  const user = userEvent.setup();
  const props = {
    max: 2,
    min: 0,
    modelValue: 1,
    disabled: true,
  };
  render(ControlledCounter, { props });
  const decrementButton = screen.getByRole('button', { name: /Decrement/i });
  const incrementButton = screen.getByRole('button', { name: /Increment/i });
  const counterDisplay = screen.getByRole('textbox', {
    name: /total passenger/i,
  });
  await user.click(decrementButton);
  await user.click(incrementButton);
  expect(counterDisplay).toHaveValue('1');
});
