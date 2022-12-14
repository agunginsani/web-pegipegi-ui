import { defineComponent, ref } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Counter from './Counter.vue';

const ControlledCounter = defineComponent({
  inheritAttrs: false,

  setup(props, { attrs }) {
    const counter = ref(attrs.initialValue);

    return () => (
      <Counter
        {...attrs}
        v-model={counter.value}
        aria-label="total passenger"
      />
    );
  },
});

it('handles <ControlledCounter />', async () => {
  const user = userEvent.setup();
  const props = {
    max: 10,
    min: 0,
    initialValue: 5,
    disabled: false,
  };
  render(ControlledCounter, { props });
  const decrementButton = screen.getByRole('button', { name: /Decrement/i });
  const incrementButton = screen.getByRole('button', { name: /Increment/i });
  const counterDisplay = screen.getByRole('textbox', {
    name: /total passenger/i,
  });
  await user.click(decrementButton);
  expect(counterDisplay).toHaveValue('4');
  await user.click(incrementButton);
  expect(counterDisplay).toHaveValue('5');
});

it('handles <ControlledCounter :max="100" :initial-value="100" />', async () => {
  const user = userEvent.setup();
  const props = {
    max: 100,
    min: 0,
    initialValue: 100,
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

it('handles <ControlledCounter :max="2" :initial-value="100" />', async () => {
  const props = {
    max: 2,
    min: 0,
    initialValue: 100,
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
    initialValue: 1,
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
