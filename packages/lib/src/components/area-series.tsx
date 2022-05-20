import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {AreaSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context';
import {createSeriesHook} from './internal/create-series-hook';
import {AreaSeriesParams} from '../internal/series';

const useAreaSeriesAction = createSeriesHook<AreaSeriesParams>('Area');

export interface AreaSeriesProps extends AreaSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Area'][];
    reactive?: boolean;
    children?: ReactNode;
}

export const AreaSeries = memo(forwardRef((props: AreaSeriesProps, ref: ForwardedRef<ISeriesApi<'Area'>>) => {
    const {children, ...rest} = props;

    const context = useAreaSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

