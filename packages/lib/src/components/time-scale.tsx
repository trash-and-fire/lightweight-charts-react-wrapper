import {
    ForwardedRef,
    forwardRef,
    memo,
    MutableRefObject,
    ReactNode,
    useContext,
    useImperativeHandle,
    useLayoutEffect,
    useRef
} from 'react';
import {
    DeepPartial,
    ITimeScaleApi,
    LogicalRangeChangeEventHandler, SizeChangeEventHandler,
    TimeRangeChangeEventHandler,
    TimeScaleOptions
} from 'lightweight-charts';

import {createLazyValue, LazyValue} from '../internal/lazy-value.js';
import {ChartContext} from './internal/chart-context.js';
import {timeScale, TimeScaleActionResult} from '../internal/time-scale.js';

export interface TimeScaleProps extends DeepPartial<TimeScaleOptions> {
    children?: ReactNode;
    onVisibleTimeRangeChange?: TimeRangeChangeEventHandler;
    onVisibleLogicalRangeChange?: LogicalRangeChangeEventHandler;
    onSizeChange?: SizeChangeEventHandler;
}

export const TimeScale = memo(forwardRef(function TimeScale(props: TimeScaleProps, ref: ForwardedRef<ITimeScaleApi>) {
    useTimeScaleAction(props, ref);

    return null;
}));

function useTimeScaleAction(props: TimeScaleProps, ref: ForwardedRef<ITimeScaleApi>): MutableRefObject<LazyValue<TimeScaleActionResult>> {
    const {children, ...rest} = props;

    const chart = useContext(ChartContext)!;

    const context = useRef(createLazyValue(
        () => timeScale(chart(), rest),
        (value: TimeScaleActionResult) => value.destroy()
    ));

    useLayoutEffect(() => {
        context.current();

        return () => {
            context.current.reset();
        }
    }, []);

    useLayoutEffect(() => {
        context.current().update(rest);
    }, [rest]);

    useImperativeHandle(ref, () => context.current().subject(), []);

    return context;
}
