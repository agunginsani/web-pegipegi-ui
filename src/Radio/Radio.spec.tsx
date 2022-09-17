import { render, screen, fireEvent } from '@testing-library/vue';
import Radio from './Radio.vue';
import { defineComponent, ref } from 'vue';

it('renders and emits correctly when radio is clicked', () => {
  const props = {
    value: 'One',
    modelValue: '',
    label: 'One',
    disabled: false,
  };

  const { emitted } = render(Radio, { props });

  expect(screen.getAllByRole('radio')).toHaveLength(1);
  const radioOne = screen.getByRole('radio', { name: /one/i });
  fireEvent.click(radioOne);
  expect(emitted('update:modelValue').length).toBe(1);
  expect(emitted('update:modelValue')[0]).toEqual(['One']);
  expect(radioOne).toBeChecked();
});

const ReactiveRadio = defineComponent({
  components: { Radio },
  setup() {
    const picked = ref('One');
    return { picked };
  },
  template: `
    <div>
      <Radio label="One" v-model="picked" value="One" />
      <Radio label="Two" v-model="picked" value="Two" disabled />
      <Radio label="Three" v-model="picked" value="Three" />
    </div>
    `,
});

it('should render label correctly when passing props label', () => {
  render(ReactiveRadio);
  const labelOne = screen.getByText(/one/i);
  expect(labelOne).toContainHTML('span');

  const labelTwo = screen.getByText(/two/i);
  expect(labelTwo).toContainHTML('span');

  const labelThree = screen.getByText(/three/i);
  expect(labelThree).toContainHTML('span');
});

it('should radio two disabled when passing props disabled equals true', () => {
  render(ReactiveRadio);
  const radioTwo = screen.getByLabelText(/two/i);
  expect(radioTwo).toBeDisabled();
});

it('renders 3 radio and emits correctly with ReactiveRadio', () => {
  render(ReactiveRadio);
  expect(screen.getAllByRole('radio')).toHaveLength(3);

  const radioOne = screen.getByLabelText(/one/i);
  expect(radioOne).toBeChecked();

  const radioTwo = screen.getByLabelText(/two/i);
  fireEvent.click(radioTwo);
  expect(radioTwo).toBeChecked();

  const radioThree = screen.getByLabelText(/three/i);
  fireEvent.click(radioThree);
  expect(radioThree).toBeChecked();
});
