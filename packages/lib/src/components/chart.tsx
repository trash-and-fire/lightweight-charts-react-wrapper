import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import {ChartOptions, createChart, DeepPartial, IChartApi} from 'lightweight-charts';

import {ChartContext} from './internal/chart-context';
import {LazyValue} from '../internal/lazy-value';

export interface ChartProps extends DeepPartial<ChartOptions> {
    children?: ReactNode;
}

export function Chart(props: ChartProps): JSX.Element {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const ref = useCallback((ref: HTMLElement | null) => setElement(ref), []);

    return (
        <div ref={ref}>
            {element !== null ? <ChartComponent {...props} container={element}/> : null}
        </div>
    )
}

const ChartComponent = memo(forwardRef((props: ChartProps & { container: HTMLElement }, ref: ForwardedRef<IChartApi>) => {
    const {children, container, ...rest} = props;

    const context = useRef(createLazyChart(container, rest));

    useLayoutEffect(() => {
        const api = context.current();

        return () => {
            api.remove();
            context.current.reset();
        }
    }, []);

    useLayoutEffect(() => {
        const api = context.current();

        api.applyOptions(rest);
    }, [rest]);

    useImperativeHandle(ref, () => context.current(), []);

    return (
        <ChartContext.Provider value={context.current}>
            {children}
        </ChartContext.Provider>
    );
}));

function createLazyChart(target: HTMLElement, options: DeepPartial<ChartOptions>): LazyValue<IChartApi> {
    let subject: IChartApi | null = null;

    const getter = () => {
        if (subject === null) {
            subject = createChart(target, options);
        }
        return subject;
    }

    getter.reset = () => {
        subject = null;
    };

    return getter;
}
