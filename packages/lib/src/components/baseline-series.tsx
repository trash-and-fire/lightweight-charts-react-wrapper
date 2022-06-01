import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {BaselineSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context';
import {createSeriesHook} from './internal/create-series-hook';
import {BaselineSeriesParams} from '../internal/series';

const useBaselineSeriesAction = createSeriesHook<BaselineSeriesParams>('Baseline');

export interface BaselineSeriesProps extends BaselineSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Baseline'][];
    reactive?: boolean;
    children?: ReactNode;
}

export const BaselineSeries = memo(forwardRef(function BaselineSeries(props: BaselineSeriesProps, ref: ForwardedRef<ISeriesApi<'Baseline'>>) {
    const {children, ...rest} = props;

    const context = useBaselineSeriesAction(rest, ref);

    return (
        <SeriesContext.Provider value={context.current}>
            {children}
        </SeriesContext.Provider>
    );
}));

