/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import BottomSheet from './BottomSheet.vue';
import { defineComponent, ref, watch } from 'vue';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const ControlledNonPresistentBottomSheet = defineComponent({
  inheritAttrs: false,
  emits: ['valueChanged'],
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
  emits: ['valueChanged'],
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
  const props = {
    onValueChanged: vi.fn(),
  };
  render(ControlledNonPresistentBottomSheet, { props });

  let dialog = screen.queryByRole('dialog', { name: 'Bottom Sheet' });
  expect(dialog).toBeInTheDocument();
  await user.click(document.body);

  dialog = screen.queryByRole('dialog', { name: 'Bottom Sheet' });
  expect(dialog).toHaveStyle({ bottom: '-2000px' });
});

it('handles <ControlledPresistentBottomSheet />', async () => {
  window.ResizeObserver = ResizeObserver;
  const user = userEvent.setup();
  const props = {
    onValueChanged: vi.fn(),
  };
  render(ControlledPresistentBottomSheet, { props });

  let dialog = screen.queryByRole('dialog', { name: 'Bottom Sheet' });
  expect(dialog).toBeInTheDocument();
  await user.click(document.body);

  dialog = screen.queryByRole('dialog', { name: 'Bottom Sheet' });
  expect(dialog).toBeInTheDocument();
  expect(props.onValueChanged).not.toHaveBeenLastCalledWith(false);

  const button = screen.getByRole('button', { name: 'Close Bottom Sheet' });
  await user.click(button);
  expect(dialog).toHaveStyle({ bottom: '-2000px' });
});
