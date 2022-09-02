<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";

  defineComponent({
    name: "PRating",
  });
</script>

<script lang="ts" setup>
  type RatingProps = {
    value?: number;
    max?: number;
    precision?: number;
    disabled?: boolean;
  };

  const props = withDefaults(defineProps<RatingProps>(), {
    value: 3,
    max: 5,
    precision: 1, // 1 | 0.5
    disabled: false, // true | false
  });

  const emit = defineEmits<{
    (e: "input", value: number): void;
  }>();

  const ratingOptions = [...Array(props.max * 2).keys()].map(
    (rating) => (rating + 1) * 0.5
  );

  const starIcon = ref<HTMLElement | null>(null);
  const rating = ref<number>(props.value);

  function handleColorRating(currentRatingIndex: number) {
    if (starIcon.value) {
      Object.entries(starIcon.value).forEach(([index, el]) => {
        const icon = el.children[1];
        const ratingIndex = Number(index);

        if (ratingIndex < currentRatingIndex) {
          icon.classList.add("fill-orange-100");
          icon.classList.remove("fill-platinum-200");
        } else {
          icon.classList.add("fill-platinum-200");
          icon.classList.remove("fill-orange-100");
        }
      });
    }
  }

  function onChangeRating(this: HTMLElement) {
    const { value } = this.children[0] as HTMLInputElement;
    const numValue = Number(value);

    if (props.precision === 1) {
      rating.value = numValue % 1 !== 0 ? Math.floor(numValue) + 1 : numValue;
    } else {
      rating.value = numValue;
    }

    emit("input", rating.value);
  }

  function onHoverInRating(this: HTMLElement) {
    const { value } = this.children[0] as HTMLInputElement;
    let ratingIndex = Number(value) * 2;

    if (props.precision === 1) {
      ratingIndex = ratingIndex % 2 === 1 ? ratingIndex + 1 : ratingIndex;
    }

    handleColorRating(ratingIndex);
  }

  function onHoverOutRating(this: HTMLElement) {
    const { value } = this.children[0] as HTMLInputElement;
    const ratingIndex = Number(value) * 2;
    const currentRatingIndex = rating.value * 2;

    if (ratingIndex !== currentRatingIndex)
      handleColorRating(currentRatingIndex);
  }

  onMounted(() => {
    if (starIcon.value) {
      Object.entries(starIcon.value).forEach(([index, el]) => {
        const icon = el.children[1];
        const ratingIndex = Number(index);
        const currentRattingIndex = rating.value * 2;

        if (ratingIndex % 2 === 1)
          icon.classList.add("scale-x-[-1]", "mr-[16px]");
        if (ratingIndex + 1 === props.max * 2)
          icon.classList.remove("mr-[16px]");
        if (ratingIndex < currentRattingIndex) {
          icon.classList.add("fill-orange-100");
        } else {
          icon.classList.add("fill-platinum-200");
        }

        if (!props.disabled) {
          el.addEventListener("click", onChangeRating);
          el.addEventListener("mouseover", onHoverInRating);
          el.addEventListener("mouseleave", onHoverOutRating);
        } else {
          el.classList.remove("cursor-pointer");
        }
      });
    }
  });
</script>

<template>
  <div class="ratings flex">
    <div
      v-for="option in ratingOptions"
      :key="`rating-${option}`"
      ref="starIcon"
      class="cursor-pointer"
    >
      <input
        :id="`rating-${option}`"
        class="hidden opacity-0"
        type="radio"
        name="rating"
        :value="option"
      /><svg
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
