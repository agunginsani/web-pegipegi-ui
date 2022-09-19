import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Radio from './Radio.vue';
import { defineComponent, ref } from 'vue';

const ControlledRadio = defineComponent({
  components: { Radio },
  props: { disabled: { type: Boolean, default: false } },
  setup(props) {
    const picked = ref('One');

    function changeToValueTwo() {
      picked.value = 'Two';
    }

    function changeToValueThree() {
      picked.value = 'Three';
    }
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
        <button onClick={changeToValueTwo}>change two</button>
        <button onClick={changeToValueThree}>change three</button>
      </div>
    );
  },
});

it('handles `ControlledRadio`', async () => {
  const user = userEvent.setup();
  render(ControlledRadio);

  expect(screen.getAllByRole('radio')).toHaveLength(3);

  const radioOne = screen.getByRole('radio', { name: /one/i });
  const radioTwo = screen.getByRole('radio', { name: /two/i });
  const radioThree = screen.getByRole('radio', { name: /three/i });

  expect(radioOne).toBeChecked();
  expect(radioTwo).not.toBeChecked();
  expect(radioThree).not.toBeChecked();

  await user.click(screen.getByRole('button', { name: /change two/i }));
  expect(radioOne).not.toBeChecked();
  expect(radioTwo).toBeChecked();
  expect(radioThree).not.toBeChecked();

  await user.click(screen.getByRole('button', { name: /change three/i }));
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
