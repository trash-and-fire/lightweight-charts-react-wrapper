import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {CandlestickSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context.js';
import {createSeriesHook} from './internal/create-series-hook.js';
import {CandlestickSeriesParams} from '../internal/series.js';

const useCandlestickSeriesAction = createSeriesHook<CandlestickSeriesParams>('Candlestick');

export interface CandlestickSeriesProps extends CandlestickSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Candlestick'][];
    reactive?: boolean;
    children?: ReactNode;
}

export const CandlestickSeries = memo(forwardRef(function CandlestickSeries(props: CandlestickSeriesProps, ref: ForwardedRef<ISeriesApi<'Candlestick'>>) {
    const {children, ...rest} = props;

    const context = useCandlestickSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

