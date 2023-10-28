import {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode,
} from 'react';
import {
    CustomSeriesOptions,
    ICustomSeriesPaneView,
    ISeriesApi,
    SeriesDataItemTypeMap,
    SeriesMarker,
    SeriesPartialOptions,
    Time
} from 'lightweight-charts';

import {SeriesContext} from './internal/series-context.js';
import {createSeriesHook} from './internal/create-series-hook.js';
import {CustomSeriesParams} from '../internal/series.js';

const useCustomSeriesAction = createSeriesHook<CustomSeriesParams>('Custom', (props) => [props.view]);

export type CustomSeriesProps<T extends CustomSeriesOptions = CustomSeriesOptions> = SeriesPartialOptions<T> & {
    view: ICustomSeriesPaneView<Time, SeriesDataItemTypeMap['Custom'], T>;
    data: SeriesDataItemTypeMap['Custom'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}

export const CustomSeries = memo(forwardRef(
    function CustomSeries(props: CustomSeriesProps, ref: ForwardedRef<ISeriesApi<'Custom'>>) {
        const {children, ...rest} = props;

        const context = useCustomSeriesAction(rest, ref);

        return (
            <SeriesContext.Provider value={context.current}>
                {children}
            </SeriesContext.Provider>
        );
    }
)) as {
    <T extends CustomSeriesOptions>(props: CustomSeriesProps<T>, ref: ForwardedRef<ISeriesApi<'Custom'>>): JSX.Element;
};
