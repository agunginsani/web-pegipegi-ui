import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Radio from './Radio.vue';
import { defineComponent, ref } from 'vue';

const ControlledRadio = defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const picked = ref('One');
    return () => (
      <div>
        <Radio
          label="One"
          v-model={picked.value}
          value="One"
          disabled={props.disabled}
        />
        <Radio
          label="Two"
          v-model={picked.value}
          value="Two"
          disabled={props.disabled}
        />
        <Radio
          label="Three"
          v-model={picked.value}
          value="Three"
          disabled={props.disabled}
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

it('should disabled when passing props disabled equals true', () => {
  render(ControlledRadio, {
    props: {
      disabled: true,
    },
  });

  screen.getAllByRole('radio').forEach((element) => {
    expect(element).toBeDisabled();
  });
});
