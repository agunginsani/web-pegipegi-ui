import { render, screen } from '@testing-library/vue';
import Avatar from './Avatar.vue';
import { defineComponent } from 'vue';

const initialValue =
  'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1';

const ExampleAvatar = defineComponent({
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () => (
      <Avatar src={initialValue} alt="img" {...attrs}>
        Content
      </Avatar>
    );
  },
});

it('handles slot <ExampleAvatar />', async () => {
  render(ExampleAvatar, {
    slots: {
      default:
        '<img alt="image" width={40} height={40} src="https://www.pegipegi.com/assets-hotel-homepage-pc/img/logo.svg" />',
    },
  });

  screen.getByRole('img');
});
