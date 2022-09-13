import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Rating from './Rating.vue';
import { defineComponent, ref } from 'vue';

it('renders and emits correctly when precision is 1', async () => {
  const user = userEvent.setup();
  const props = { modelValue: 2, precision: 1, max: 5 };
  const { emitted } = render(Rating, { props });
  expect(screen.getAllByRole('radio')).toHaveLength(props.max);
  screen.getAllByRole('radio').forEach((element, index) => {
    expect(element).toHaveAccessibleName(
      `Rating ${index + 1} out of ${props.max}`
    );
  });
  expect(
    screen.getByRole('radio', {
      name: new RegExp(`rating ${props.modelValue} `, 'i'),
    })
  ).toBeChecked();
  const ratingFour = screen.getByRole('radio', { name: /rating 4/i });
  await user.click(ratingFour);
  expect(emitted('update:modelValue').length).toBe(1);
  expect(emitted('update:modelValue')[0]).toEqual([4]);
  expect(ratingFour).toBeChecked();
});

it('renders and emits correctly when precision is 0.5', async () => {
  const user = userEvent.setup();
  const props = { modelValue: 2, precision: 0.5, max: 5 };
  const { emitted } = render(Rating, { props });
  expect(screen.getAllByRole('radio')).toHaveLength(
    props.max / props.precision
  );
  screen.getAllByRole('radio').forEach((element, index) => {
    expect(element).toHaveAccessibleName(
      `Rating ${(index + 1) * props.precision} out of ${props.max}`
    );
  });
  expect(
    screen.getByRole('radio', {
      name: new RegExp(`rating ${props.modelValue} `, 'i'),
    })
  ).toBeChecked();
  const ratingThreeAndHalf = screen.getByRole('radio', {
    name: /rating 3\.5/i,
  });
  await user.click(ratingThreeAndHalf);
  expect(emitted('update:modelValue').length).toBe(1);
  expect(emitted('update:modelValue')[0]).toEqual([3.5]);
  expect(ratingThreeAndHalf).toBeChecked();
});

const ReactiveRating = defineComponent({
  setup() {
    const rating = ref(3);

    function handleAdd() {
      rating.value += 1;
    }

    function handleRemove() {
      rating.value -= 1;
    }

    return () => (
      <div>
        <button onClick={handleAdd}>Add star</button>
        <button onClick={handleRemove}>Remove star</button>
        <Rating v-model={rating.value} />
      </div>
    );
  },
});

it('handles `RactiveRating`', async () => {
  const user = userEvent.setup();
  render(ReactiveRating);
  expect(screen.getByRole('radio', { name: /rating 3 /i })).toBeChecked();
  await user.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByRole('radio', { name: /rating 4 /i })).toBeChecked();
  await user.click(screen.getByRole('button', { name: /remove/i }));
  expect(screen.getByRole('radio', { name: /rating 3 /i })).toBeChecked();
});
