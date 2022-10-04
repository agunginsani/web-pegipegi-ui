import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Avatar from './Avatar.vue';
import { defineComponent } from 'vue';

const initialValue = 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1';

const ControlledAvatar = defineComponent({
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    return () => (
      <Avatar src={initialValue} alt='img' {...attrs} />
    );
  },
});

it('handles default size <ControlledAvatar />', async () => {
  render(ControlledAvatar, { props: { size: 'md' }});

  const img = screen.getByRole('img');
  const wrapper = screen.getByTestId('avatar-wrapper');

  expect(img).toHaveAttribute('src', initialValue);
  expect(img).toHaveAttribute('alt', 'img');
  expect(wrapper).toHaveClass('h-[56px] w-[56px]');
});

it('handles size=lg <ControlledAvatar />', async () => {
  render(ControlledAvatar, { props: { size: 'lg' }});

  const wrapper = screen.getByTestId('avatar-wrapper');
  expect(wrapper).toHaveClass('h-[72px] w-[72px]');
});

it('handles slot <ControlledAvatar />', async () => {
  const { getAllByRole } = render(ControlledAvatar, { slots: {
    default: '<img width={40} height={40} src="https://www.pegipegi.com/assets-hotel-homepage-pc/img/logo.svg" />',
  }});

  getAllByRole('img');
});
