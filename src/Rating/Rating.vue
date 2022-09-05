<script lang="ts">
  import { defineComponent, ref } from "vue";

  defineComponent({
    name: "PRating",
  });
</script>

<script lang="ts" setup>
  type RatingProps = {
    value?: number;
    max?: number;
    precision?: 0.5 | 1;
    disabled?: boolean;
  };

  const props = withDefaults(defineProps<RatingProps>(), {
    value: 3,
    max: 5,
    precision: 1,
    disabled: false,
  });

  const emit = defineEmits<{
    (e: "input", value: number): void;
  }>();

  const ratingOptions = [...Array(props.max * 2).keys()].map((rating) => {
    return { ratingValue: (rating + 1) * 0.5 };
  });

  const rating = ref(props.value);
  const ratingIndex = ref(props.value * 2);

  function onChangeRating() {
    rating.value =
      props.precision === 1 ? ratingIndex.value / 2 : ratingIndex.value * 0.5;

    emit("input", rating.value);
  }
</script>

<template>
  <div class="ratings flex">
    <div
      v-for="({ ratingValue }, index) in ratingOptions"
      :key="`rating-${ratingValue}`"
      :class="[
        { 'cursor-pointer': !disabled },
        { 'pointer-events-none': disabled },
      ]"
      @click="onChangeRating"
      @mouseover="
        ratingIndex =
          precision === 1 && index % 2 === 0
            ? index > 0
              ? index
              : 2
            : index + 1
      "
      @mouseleave="ratingIndex = rating * 2"
    >
      <input
        :id="`rating-${ratingValue}`"
        class="hidden opacity-0"
        type="radio"
        name="rating"
        :value="ratingValue"
      />
      <svg
        :class="[
          index < ratingIndex ? 'fill-[#FFB81C]' : 'fill-platinum-200',
          index % 2 === 1 ? 'scale-x-[-1]' : '',
          index % 2 === 1 && index + 1 !== max * 2 ? 'mr-[16px]' : '',
        ]"
        width="10"
        height="21"
        viewBox="0 0 10 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.56808 6.05629L9.09184 0.581319C9.26207 0.212034 9.99104 0.00124223 9.99104 0.00124223L9.99997 17.019L4.92742 19.8716C4.1941 20.284 3.31031 19.6616 3.45142 18.8322L4.47605 12.8098L0.289208 8.57893C-0.287975 7.99568 0.0442224 7.00386 0.856264 6.88591L6.56808 6.05629Z"
        />
      </svg>
    </div>
  </div>
</template>
