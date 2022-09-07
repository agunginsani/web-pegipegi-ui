<script lang="ts">
  import { defineComponent, ref } from "vue";

  defineComponent({
    name: "PRating",
  });
</script>

<script lang="ts" setup>
  import { v4 as uuidv4 } from "uuid";

  type RatingProps = {
    value?: number;
    max?: number;
    precision?: 0.5 | 1;
    readonly?: boolean;
  };

  const props = withDefaults(defineProps<RatingProps>(), {
    value: 3,
    max: 5,
    precision: 1,
    readonly: false,
  });

  const emit = defineEmits<{
    (e: "input", value: number): void;
  }>();

  const ratingOptions = [...Array(props.max * 2).keys()].map(
    (rating) => (rating + 1) * 0.5
  );
  const rating = ref(props.value);
  const uuid = uuidv4();

  function handleRatingHoverIn(value: number) {
    rating.value =
      props.precision === 1 && value % 1 !== 0 ? value + 0.5 : value;
  }

  function handleRatingHoverOut() {
    const { value } = document.querySelector(
      "input[name='rating']:checked"
    ) as HTMLInputElement;
    const numValue = Number(value);

    rating.value =
      props.precision === 1 && numValue % 1 !== 0 ? numValue + 0.5 : numValue;
  }
</script>

<template>
  <div class="ratings flex">
    <span
      v-for="star in Math.ceil(ratingOptions.length / 2)"
      :key="`rating-${uuid}-${star}`"
      :class="[
        'rating flex hover:scale-125',
        { 'pointer-events-none': readonly },
      ]"
    >
      <svg
        :class="[
          'absolute',
          star <= rating ? 'fill-yellow-500' : 'fill-neutral-50',
        ]"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.56808 6.05634L9.09184 0.581372C9.44917 -0.193791 10.5508 -0.193791 10.9082 0.581372L13.4319 6.05634L19.1437 6.88596C19.9558 7.00391 20.288 7.99573 19.7108 8.57898L15.5239 12.8099L16.5479 18.8324C16.6889 19.6618 15.8051 20.284 15.0718 19.8716L9.99997 17.019L4.92742 19.8716C4.1941 20.284 3.31031 19.6617 3.45142 18.8323L4.47605 12.8098L0.289208 8.57898C-0.287975 7.99573 0.0442224 7.00391 0.856264 6.88596L6.56808 6.05634Z"
        />
      </svg>
      <template
        v-for="ratingValue in ratingOptions.slice((star - 1) * 2, star * 2)"
        :key="`rating-${uuid}-${ratingValue}`"
      >
        <label
          :for="`rating-${uuid}-${ratingValue}`"
          :class="[
            'cursor-pointer relative',
            { 'last-of-type:pr-[16px]': star !== max },
          ]"
          @mouseover="handleRatingHoverIn(ratingValue)"
          @mouseleave="handleRatingHoverOut"
        >
          <span class="sr-only">Rating {{ ratingValue }} out of {{ max }}</span>
          <svg
            :class="[
              ratingValue <= rating ? 'fill-yellow-500' : 'fill-neutral-50',
              { 'scale-x-[-1]': ratingValue % 1 === 0 },
            ]"
            width="10"
            height="20"
            viewBox="0 0 10 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.56808 6.05629L9.09184 0.581319C9.26207 0.212034 9.99104 0.00124223 9.99104 0.00124223L9.99997 17.019L4.92742 19.8716C4.1941 20.284 3.31031 19.6616 3.45142 18.8322L4.47605 12.8098L0.289208 8.57893C-0.287975 7.99568 0.0442224 7.00386 0.856264 6.88591L6.56808 6.05629Z"
            />
          </svg>
        </label>
        <input
          :id="`rating-${uuid}-${ratingValue}`"
          type="radio"
          name="rating"
          class="sr-only"
          :value="ratingValue"
          :checked="ratingValue === value"
          @change="emit('input', ratingValue)"
        />
      </template>
    </span>
  </div>
</template>
