import { defineComponent } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Banner from './Banner.vue';

const ControlledBanner = defineComponent({
  inheritAttrs: false,

  setup(props, { attrs }) {
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

  await user.click(closeButton);
  expect(props.onClose).toHaveBeenCalledTimes(1);
});
