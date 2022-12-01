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

const AvatarWithImage = defineComponent({
  inheritAttrs: false,
  setup() {
    return () => <Avatar src={initialValue} alt="dummy image" />;
  },
});

it('handles default <SimpleAvatar />', async () => {
  render(SimpleAvatar);
  expect(screen.getByText('Content')).toBeInTheDocument();
});

it(`handles <AvatarWithImage />`, async () => {
  render(AvatarWithImage);

  expect(screen.getByRole('img')).toBeInTheDocument();
});
