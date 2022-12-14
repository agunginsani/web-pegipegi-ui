import BottomSheet from './BottomSheet.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'BottomSheet',
  component: BottomSheet,
  argTypes: {
    default: {
      control: 'text',
    },
  },
} as Meta<typeof BottomSheet>;

export const NonPresistent: StoryFn<typeof BottomSheet> = (args) => ({
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
    <div style="height:200vh;">
        <h1 style="width:100%;text-align:center;font-weight:700;">Non-Presistent Bottom Sheet</h1>
        <p style="text-align:center;width:100%;">
        {{ isBottomSheetVisible? 'Try to scroll the page when bottom sheet active' : 'Page scroll is enable' }}
        </p>

        <div style="display:flex;justify-content:center;width:100%;margin-top:10px;">
            <button
            style="background:grey; width: 70px;border-radius:4px;margin-bottom:10px;"
            @click="onButtonOpen">open</button>
        </div>

        <BottomSheet
          v-model="isBottomSheetVisible"
          aria-labelledby="title"
        >
        <div id="title">Non-Presistent Bottom Sheet</div>
        <button @click="hiddenContent=!hiddenContent">Show Expandable Content</button>
        {{ args.default }}
        <div v-if="hiddenContent" class="w-full h-[85vh] bg-red-100">{{ args.default }}</div>
        </BottomSheet>
    </div>
    `,
});

export const Presistent: StoryFn<typeof BottomSheet> = (args) => ({
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
      <div style="height:200vh;">
          <h1 style="width:100%;text-align:center;font-weight:700;">Presistent Bottom Sheet</h1>
          <p style="text-align:center;width:100%;">
            {{ isBottomSheetVisible? 'Try to scroll the page when bottom sheet active' : 'Page scroll is enable' }}
          </p>

          <div style="display:flex;justify-content:center;width:100%;margin-top:10px;">
            <button
            style="background:grey; width: 70px;border-radius:4px;margin-bottom:10px;"
            @click="onButtonOpen">open</button>
          </div>

          <BottomSheet
            :persistent="true"
            v-model="isBottomSheetVisible"
            aria-labelledby="title"
            >
            <div id="title">Presistent Bottom Sheet</div>
            <button
              style="background:grey; width: 120px;border-radius:4px;margin-bottom:10px;"
              @click="isBottomSheetVisible=false"
            >Close Modal</button>
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
        <div style="height:200vh;">
            <h1 style="width:100%;text-align:center;font-weight:700;">Scrollable Bottom Sheet</h1>
            <div style="display:flex;justify-content:center;width:100%;margin-top:10px;">
            <button
                style="background:grey; width: 70px;border-radius:4px;margin-bottom:10px;"
                @click="onButtonOpen">open</button>
            </div>
            <BottomSheet
              v-model="isBottomSheetVisible"
              aria-labelledby="title"
            >
              <div
                id="scrollable"
                class="touch-pan-y"
                style="width:100%;height:90vh;overflow-y:auto;background:red;">
                <div style="width:100%;height:400px;background:gold;margin-bottom:10px;">
                    <div style="width:100%;text-align:center;color:#fff;bottom:0;position:relative;">section 1</div>
                </div>
                <div style="width:100%;height:400px;background:blue;">
                    <div style="width:100%;text-align:center;color:#fff;">section 2</div>
                </div>
              </div>
            </BottomSheet>
        </div>
        `,
});

NonPresistent.args = {
  default: 'Content1',
};

Presistent.args = {
  default: 'Content1',
};

NonPresistent.storyName = 'Non-Presistent';
