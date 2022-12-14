import { render, screen } from '@testing-library/vue';
import Alert from './Alert.vue';
import { defineComponent } from 'vue';

const SimpleAlert = defineComponent({
  inheritAttrs: false,
  setup() {
    return () => <Alert>Content</Alert>;
  },
});

const AlertWithIconAndActionButton = defineComponent({
  setup() {
    const slots = {
      icon: () => <img />,
      action: () => <button>Action</button>,
    };
    return () => <Alert v-slots={slots}>Content</Alert>;
  },
});

it('handles <SimpleAlert />', async () => {
  render(SimpleAlert);
  expect(screen.getByRole('alert')).toHaveTextContent('Content');
});

it(`handles <AlertWithIconAndActionButton>`, async () => {
  render(AlertWithIconAndActionButton);
  expect(screen.getByRole('img')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Action/i })).toBeInTheDocument();
  expect(screen.getByRole('alert')).toHaveTextContent('Content');
});
