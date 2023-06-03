import {
    HTMLAttributes,
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

import {ChartContext} from './internal/chart-context.js';
import {createLazyValue, LazyValue} from '../internal/lazy-value.js';
import {chart, ChartActionResult} from '../internal/chart.js';

export interface ChartProps extends DeepPartial<ChartOptions> {
    children?: ReactNode;
    container?: HTMLAttributes<HTMLDivElement> & { ref?: ForwardedRef<HTMLDivElement> };
    onClick?: MouseEventHandler;
    onCrosshairMove?: MouseEventHandler;
}

export const Chart = memo(forwardRef(function Chart(props: ChartProps, ref: ForwardedRef<IChartApi>) {
    const {container = {}, ...rest} = props;
    const {ref: containerRef, ...restContainer} = container;

    const [element, setElement] = useState<HTMLElement | null>(null);
    const handleContainerRef = useCallback(
        (ref: HTMLDivElement | null) => {
            setElement(ref);
            if (containerRef) {
                if (typeof containerRef === 'function') {
                    containerRef(ref);
                } else {
                    containerRef.current = ref;
                }
            }
        },
        [containerRef]
    );

    return (
        <div ref={handleContainerRef} {...restContainer}>
            {element !== null ? <ChartComponent {...rest} ref={ref} container={element}/> : null}
        </div>
    )
}));

const ChartComponent = memo(forwardRef(function ChartComponent(props: Omit<ChartProps, 'container'> & { container: HTMLElement }, ref: ForwardedRef<IChartApi>) {
    const {children} = props;

    const context = useChartAction(props, ref);

    return (
        <ChartContext.Provider value={context.current}>
            {children}
        </ChartContext.Provider>
    );
}));

function useChartAction(props: Omit<ChartProps, 'container'> & { container: HTMLElement }, ref: ForwardedRef<IChartApi>): MutableRefObject<LazyValue<ChartActionResult>> {
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
