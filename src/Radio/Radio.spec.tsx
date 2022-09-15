import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Radio from './Radio.vue';
import { defineComponent, ref } from 'vue';

it.skip('renders and emits correctly when radio is clicked', async () => {
  const user = userEvent.setup();
  const props = { modelValue: 2, precision: 1, max: 5 };
  const { emitted } = render(Radio, { props });
//   expect(screen.getAllByRole('radio')).toHaveLength(props.max);
//   screen.getAllByRole('radio').forEach((element, index) => {
//     expect(element).toHaveAccessibleName(
//       `Rating ${index + 1} out of ${props.max}`
//     );
//   });
//   expect(
//     screen.getByRole('radio', {
//       name: new RegExp(`rating ${props.modelValue} `, 'i'),
//     })
//   ).toBeChecked();
//   const ratingFour = screen.getByRole('radio', { name: /rating 4/i });
//   await user.click(ratingFour);
//   expect(emitted('update:modelValue').length).toBe(1);
//   expect(emitted('update:modelValue')[0]).toEqual([4]);
//   expect(ratingFour).toBeChecked();
});
