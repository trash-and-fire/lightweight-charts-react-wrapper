import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {AreaSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context.js';
import {createSeriesHook} from './internal/create-series-hook.js';
import {AreaSeriesParams} from '../internal/series.js';

const useAreaSeriesAction = createSeriesHook<AreaSeriesParams>('Area');

export interface AreaSeriesProps extends AreaSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Area'][];
    reactive?: boolean;
    children?: ReactNode;
}

export const AreaSeries = memo(forwardRef(function AreaSeries(props: AreaSeriesProps, ref: ForwardedRef<ISeriesApi<'Area'>>) {
    const {children, ...rest} = props;

    const context = useAreaSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

