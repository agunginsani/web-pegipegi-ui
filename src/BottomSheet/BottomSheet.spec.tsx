/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import BottomSheet from './BottomSheet.vue';
import { defineComponent, ref } from 'vue';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const ControlledNonPresistentBottomSheet = defineComponent({
  inheritAttrs: false,
  setup() {
    const showBottomSheet = ref(true);

    return () => (
      <div>
        <BottomSheet v-model={showBottomSheet.value} aria-labelledby="title">
          <div id="title">Bottom Sheet</div>
          Lorem Ipsum Dolor Sit Amet
        </BottomSheet>
      </div>
    );
  },
});

const ControlledPresistentBottomSheet = defineComponent({
  inheritAttrs: false,
  setup() {
    const showBottomSheet = ref(true);

    return () => (
      <div>
        <BottomSheet
          persistent={true}
          v-model={showBottomSheet.value}
          aria-labelledby="title"
        >
          <div id="title">Bottom Sheet</div>
          Lorem Ipsum Dolor Sit Amet
          <button
            onClick={() => {
              showBottomSheet.value = false;
            }}
          >
            Close Bottom Sheet
          </button>
        </BottomSheet>
      </div>
    );
  },
});

it('handles <ControlledNonPresistentBottomSheet />', async () => {
  window.ResizeObserver = ResizeObserver;
  const user = userEvent.setup();
  render(ControlledNonPresistentBottomSheet);

  const dialog = screen.queryByRole('dialog', { name: 'Bottom Sheet' });
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  await user.click(document.body);

  expect(dialog).toHaveAttribute('aria-modal', 'false');
});

it('handles <ControlledPresistentBottomSheet />', async () => {
  window.ResizeObserver = ResizeObserver;
  const user = userEvent.setup();
  render(ControlledPresistentBottomSheet);

  const dialog = screen.queryByRole('dialog', { name: 'Bottom Sheet' });
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  await user.click(document.body);

  expect(dialog).toHaveAttribute('aria-modal', 'true');

  const button = screen.getByRole('button', { name: 'Close Bottom Sheet' });
  await user.click(button);
  expect(dialog).toHaveAttribute('aria-modal', 'false');
});
