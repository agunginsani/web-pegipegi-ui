import { defineComponent, PropType, ref, watch } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Rating from './Rating.vue';

const ControlledRating = defineComponent({
  props: {
    precision: {
      type: Number as PropType<0.5 | 1>,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ['valueChanged'],
  setup(props, { attrs, emit }) {
    const rating = ref(3);

    watch(rating, (newValue) => {
      emit('valueChanged', newValue);
    });
    return () => (
      <Rating
        max={props.max}
        precision={props.precision}
        readonly={props.readonly}
        v-model={rating.value}
        {...attrs}
      />
    );
  },
});

it('handles <ControlledRating />', async () => {
  const user = userEvent.setup();
  render(ControlledRating);
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(5);
  radios.forEach((element, index) => {
    const value = index + 1;
    expect(element).toHaveAccessibleName(`Rating ${value} out of ${5}`);
    if (value === 3) expect(element).toBeChecked();
    else expect(element).not.toBeChecked();
  });
  await user.click(screen.getByRole('radio', { name: /rating 4 /i }));
  radios.forEach((element, index) => {
    const value = index + 1;
    expect(element).toHaveAccessibleName(`Rating ${value} out of ${5}`);
    if (value === 4) expect(element).toBeChecked();
    else expect(element).not.toBeChecked();
  });
});

it('handles <ControlledRating :max="7" />', async () => {
  render(ControlledRating, { props: { max: 7 } });
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(7);
  radios.forEach((element, index) => {
    const value = index + 1;
    expect(element).toHaveAccessibleName(`Rating ${value} out of ${7}`);
    if (value === 3) expect(element).toBeChecked();
    else expect(element).not.toBeChecked();
  });
});

it('handles <ControlledRating precision="0.5" />', async () => {
  const user = userEvent.setup();
  render(ControlledRating, { props: { precision: 0.5 } });
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(10);
  radios.forEach((element, index) => {
    const value = (index + 1) * 0.5;
    expect(element).toHaveAccessibleName(`Rating ${value} out of ${5}`);
    if (value === 3) expect(element).toBeChecked();
    else expect(element).not.toBeChecked();
  });
  await user.click(screen.getByRole('radio', { name: /rating 4 /i }));
  radios.forEach((element, index) => {
    const value = (index + 1) * 0.5;
    expect(element).toHaveAccessibleName(`Rating ${value} out of ${5}`);
    if (value === 4) expect(element).toBeChecked();
    else expect(element).not.toBeChecked();
  });
  await user.click(screen.getByRole('radio', { name: /rating 4\.5 /i }));
  radios.forEach((element, index) => {
    const value = (index + 1) * 0.5;
    expect(element).toHaveAccessibleName(`Rating ${value} out of ${5}`);
    if (value === 4.5) expect(element).toBeChecked();
    else expect(element).not.toBeChecked();
  });
});

it('handles <ControlledRating precision="0.5" :max="7" />', async () => {
  render(ControlledRating, { props: { max: 7, precision: 0.5 } });
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(14);
  radios.forEach((element, index) => {
    const value = (index + 1) * 0.5;
    expect(element).toHaveAccessibleName(`Rating ${value} out of ${7}`);
    if (value === 3) expect(element).toBeChecked();
    else expect(element).not.toBeChecked();
  });
});

it('handles <ControlledRating readonly />', () => {
  render(ControlledRating, {
    props: {
      readonly: true,
    },
  });

  screen.getAllByRole('radio').forEach((element) => {
    expect(element).toBeDisabled();
  });
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

it('handles <RactiveRating />', async () => {
  const user = userEvent.setup();
  render(ReactiveRating);
  expect(screen.getByRole('radio', { name: /rating 3 /i })).toBeChecked();
  await user.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByRole('radio', { name: /rating 4 /i })).toBeChecked();
  await user.click(screen.getByRole('button', { name: /remove/i }));
  expect(screen.getByRole('radio', { name: /rating 3 /i })).toBeChecked();
});
