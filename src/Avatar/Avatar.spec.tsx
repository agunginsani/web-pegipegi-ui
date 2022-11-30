import { render, screen } from '@testing-library/vue';
import Avatar from './Avatar.vue';
import { defineComponent } from 'vue';

const initialValue =
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1';

const SimpleAvatar = defineComponent({
  inheritAttrs: false,
  setup() {
    return () => <Avatar>Content</Avatar>;
  },
});

const AvatarWithProps = defineComponent({
  inheritAttrs: false,
  setup() {
    return () => <Avatar src={initialValue} alt="dummy image" />;
  },
});

it('handles default <SimpleAvatar>Content</SimpleAvatar>', async () => {
  render(SimpleAvatar);
  expect(screen.getByText('Content')).toBeInTheDocument();
});

it(`handles <AvatarWithProps src="${initialValue}" alt="dummy image" />`, async () => {
  render(AvatarWithProps, {
    props: {
      src: initialValue,
      alt: 'image',
    },
  });

  expect(screen.getByRole('img')).toBeInTheDocument();;
});
