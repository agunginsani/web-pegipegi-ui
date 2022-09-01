<script lang="ts">
  import { defineComponent } from "vue";

  defineComponent({
    name: "PRating",
  });
</script>

<script lang="ts" setup>
  type RatingProps = {
    value?: number;
    max?: number;
    precision?: 0.5 | 1;
  };

  withDefaults(defineProps<RatingProps>(), {
    value: 5,
    max: 5,
    precision: 1,
  });
</script>

<template>
  <div v-for="star in [...Array(10)].map((i) => i * 0.5)" :key="`star-${star}`">
    <input
      :id="`rating-${star}`"
      type="radio"
      name="rating"
      :value="star"
      :checked="value === star"
    /><label :for="`rating-${star}`">{{ star }}</label>
  </div>
</template>
