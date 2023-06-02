import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {LineSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, Time} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context.js';
import {createSeriesHook} from './internal/create-series-hook.js';
import {LineSeriesParams} from '../internal/series.js';

const useLineSeriesAction = createSeriesHook<LineSeriesParams>('Line');

export interface LineSeriesProps extends LineSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Line'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}

export const LineSeries = memo(forwardRef(function LineSeries(props: LineSeriesProps, ref: ForwardedRef<ISeriesApi<'Line'>>) {
    const {children, ...rest} = props;

    const context = useLineSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

