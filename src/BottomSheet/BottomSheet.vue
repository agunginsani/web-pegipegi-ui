<script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import {
    useSwipe,
    onClickOutside,
    TransitionPresets,
    useTransition,
    useScrollLock,
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
  const isBodyLocked = useScrollLock(document.documentElement);

  function setbottomSheetBottomPosition() {
    let contentHeight = 0;
    let bodyHeight = 0;

    bodyHeight = document.documentElement.clientHeight;
    if (contentRef.value) {
      contentHeight = contentRef.value.clientHeight;
    }

    if (contentHeight >= (93 / 100) * bodyHeight) {
      bottomSheetBottomPosition.value = bodyHeight * -1;
    } else {
      bottomSheetBottomPosition.value = bodyHeight * -2 + contentHeight + 40;
    }
  }

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
        isBodyLocked.value = false;
        emit('update:modelValue', false);
      } else
        bottomSheetSwipeBottomPosition.value = bottomSheetBottomPosition.value;
    },
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
    if (props.persistent) return;
    isBodyLocked.value = false;
    emit('update:modelValue', false);
  });

  const resizeObserver = new ResizeObserver(() => {
    if (contentRef.value) setbottomSheetBottomPosition();
  });

  onMounted(() => {
    if (props.modelValue) {
      isBodyLocked.value = true;
      overlayOpacity.value = 1;
    }
  });

  watch(bottomSheetBottomPosition, (val) => {
    bottomSheetSwipeBottomPosition.value = val;
  });

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        isBodyLocked.value = true;
        overlayOpacity.value = 1;
        bottomSheetSwipeBottomPosition.value = bottomSheetBottomPosition.value;
      } else {
        isBodyLocked.value = false;
        overlayOpacity.value = 0;
        bottomSheetSwipeBottomPosition.value =
          bottomSheetBottomPosition.value * 2;
      }
    }
  );

  watch(contentRef, (val) => {
    if (val) resizeObserver.observe(contentRef.value as HTMLElement);
  });
</script>

<template>
  <div class="w-full fixed left-0 top-0">
    <!-- overlay -->
    <div
      v-if="!(opacityTransition === 0 && !modelValue)"
      :style="{
        opacity: opacityTransition,
      }"
      class="w-[inherit] fixed h-[100vh] bg-[rgba(0,0,0,0.2)]"
    />
    <!-- bottom sheet -->
    <div
      v-if="!(opacityTransition === 0 && !modelValue)"
      ref="bottomSheetRef"
      :style="{
        bottom: `${bottomPositionTransition}px`,
        opacity: modelValue ? 1 : opacityTransition,
      }"
      :class="[
        'w-[inherit] fixed h-[200vh] bottom-0 bg-neutral-tuna-0',
        'rounded-t-[20px] pt-6 px-4',
        isSwiping ? '' : 'transition-all duration-500',
      ]"
      :aria-modal="modelValue"
      role="dialog"
      v-bind="$attrs"
    >
      <div
        v-if="!props.persistent"
        ref="swiperRef"
        class="w-full flex justify-center pb-2 absolute left-0 top-2 h-16 -translate-y-5"
      >
        <div class="rounded-full w-12 h-1 bg-neutral-tuna-200 translate-y-5" />
      </div>

      <div ref="contentRef" class="pb-2">
        <slot />
      </div>
    </div>
  </div>
</template>
