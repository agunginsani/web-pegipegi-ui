import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Radio from './Radio.vue';
import { defineComponent, ref, watch } from 'vue';

const initialValue = 'One';

const ControlledRadio = defineComponent({
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ['valueChanged'],
  setup(props, { attrs, emit }) {
    const value = ref(initialValue);

    watch(value, (newValue) => {
      emit('valueChanged', newValue);
    });
    return () => (
      <div>
        <label for="one">One</label>
        <Radio
          id="one"
          v-model={value.value}
          value="One"
          disabled={props.disabled}
          {...attrs}
        />
        <label for="two">Two</label>
        <Radio
          id="two"
          v-model={value.value}
          value="Two"
          disabled={props.disabled}
          {...attrs}
        />
        <label for="three">Three</label>
        <Radio
          id="three"
          v-model={value.value}
          value="Three"
          disabled={props.disabled}
          {...attrs}
        />
      </div>
    );
  },
});

it('handles <ControlledRadio />', async () => {
  const user = userEvent.setup();
  const props = {
    onValueChanged: vi.fn(),
  };
  render(ControlledRadio, { props });

  expect(screen.getAllByRole('radio')).toHaveLength(3);

  const radioOne = screen.getByRole('radio', { name: /one/i });
  const radioTwo = screen.getByRole('radio', { name: /two/i });
  const radioThree = screen.getByRole('radio', { name: /three/i });

  expect(radioOne).toBeChecked();
  expect(radioTwo).not.toBeChecked();
  expect(radioThree).not.toBeChecked();

  await user.click(radioTwo);
  expect(radioOne).not.toBeChecked();
  expect(radioTwo).toBeChecked();
  expect(radioThree).not.toBeChecked();
  expect(props.onValueChanged).toHaveBeenLastCalledWith('Two');

  await user.click(radioThree);
  expect(radioOne).not.toBeChecked();
  expect(radioTwo).not.toBeChecked();
  expect(radioThree).toBeChecked();
  expect(props.onValueChanged).toHaveBeenLastCalledWith('Three');
});

it('handles <ControlledRadio disabled />', () => {
  render(ControlledRadio, {
    props: {
      disabled: true,
    },
  });

  screen.getAllByRole('radio').forEach((element) => {
    expect(element).toBeDisabled();
  });
});
