<script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import {
    useSwipe,
    onClickOutside,
    TransitionPresets,
    useTransition,
    useResizeObserver,
  } from '@vueuse/core';

  defineComponent({
    name: 'PBottomSheet',
    inheritAttrs: false,
  });
</script>

<script lang="ts" setup>
  type BottomSheetProps = {
    modelValue?: boolean;
    persistent?: boolean;
  };

  type BottomSheetEmits = {
    (e: 'update:modelValue', value: boolean): void;
  };

  const props = withDefaults(defineProps<BottomSheetProps>(), {
    modelValue: false,
    persistent: false,
  });

  const emit = defineEmits<BottomSheetEmits>();
  const swiperRef = ref<HTMLElement | null>(null);
  const contentRef = ref<HTMLElement | null>(null);
  const bottomSheetRef = ref<HTMLElement | null>(null);
  const overlayOpacity = ref(0);
  const bottomSheetBottomPosition = ref(-2000); // default bottom sheet location when hidden
  const bottomSheetSwipeBottomPosition = ref(bottomSheetBottomPosition.value);
  const screenHeight = ref(0)

  useResizeObserver(contentRef, () => {
    let contentHeight = 0;

    if (contentRef.value) {
      contentHeight = contentRef.value.clientHeight;
    }

    if (contentHeight >= (93 / 100) * screenHeight.value) {
      bottomSheetBottomPosition.value = screenHeight.value * -1;
    } else {
      bottomSheetBottomPosition.value = screenHeight.value * -2 + contentHeight + 40;
    }
  });

  const { isSwiping, lengthY } = useSwipe(swiperRef, {
    onSwipe() {
      const length = bottomSheetBottomPosition.value + lengthY.value;
      bottomSheetSwipeBottomPosition.value = length;
    },
    onSwipeEnd() {
      const length = bottomSheetBottomPosition.value + lengthY.value;
      let tmpLength = length;
      let tmpStaticBtmY = bottomSheetBottomPosition.value;
      let contentHeight = 0;
      let closingPrecentage = 0;

      // calculate precentage of closing bottom sheet
      if (length < 0) tmpLength = length * -1;
      if (bottomSheetBottomPosition.value < 0)
        tmpStaticBtmY = bottomSheetBottomPosition.value * -1;
      if (contentRef.value) contentHeight = contentRef.value.clientHeight;

      // bottom sheet will close when user swipe > 90% from content width
      closingPrecentage = (90 / 100) * contentHeight;

      // close bottom sheets when swipe down + swipe end
      if (tmpLength > tmpStaticBtmY + closingPrecentage) {
        bottomSheetSwipeBottomPosition.value = -2000;
        emit('update:modelValue', false);
      } else
        bottomSheetSwipeBottomPosition.value = bottomSheetBottomPosition.value;
    },
    threshold: 0,
  });

  const opacityTransition = useTransition(overlayOpacity, {
    duration: 500,
    transition: TransitionPresets.easeOutCirc,
  });

  const bottomPositionTransition = useTransition(
    bottomSheetSwipeBottomPosition,
    {
      duration: 1,
    }
  );

  onClickOutside(bottomSheetRef, () => {
    if (props.persistent || opacityTransition.value < 1) return;
    document.documentElement.style.overflow = 'visible';
    emit('update:modelValue', false);
  });

  onMounted(() => {
    if (props.modelValue) {
      document.documentElement.style.overflow = 'hidden';
      overlayOpacity.value = 1;
    }
    screenHeight.value = document.documentElement.clientHeight
  });

  watch(bottomSheetBottomPosition, (val) => {
    bottomSheetSwipeBottomPosition.value = val;
  });

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        document.documentElement.style.overflow = 'hidden';
        overlayOpacity.value = 1;
        bottomSheetSwipeBottomPosition.value = bottomSheetBottomPosition.value;
      } else {
        document.documentElement.style.overflow = 'visible';
        overlayOpacity.value = 0;
        bottomSheetSwipeBottomPosition.value =
          bottomSheetBottomPosition.value * 2;
      }
    }
  );
</script>

<template>
  <div class="fixed left-0 top-0 z-50 w-full">
    <!-- overlay -->
    <div
      v-if="!(opacityTransition === 0 && !modelValue)"
      :style="{
        opacity: opacityTransition,
        height: `${screenHeight}px`
      }"
      class="fixed w-[inherit] bg-[rgba(0,0,0,0.2)]"
    />
    <!-- bottom sheet -->
    <div
      v-if="!(opacityTransition === 0 && !modelValue)"
      ref="bottomSheetRef"
      :style="{
        bottom: `${bottomPositionTransition}px`,
        opacity: modelValue ? 1 : opacityTransition,
        height: `${screenHeight * 2}px`
      }"
      :class="[
        'fixed bottom-0 w-[inherit] bg-neutral-tuna-0',
        'rounded-t-[20px] pt-6',
        isSwiping ? '' : 'transition-all duration-500',
      ]"
      :aria-modal="modelValue"
      role="dialog"
      v-bind="$attrs"
    >
      <div
        v-if="!props.persistent"
        ref="swiperRef"
        class="absolute left-0 top-2 flex h-16 w-full -translate-y-5 justify-center pb-2"
      >
        <div class="h-1 w-12 translate-y-5 rounded-full bg-neutral-tuna-200" />
      </div>

      <div ref="contentRef" class="pb-2">
        <slot />
      </div>
    </div>
  </div>
</template>
