<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';

  defineComponent({
    name: 'PButton',
  });
</script>

<script lang="ts" setup>
  type ButtonProps = {
    variant?: 'filled' | 'outline' | 'text';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    block?: boolean;
  };

  const props = withDefaults(defineProps<ButtonProps>(), {
    variant: 'filled',
    size: 'medium',
    disabled: false,
    block: false,
  });

  function createRippleEffect(this: HTMLElement, event: MouseEvent): void {
    const circle = document.createElement('span');

    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (this.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (this.offsetTop + radius)}px`;
    circle.classList.add(
      'ripple',
      'absolute',
      'rounded-full',
      'scale-0',
      'animate-ripple',
      props.variant === 'filled' ? 'bg-orange-400' : 'bg-orange-25'
    );

    const ripple = this.getElementsByClassName('ripple')[0];

    if (ripple) ripple.remove();

    this.insertBefore(circle, this.children[0]);
  }

  const buttonRef = ref<HTMLButtonElement | null>(null);
  onMounted(() => {
    buttonRef.value?.addEventListener('click', createRippleEffect);
  });
</script>

<template>
  <button
    ref="buttonRef"
    :class="[
      'border font-bold disabled:text-platinum-400 relative overflow-hidden',
      {
        'bg-orange-400 hover:bg-orange-500 border-orange-400 hover:border-orange-500 text-white disabled:bg-platinum-50 disabled:border-platinum-50':
          variant === 'filled',
        'bg-transparent text-orange-400 border-orange-400 hover:border-orange-500 hover:text-orange-500 disabled:border-gray-50 disabled:text-platinum-400':
          variant === 'outline',
        'border-transparent disabled:bg-transparent text-orange-400':
          variant === 'text',
        'py-2 px-4 text-sm rounded-[18px]': size === 'small',
        'py-3 px-6 text-sm rounded-[22px]': size === 'medium',
        'py-4 px-8 text-md rounded-[28px]': size === 'large',
        'w-full': block,
      },
    ]"
    :disabled="disabled"
  >
    <div class="relative">
      <slot />
    </div>
  </button>
</template>
