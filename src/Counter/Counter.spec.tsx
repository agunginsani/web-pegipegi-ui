import { defineComponent } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Counter from './Counter.vue';

const ControlledCounter = defineComponent({
  setup(props, { attrs }) {
    return () => <Counter {...attrs} />;
  },
});

it('handles <Counter />', async () => {
  const user = userEvent.setup();
  const props = {
    max: 2,
    min: 0,
    modelValue: 1,
    plusSign: true,
    disabled: false,
  };
  render(ControlledCounter, { props });
  const decrementButton = screen.getAllByRole('button')[0];
  const incrementButton = screen.getAllByRole('button')[1];
  const counterDisplay = screen.getAllByRole('counterDisplay')[0];
  await user.click(decrementButton);
  expect(counterDisplay).toHaveTextContent('0');
  await user.click(incrementButton);
  expect(counterDisplay).toHaveTextContent('1');
});

it('handles <Counter /> with plusSign', async () => {
  const user = userEvent.setup();
  const props = {
    max: 2,
    min: 0,
    modelValue: 1,
    plusSign: true,
    disabled: false,
  };
  render(ControlledCounter, { props });
  const incrementButton = screen.getAllByRole('button')[1];
  const counterDisplay = screen.getAllByRole('counterDisplay')[0];
  await user.click(incrementButton);
  expect(counterDisplay).toHaveTextContent('1+');
});

it('handles <Counter /> disabled', async () => {
  const user = userEvent.setup();
  const props = {
    max: 2,
    min: 0,
    modelValue: 1,
    plusSign: false,
    disabled: true,
  };
  render(ControlledCounter, { props });
  const decrementButton = screen.getAllByRole('button')[0];
  const incrementButton = screen.getAllByRole('button')[1];
  const counterDisplay = screen.getAllByRole('counterDisplay')[0];
  await user.click(decrementButton);
  await user.click(incrementButton);
  expect(counterDisplay).toHaveTextContent('1');
});
