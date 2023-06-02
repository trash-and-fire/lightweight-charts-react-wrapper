import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {HistogramSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, Time} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context.js';
import {createSeriesHook} from './internal/create-series-hook.js';
import {HistogramSeriesParams} from '../internal/series.js';

const useHistogramSeriesAction = createSeriesHook<HistogramSeriesParams>('Histogram');

export interface HistogramSeriesProps extends HistogramSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Histogram'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}

export const HistogramSeries = memo(forwardRef(function HistogramSeries(props: HistogramSeriesProps, ref: ForwardedRef<ISeriesApi<'Histogram'>>) {
    const {children, ...rest} = props;

    const context = useHistogramSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

