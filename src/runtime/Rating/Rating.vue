<script lang="ts" setup>
  import { defineComponent, ref } from 'vue';
  type RatingProps = {
    modelValue?: number;
    max?: number;
    precision?: 0.5 | 1;
    readonly?: boolean;
  };

  type RatingEmits = (e: 'update:modelValue', value: number) => void;

  const props = withDefaults(defineProps<RatingProps>(), {
    modelValue: 3,
    max: 5,
    precision: 1,
    readonly: false,
  });

  const emit = defineEmits<RatingEmits>();

  const halfStars = [...Array(props.max * 2).keys()].map(
    (rating) => (rating + 1) * 0.5
  );
  const ratingHover = ref(props.modelValue);
  const uuid = Date.now();

  function handleRatingChange(event: Event) {
    emit('update:modelValue', Number((event.target as HTMLInputElement).value));
  }
</script>

<script lang="ts">
  defineComponent({
    name: 'PRating',
  });
</script>

<template>
  <div class="flex">
    <span
      v-for="fullStar in max"
      :key="fullStar"
      :class="[
        'flex duration-100 ease-linear hover:scale-125',
        { 'pointer-events-none': readonly },
      ]"
    >
      <template v-if="precision === 1">
        <label
          :for="`rating-${uuid}-${fullStar}`"
          :class="['cursor-pointer', { 'pr-[16px]': fullStar !== max }]"
          @mouseover="ratingHover = fullStar"
          @mouseleave="ratingHover = modelValue"
        >
          <span class="sr-only">Rating {{ fullStar }} out of {{ max }}</span>
          <svg
            :class="
              fullStar <= ratingHover
                ? 'fill-yellow-candle-400'
                : 'fill-neutral-tuna-50'
            "
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.56808 6.05634L9.09184 0.581372C9.44917 -0.193791 10.5508 -0.193791 10.9082 0.581372L13.4319 6.05634L19.1437 6.88596C19.9558 7.00391 20.288 7.99573 19.7108 8.57898L15.5239 12.8099L16.5479 18.8324C16.6889 19.6618 15.8051 20.284 15.0718 19.8716L9.99997 17.019L4.92742 19.8716C4.1941 20.284 3.31031 19.6617 3.45142 18.8323L4.47605 12.8098L0.289208 8.57898C-0.287975 7.99573 0.0442224 7.00391 0.856264 6.88596L6.56808 6.05634Z"
            />
          </svg>
        </label>
        <input
          :id="`rating-${uuid}-${fullStar}`"
          type="radio"
          :name="`rating-${uuid}`"
          class="sr-only"
          :disabled="readonly"
          :value="fullStar"
          :checked="fullStar === modelValue"
          @change="handleRatingChange"
        />
      </template>
      <template v-else>
        <svg
          :class="[
            'absolute',
            fullStar <= ratingHover
              ? 'fill-yellow-candle-400'
              : 'fill-neutral-tuna-50',
          ]"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.56808 6.05634L9.09184 0.581372C9.44917 -0.193791 10.5508 -0.193791 10.9082 0.581372L13.4319 6.05634L19.1437 6.88596C19.9558 7.00391 20.288 7.99573 19.7108 8.57898L15.5239 12.8099L16.5479 18.8324C16.6889 19.6618 15.8051 20.284 15.0718 19.8716L9.99997 17.019L4.92742 19.8716C4.1941 20.284 3.31031 19.6617 3.45142 18.8323L4.47605 12.8098L0.289208 8.57898C-0.287975 7.99573 0.0442224 7.00391 0.856264 6.88596L6.56808 6.05634Z"
          />
        </svg>
        <template
          v-for="ratingValue in halfStars.slice(
            (fullStar - 1) * 2,
            fullStar * 2
          )"
          :key="`rating-${uuid}-${ratingValue}`"
        >
          <label
            :for="`rating-${uuid}-${ratingValue}`"
            :class="[
              'relative cursor-pointer',
              { 'last-of-type:pr-[16px]': ratingValue !== max },
            ]"
            @mouseover="ratingHover = ratingValue"
            @mouseleave="ratingHover = modelValue"
          >
            <span class="sr-only">
              Rating {{ ratingValue }} out of {{ max }}
            </span>
            <svg
              :class="[
                ratingValue <= ratingHover
                  ? 'fill-yellow-candle-400'
                  : 'fill-neutral-tuna-50',
                { 'scale-x-[-1]': ratingValue % 1 === 0 },
              ]"
              width="10"
              height="20"
              viewBox="0 0 10 20"
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
            :name="`rating-${uuid}`"
            class="sr-only"
            :disabled="readonly"
            :value="ratingValue"
            :checked="ratingValue === modelValue"
            @change="handleRatingChange"
          />
        </template>
      </template>
    </span>
  </div>
</template>
