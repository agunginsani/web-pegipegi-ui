<script lang="ts">
  import { defineComponent, ref, onMounted, watch, watchEffect } from 'vue';
  import { useSwipe } from '@vueuse/core';

  defineComponent({
    name: 'PBottomSheet',
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
  const swiper = ref<HTMLElement | null>(null);
  const content = ref<HTMLElement | null>(null);
  const staticBottomY = ref(-1000);
  const isClosing = ref(false);
  const bottomY = ref(staticBottomY.value);

  function setStaticBottomY() {
    let contentHeight = 0;
    let bodyHeight = 0;

    bodyHeight = document.documentElement.clientHeight;
    if (content.value) {
      contentHeight = content.value.clientHeight;
    }

    if (contentHeight >= (93 / 100) * bodyHeight) {
      staticBottomY.value = bodyHeight * -3 - (98 / 100) * (bodyHeight * -2);
    } else {
      staticBottomY.value = bodyHeight * -2 + contentHeight + 40;
    }
    console.log(staticBottomY.value);
  }

  watchEffect(() => {
    setStaticBottomY();
  });

  onMounted(() => {
    setStaticBottomY();
    document.documentElement.style.overflow = 'hidden';
  });

  watch(staticBottomY, (val) => {
    bottomY.value = val;
  });

  watch(
    () => props.modelValue,
    (val) => {
      if (val) document.documentElement.style.overflow = 'hidden';
      else document.documentElement.style.overflow = 'visible';
    }
  );

  function onOverlayClick() {
    if (props.persistent) return;
    document.documentElement.style.overflow = 'visible';
    emit('update:modelValue', false);
  }

  const { isSwiping, lengthY } = useSwipe(swiper, {
    passive: false,
    onSwipe() {
      const length = staticBottomY.value + lengthY.value;
      bottomY.value = length;
    },
    onSwipeEnd() {
      const length = staticBottomY.value + lengthY.value;
      let tmpLength = length;
      let tmpStaticBtmY = staticBottomY.value;
      if (length < 0) tmpLength = length * -1;
      if (staticBottomY.value < 0) tmpStaticBtmY = staticBottomY.value * -1;

      // calculate additional Y axis to trigger bottom sheet closing
      const additionalClosingTriggerY = () => {
        const a = Math.trunc(tmpLength / 50);
        return 1000 / a;
      };

      // close bottom sheets when swipe down + swipe end
      if (tmpLength > tmpStaticBtmY + additionalClosingTriggerY()) {
        isClosing.value = true;
        bottomY.value = -2000;
        isClosing.value = false;
        document.documentElement.style.overflow = 'visible';
        emit('update:modelValue', false);
        bottomY.value = staticBottomY.value;
      } else bottomY.value = staticBottomY.value;
    },
  });

  watch(isSwiping, (val) => {
    isClosing.value = val;
  });
</script>

<template>
  <div class="w-full fixed left-0 top-0">
    <!-- overlay -->
    <div
      v-show="modelValue"
      class="w-[inherit] fixed h-[100vh] bg-[rgba(0,0,0,0.2)] transition-all"
      @click="onOverlayClick"
    />
    <!-- bottom sheet -->
    <div
      ref="bottomSheet"
      :style="{
        bottom: `${modelValue ? bottomY : bottomY * 2}px`,
      }"
      :class="[
        'w-[inherit] fixed h-[200vh] bottom-0 bg-neutral-tuna-0',
        'rounded-t-[20px] pt-6 px-4',
        isClosing ? '' : 'transition-all duration-500',
      ]"
    >
      <div
        v-if="!props.persistent"
        ref="swiper"
        class="w-full flex justify-center pb-2 absolute left-0 top-2 h-16 -translate-y-5"
      >
        <div class="rounded-full w-12 h-1 bg-neutral-tuna-200 translate-y-5" />
      </div>

      <div ref="content" class="pb-2">
        <slot />
      </div>
    </div>
  </div>
</template>
