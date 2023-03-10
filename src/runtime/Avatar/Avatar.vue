<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PAvatar',
  });
</script>

<script lang="ts" setup>
  type AvatarProps = {
    alt?: string;
    src?: string;
    size?: 'small' | 'medium' | 'large';
  };

  withDefaults(defineProps<AvatarProps>(), {
    alt: '',
    src: '',
    size: 'medium',
  });
</script>

<template>
  <div
    :class="[
      'flex items-center justify-center overflow-hidden rounded-full ring-2 ring-white',
      {
        'bg-orange-inter-600 text-white': !src,
        'h-[40px] w-[40px] text-base': size === 'small',
        'h-[56px] w-[56px] text-lg': size === 'medium',
        'h-[72px] w-[72px] text-2xl': size === 'large',
      },
    ]"
  >
    <img v-if="src" :src="src" :alt="alt" />
    <template v-else>
      <slot />
    </template>
  </div>
</template>
