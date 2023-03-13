<script lang="ts" setup>
  import { defineComponent, ref, onMounted } from 'vue';
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

<script lang="ts">
  defineComponent({
    name: 'PButton',
  });
</script>

<template>
  <button
    ref="buttonRef"
    :class="[
      'relative overflow-hidden border font-bold disabled:text-platinum-400',
      {
        'border-orange-400 bg-orange-400 text-white hover:border-orange-500 hover:bg-orange-500 disabled:border-platinum-50 disabled:bg-platinum-50':
          variant === 'filled',
        'border-orange-400 bg-transparent text-orange-400 hover:border-orange-500 hover:text-orange-500 disabled:border-gray-50 disabled:text-platinum-400':
          variant === 'outline',
        'border-transparent text-orange-400 disabled:bg-transparent':
          variant === 'text',
        'rounded-[18px] py-2 px-4 text-sm': size === 'small',
        'rounded-[22px] py-3 px-6 text-sm': size === 'medium',
        'text-md rounded-[28px] py-4 px-8': size === 'large',
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
