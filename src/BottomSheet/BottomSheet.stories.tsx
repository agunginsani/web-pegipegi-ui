import BottomSheet from './BottomSheet.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'BottomSheet',
  component: BottomSheet,
} as Meta<typeof BottomSheet>;

export const NonPersistent: StoryFn<typeof BottomSheet> = (args) => ({
  components: { BottomSheet },
  data() {
    return {
      isBottomSheetVisible: true,
      hiddenContent: false,
      args,
    };
  },
  methods: {
    onButtonOpen() {
      this.isBottomSheetVisible = true;
    },
  },
  template: `
    <div class="h-[200vh]">
      <h1 class="w-full text-center bold">Non-Presistent Bottom Sheet</h1>
      <p class="text-center w-full">
        {{
          isBottomSheetVisible
            ? "Try to scroll the page when bottom sheet active"
            : "Page scroll is enable"
        }}
      </p>

      <div class="flex justify-center w-full mt-3">
        <button
          class="bg-orange-500 w-20 text-white rounded-lg mb-3"
          @click="onButtonOpen"
        >
          open
        </button>
      </div>

      <BottomSheet v-model="isBottomSheetVisible" aria-labelledby="title">
        <div class="px-4">
          <div id="title">Non-Presistent Bottom Sheet</div>
          <div>Default Content</div>
          <div v-if="hiddenContent" class="w-full h-[75vh] mb-5 bg-red-100">
            Expandable Content Area
          </div>
          <button
            class="bg-orange-500 w-60 text-white rounded-lg mb-3"
            @click="hiddenContent = !hiddenContent"
          >
            {{ !hiddenContent ? "Show" : "Hide" }} Expandable Content
          </button>
        </div>
      </BottomSheet>
    </div>
    `,
});

export const Persistent: StoryFn<typeof BottomSheet> = (args) => ({
  components: { BottomSheet },
  data() {
    return {
      isBottomSheetVisible: true,
      args,
    };
  },
  methods: {
    onButtonOpen() {
      this.isBottomSheetVisible = true;
    },
  },
  template: `
    <div class="h-[200vh]">
      <h1 class="w-full text-center bold">Presistent Bottom Sheet</h1>
      <p class="text-center w-full">
        {{
          isBottomSheetVisible
            ? "Try to scroll the page when bottom sheet active"
            : "Page scroll is enable"
        }}
      </p>

      <div class="flex justify-center w-full mt-3">
        <button
          class="bg-orange-500 w-20 text-white rounded-lg mb-3"
          @click="onButtonOpen"
        >
          open
        </button>
      </div>

      <BottomSheet
        :persistent="true"
        v-model="isBottomSheetVisible"
        aria-labelledby="title"
      >
        <div class="px-4">
          <div id="title">Presistent Bottom Sheet</div>
          <button
            class="bg-orange-500 p-2 text-white rounded-lg mb-3"
            @click="isBottomSheetVisible = false"
          >
            Close Modal
          </button>
        </div>
      </BottomSheet>
    </div>
      `,
});

export const Scrollable: StoryFn<typeof BottomSheet> = (args) => ({
  components: { BottomSheet },
  data() {
    return {
      isBottomSheetVisible: true,
      args,
    };
  },
  methods: {
    onButtonOpen() {
      this.isBottomSheetVisible = true;
    },
  },
  template: `
    <div class="h-[200vh]">
      <h1 class="w-full text-center bold">Scrollable Bottom Sheet</h1>
      <p class="text-center w-full">
        {{
          isBottomSheetVisible
            ? "Try to scroll the page when bottom sheet active"
            : "Page scroll is enable"
        }}
      </p>

      <div class="flex justify-center w-full mt-3">
        <button
          class="bg-orange-500 p-2 text-white rounded-lg mb-3"
          @click="onButtonOpen"
        >
          open
        </button>
      </div>
      <BottomSheet v-model="isBottomSheetVisible" aria-labelledby="title">
        <div
          id="scrollable"
          class="w-full h-[90vh] overflow-y-auto"
        >
          <div class="w-full h-[400px] bg-purple-25 mb-2">
            <div class="w-full text-center">section 1</div>
          </div>
          <div class="w-full h-[400px] bg-purple-50 mb-2">
            <div class="w-full text-center">section 2</div>
          </div>
        </div>
      </BottomSheet>
    </div>
        `,
});

NonPersistent.storyName = 'Non-Persistent';
