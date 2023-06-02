import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {BarSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context.js';
import {createSeriesHook} from './internal/create-series-hook.js';
import {BarSeriesParams} from '../internal/series.js';

const useBarSeriesAction = createSeriesHook<BarSeriesParams>('Bar');

export interface BarSeriesProps extends BarSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Bar'][];
    reactive?: boolean;
    children?: ReactNode;
}

export const BarSeries = memo(forwardRef(function BarSeries(props: BarSeriesProps, ref: ForwardedRef<ISeriesApi<'Bar'>>) {
    const {children, ...rest} = props;

    const context = useBarSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

