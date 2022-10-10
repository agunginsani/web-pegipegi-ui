import { defineComponent, ref } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Banner from './Banner.vue';

const ControlledBanner = defineComponent({
  inheritAttrs: false,

  setup(props, { attrs }) {
    const counter = ref(attrs.initialValue);

    return () => <Banner {...attrs}>Content</Banner>;
  },
});

it('handles <ControlledBanner />', async () => {
  const user = userEvent.setup();
  const props = {
    onClose: vi.fn(),
  };
  render(ControlledBanner, { props });

  const closeButton = screen.getByRole('button');
  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-neutral-tuna-0');
  expect(content).toHaveClass('text-neutral-tuna-900');
  expect(buttonIcon).toHaveClass('fill-orange-inter-600');

  await user.click(closeButton);
  expect(props.onClose).toHaveBeenCalledTimes(1);
});

it('handles <ControlledBanner color="accent" priority="high" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'accent',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-orange-inter-600');
  expect(content).toHaveClass('text-neutral-tuna-0');
  expect(buttonIcon).toHaveClass('fill-neutral-tuna-0');
});

it('handles <ControlledBanner color="accent" priority="low" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'accent',
    priority: 'low',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-orange-inter-50');
  expect(content).toHaveClass('text-neutral-tuna-900');
  expect(buttonIcon).toHaveClass('fill-neutral-tuna-900');
});

it('handles <ControlledBanner color="info" priority="high" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'info',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-blue-dodger-600');
  expect(content).toHaveClass('text-neutral-tuna-0');
  expect(buttonIcon).toHaveClass('fill-neutral-tuna-0');
});

it('handles <ControlledBanner color="info" priority="low" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'info',
    priority: 'low',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-blue-dodger-50');
  expect(content).toHaveClass('text-blue-dodger-700');
  expect(buttonIcon).toHaveClass('fill-blue-dodger-700');
});

it('handles <ControlledBanner color="warning" priority="high" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'warning',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-yellow-candle-300');
  expect(content).toHaveClass('text-neutral-tuna-900');
  expect(buttonIcon).toHaveClass('fill-neutral-tuna-900');
});

it('handles <ControlledBanner color="warning" priority="low" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'warning',
    priority: 'low',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-yellow-candle-50');
  expect(content).toHaveClass('text-neutral-tuna-900');
  expect(buttonIcon).toHaveClass('fill-neutral-tuna-900');
});

it('handles <ControlledBanner color="positive" priority="high" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'positive',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-green-emerald-600');
  expect(content).toHaveClass('text-neutral-tuna-0');
  expect(buttonIcon).toHaveClass('fill-neutral-tuna-0');
});

it('handles <ControlledBanner color="positive" priority="low" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'positive',
    priority: 'low',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-green-emerald-50');
  expect(content).toHaveClass('text-green-emerald-700');
  expect(buttonIcon).toHaveClass('fill-green-emerald-700');
});

it('handles <ControlledBanner color="negative" priority="high" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'negative',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-red-flower-700');
  expect(content).toHaveClass('text-neutral-tuna-0');
  expect(buttonIcon).toHaveClass('fill-neutral-tuna-0');
});

it('handles <ControlledBanner color="negative" priority="low" />', async () => {
  const user = userEvent.setup();
  const props = {
    color: 'negative',
    priority: 'low',
  };
  render(ControlledBanner, { props });

  const wrapper = screen.getByRole('wrapper');
  const content = screen.getByRole('content');
  const buttonIcon = screen.getByRole('buttonIcon');

  expect(wrapper).toHaveClass('bg-red-flower-50');
  expect(content).toHaveClass('text-red-flower-700');
  expect(buttonIcon).toHaveClass('fill-red-flower-700');
});
