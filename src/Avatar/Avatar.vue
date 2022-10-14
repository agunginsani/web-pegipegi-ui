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
    size?: 'sm' | 'md' | 'lg';
  };

  withDefaults(defineProps<AvatarProps>(), {
    alt: '',
    src: '',
    size: 'md',
  });
</script>

<template>
  <div
    role="avatar"
    :class="[
      'flex justify-center items-center overflow-hidden rounded-full ring-2 ring-white',
      {
        'h-[40px] w-[40px]': size === 'sm',
        'h-[56px] w-[56px]': size === 'md',
        'h-[72px] w-[72px]': size === 'lg',
      },
    ]"
  >
    <img v-if="src" :src="src" :alt="alt" />
    <template v-else>
      <slot />
    </template>
  </div>
</template>
