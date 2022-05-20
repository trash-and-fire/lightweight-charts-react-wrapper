import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {LineSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context';
import {createSeriesHook} from './internal/create-series-hook';
import {LineSeriesParams} from '../internal/series';

const useLineSeriesAction = createSeriesHook<LineSeriesParams>('Line');

export interface LineSeriesProps extends LineSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Line'][];
    reactive?: boolean;
    children?: ReactNode;
}

export const LineSeries = memo(forwardRef((props: LineSeriesProps, ref: ForwardedRef<ISeriesApi<'Line'>>) => {
    const {children, ...rest} = props;

    const context = useLineSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

