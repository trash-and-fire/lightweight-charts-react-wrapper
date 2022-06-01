import {
    ForwardedRef,
    forwardRef,
    memo,
    MutableRefObject,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import {ChartOptions, DeepPartial, IChartApi, MouseEventHandler} from 'lightweight-charts';

import {ChartContext} from './internal/chart-context';
import {createLazyValue, LazyValue} from '../internal/lazy-value';
import {chart, ChartActionResult} from '../internal/chart';

export interface ChartProps extends DeepPartial<ChartOptions> {
    children?: ReactNode;
    onClick?: MouseEventHandler;
    onCrosshairMove?: MouseEventHandler;
}

export const Chart = memo(forwardRef(function Chart(props: ChartProps, ref: ForwardedRef<IChartApi>) {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const handleContainerRef = useCallback((ref: HTMLElement | null) => setElement(ref), []);

    return (
        <div ref={handleContainerRef}>
            {element !== null ? <ChartComponent {...props} ref={ref} container={element}/> : null}
        </div>
    )
}));

const ChartComponent = memo(forwardRef(function ChartComponent(props: ChartProps & { container: HTMLElement }, ref: ForwardedRef<IChartApi>) {
    const {children} = props;

    const context = useChartAction(props, ref);

    return (
        <ChartContext.Provider value={context.current}>
            {children}
        </ChartContext.Provider>
    );
}));

function useChartAction(props: ChartProps & { container: HTMLElement }, ref: ForwardedRef<IChartApi>): MutableRefObject<LazyValue<ChartActionResult>> {
    const {children, container, ...rest} = props;

    const context = useRef(createLazyValue(
        () => chart(container, rest),
        (value: ChartActionResult) => value.destroy()
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
