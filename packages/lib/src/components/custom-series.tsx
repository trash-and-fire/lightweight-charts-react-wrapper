import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {
    CustomSeriesPartialOptions,
    ICustomSeriesPaneView,
    ISeriesApi,
    SeriesDataItemTypeMap,
    SeriesMarker,
    SeriesOptionsMap,
    Time
} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context.js';
import {createSeriesHook} from './internal/create-series-hook.js';
import {CustomSeriesParams} from '../internal/series.js';

const useCustomSeriesAction = createSeriesHook<CustomSeriesParams>('Custom');

export interface CustomSeriesProps extends CustomSeriesPartialOptions {
    view: ICustomSeriesPaneView<Time, SeriesDataItemTypeMap['Custom'], SeriesOptionsMap['Custom']>;
    data: SeriesDataItemTypeMap['Custom'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}

export const CustomSeries = memo(forwardRef(function CustomSeries(props: CustomSeriesProps, ref: ForwardedRef<ISeriesApi<'Custom'>>) {
    const {children, ...rest} = props;

    const context = useCustomSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

