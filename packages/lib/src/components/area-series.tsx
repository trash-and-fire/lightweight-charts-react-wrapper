import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
    useContext,
    useImperativeHandle,
    useLayoutEffect,
    useRef
} from 'react';
import {AreaSeriesPartialOptions, IChartApi, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {ChartContext} from './internal/chart-context';
import {SeriesContext} from './internal/series-context';
import {LazyValue} from '../internal/lazy-value';

export interface AreaSeriesProps extends AreaSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Area'][];
    children?: ReactNode;
}

export const AreaSeries = memo(forwardRef((props: AreaSeriesProps, ref: ForwardedRef<ISeriesApi<'Area'>>) => {
    const {children, data, ...rest} = props;
    const chart = useContext(ChartContext)!;
    const context = useRef(createLazyAreaSeries(chart, rest, data));

    useLayoutEffect(() => {
        const api = context.current();

        return () => {
            chart().removeSeries(api);
            context.current.reset();
        }
    }, []);

    useLayoutEffect(() => {
        const api = context.current();

        api.applyOptions(rest);
    }, [rest]);

    useImperativeHandle(ref, () => context.current(), []);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

function createLazyAreaSeries(
    target: () => IChartApi,
    options: AreaSeriesPartialOptions,
    data: SeriesDataItemTypeMap['Area'][]
): LazyValue<ISeriesApi<'Area'>> {
    let subject: ISeriesApi<'Area'> | null = null;

    const getter = () => {
        if (subject === null) {
            subject = target().addAreaSeries(options);
            subject.setData(data);
        }
        return subject;
    }

    getter.reset = () => {
        subject = null;
    }

    return getter;
}
