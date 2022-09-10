import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Rating from './Rating.vue';

it.skip('renders and emits correctly', async () => {
  const user = userEvent.setup();
  let props = { modelValue: 2, precision: 1, max: 5 };
  const { emitted, rerender } = render(Rating, { props });
  expect(screen.getAllByRole('radio')).toHaveLength(props.max);
  screen.getAllByRole('radio').forEach((element, index) => {
    expect(element).toHaveAccessibleName(
      `Rating ${index + 1} out of ${props.max}`
    );
  });
  expect(
    screen.getByRole('radio', {
      name: `Rating ${props.modelValue} out of ${props.max}`,
    })
  ).toBeChecked();
  await user.click(
    screen.getByRole('radio', { name: `Rating 4 out of ${props.max}` })
  );
  expect(emitted('update:modelValue').length).toBe(1);
  expect(emitted('update:modelValue')[0]).toEqual([4]);
  props = { ...props, precision: 0.5 };
  await rerender(props);
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
      name: `Rating ${props.modelValue} out of ${props.max}`,
    })
  ).toBeChecked();
  await user.click(
    screen.getByRole('radio', { name: `Rating 3.5 out of ${props.max}` })
  );
  expect(emitted('update:modelValue').length).toBe(2);
  expect(emitted('update:modelValue')[1]).toEqual([3.5]);
  props = { ...props, precision: 1, max: 6 };
  await rerender(props);
  expect(screen.getAllByRole('radio')).toHaveLength(props.max);
});
