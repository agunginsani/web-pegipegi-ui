import { render, screen } from '@testing-library/vue';
import Avatar from './Avatar.vue';
import { defineComponent } from 'vue';

const initialValue =
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1';

const ExampleAvatar = defineComponent({
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () => <Avatar {...attrs}>Content</Avatar>;
  },
});

it('handles default <ExampleSnackbar>Content</ExampleSnackbar>', async () => {
  render(ExampleAvatar);
  expect(screen.getByRole('avatar')).toHaveTextContent('Content');
});

it(`handles <ExampleAvatar src="${initialValue}" alt="image" />`, async () => {
  render(ExampleAvatar, {
    props: {
      src: initialValue,
      alt: 'image',
    },
  });

  screen.getByRole('img');
});
