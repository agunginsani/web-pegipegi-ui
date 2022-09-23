import { defineComponent, ref, watch } from 'vue';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Switch from './Switch.vue';

const initialValue: Array<string> = [];

const ControlledSwitch = defineComponent({
    emits: ['valueChanged'],
    setup(props, { attrs, emit }) {
        const value = ref(initialValue);
        watch(value, (newValue) => {
            emit('valueChanged', newValue);
        });

        return () => (
            <div>
                <label for="refundable">is refundable</label>
                <Switch
                    id="refundable"
                    v-model={value.value}
                    value="refundable"
                    {...attrs}
                />
            </div>
        );
    },
});

it('handles <ControlledSwitch />', async () => {
    const user = userEvent.setup();
    const props = {
        onValueChanged: vi.fn(),
    };
    render(ControlledSwitch, { props });
    const switcher = screen.getByRole('checkbox');
    expect(switcher).not.toBeChecked();
    await user.click(switcher);
    expect(switcher).toBeChecked();
    expect(props.onValueChanged).toHaveBeenLastCalledWith(['refundable']);

    await user.click(switcher);
    expect(switcher).not.toBeChecked();
    expect(props.onValueChanged).toHaveBeenLastCalledWith([]);
});

it('handles <ControlledSwitch disabled />', async () => {
    const user = userEvent.setup();
    render(ControlledSwitch, { props: { disabled: true } });
    const switcher = screen.getByRole('checkbox');
    await user.click(switcher);
    expect(switcher).toBeDisabled();
    expect(switcher).not.toBeChecked();
});

it('handles <ControlledSwitch disabled modelValue /> ', async () => {
    const user = userEvent.setup();
    render(ControlledSwitch, {
        props: { disabled: true, modelValue: ['refundable'] },
    });
    const switcher = screen.getByRole('checkbox');
    expect(switcher).toBeChecked();
    await user.click(switcher);
    expect(switcher).toBeDisabled();
    expect(switcher).toBeChecked();
});
