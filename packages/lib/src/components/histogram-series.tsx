import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {HistogramSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context';
import {createSeriesHook} from './internal/create-series-hook';
import {HistogramSeriesParams} from '../internal/series';

const useHistogramSeriesAction = createSeriesHook<HistogramSeriesParams>('Histogram');

export interface HistogramSeriesProps extends HistogramSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Histogram'][];
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

