import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Radio from './Radio.vue';
import { defineComponent, ref, watch } from 'vue';

const ControlledRadio = defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['valueChanged'],
  setup(props, { attrs, emit }) {
    const picked = ref('One');

    watch(picked, (newValue) => {
      emit('valueChanged', newValue);
    });
    return () => (
      <div>
        <label for="one">One</label>
        <Radio
          id="one"
          v-model={picked.value}
          value="One"
          disabled={props.disabled}
          {...attrs}
        />
        <label for="two">Two</label>
        <Radio
          id="two"
          v-model={picked.value}
          value="Two"
          disabled={props.disabled}
          {...attrs}
        />
        <label for="three">Three</label>
        <Radio
          id="three"
          v-model={picked.value}
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
  render(ControlledRadio);

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

  await user.click(radioThree);
  expect(radioOne).not.toBeChecked();
  expect(radioTwo).not.toBeChecked();
  expect(radioThree).toBeChecked();
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
