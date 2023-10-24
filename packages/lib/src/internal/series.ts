import {
    IChartApi,
    ISeriesApi,
    SeriesDataItemTypeMap,
    AreaSeriesPartialOptions,
    BarSeriesPartialOptions,
    CandlestickSeriesPartialOptions,
    HistogramSeriesPartialOptions,
    LineSeriesPartialOptions,
    BaselineSeriesPartialOptions,
    CustomSeriesPartialOptions,
    SeriesOptionsMap,
    SeriesMarker,
    Time,
    ICustomSeriesPaneView,
} from 'lightweight-charts';

import {ActionResult, clone, merge} from './utils.js';
import {ChartActionResult} from './chart.js';

export interface AreaSeriesParams extends AreaSeriesPartialOptions {
    type: 'Area';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Area'][];
    markers?: SeriesMarker<Time>[];
}

export interface BarSeriesParams extends BarSeriesPartialOptions {
    type: 'Bar';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Bar'][];
    markers?: SeriesMarker<Time>[];
}

export interface CandlestickSeriesParams extends CandlestickSeriesPartialOptions {
    type: 'Candlestick';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Candlestick'][];
    markers?: SeriesMarker<Time>[];
}

export interface HistogramSeriesParams extends HistogramSeriesPartialOptions {
    type: 'Histogram';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Histogram'][];
    markers?: SeriesMarker<Time>[];
}

export interface LineSeriesParams extends LineSeriesPartialOptions {
    type: 'Line';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Line'][];
    markers?: SeriesMarker<Time>[];
}

export interface BaselineSeriesParams extends BaselineSeriesPartialOptions {
    type: 'Baseline';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Baseline'][];
    markers?: SeriesMarker<Time>[];
}

export interface CustomSeriesParams extends CustomSeriesPartialOptions {
    type: 'Custom';
    reactive?: boolean;
    view: ICustomSeriesPaneView<Time, SeriesDataItemTypeMap['Custom'], SeriesOptionsMap['Custom']>;
    data: SeriesDataItemTypeMap['Custom'][];
    markers?: SeriesMarker<Time>[];
}

export type SeriesActionParams =
    | AreaSeriesParams
    | BarSeriesParams
    | CandlestickSeriesParams
    | HistogramSeriesParams
    | LineSeriesParams
    | BaselineSeriesParams
    | CustomSeriesParams
;

export type SeriesActionResult<T extends SeriesActionParams> = ActionResult<T> & { subject(): ISeriesApi<T['type']>; alive(): boolean }

export function series<T extends SeriesActionParams>(target: ChartActionResult, params: T): SeriesActionResult<T> {
    const emptyMarkers: SeriesMarker<Time>[] = [];

    let [subject, defaults] = createSeries(target.subject(), params);
    let data = params.reactive ? params.data : null;
    let markers = params.markers ?? emptyMarkers;
    let destroyed = false;

    // Never use shorthand properties as default values
    delete (defaults as any).borderColor;
    delete (defaults as any).wickColor;

    subject.setMarkers(markers);

    return {
        alive(): boolean {
            return !destroyed;
        },
        subject(): ISeriesApi<T['type']> {
            return subject as ISeriesApi<T['type']>;
        },
        update(nextParams: T): void {
            const {
                type: nextType,
                data: nextData,
                markers: nextMarkers = emptyMarkers,
                reactive: nextReactive,
            } = nextParams

            if (nextType !== subject.seriesType()) {
                throw new TypeError('Can not change type of series in runtime. Report a bug please');
            }

            subject.applyOptions(merge(clone(defaults), omit(nextParams)));

            if (!nextReactive) {
                data = null;
            }

            if (nextData !== data && nextReactive) {
                data = nextData;
                subject.setData(data);
            }

            if (nextMarkers !== markers) {
                markers = nextMarkers;
                subject.setMarkers(markers);
            }
        },
        destroy(): void {
            if (target.alive()) {
                target.subject().removeSeries(subject);
            }
            destroyed = true;
        }
    };
}

function createSeries<T extends SeriesActionParams>(
    chart: IChartApi,
    params: SeriesActionParams
): [
    series: ISeriesApi<T['type']>,
    defaults: SeriesOptionsMap[T['type']]
] {
    switch (params.type) {
        case 'Area': {
            const series = chart.addAreaSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series as ISeriesApi<T['type']>, defaults as SeriesOptionsMap[T['type']]];
        }
        case 'Bar': {
            const series = chart.addBarSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series as ISeriesApi<T['type']>, defaults as SeriesOptionsMap[T['type']]];
        }
        case 'Candlestick': {
            const series = chart.addCandlestickSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series as ISeriesApi<T['type']>, defaults as SeriesOptionsMap[T['type']]];
        }
        case 'Histogram': {
            const series = chart.addHistogramSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series as ISeriesApi<T['type']>, defaults as SeriesOptionsMap[T['type']]];
        }
        case 'Line': {
            const series = chart.addLineSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series as ISeriesApi<T['type']>, defaults as SeriesOptionsMap[T['type']]];
        }
        case 'Baseline': {
            const series = chart.addBaselineSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series as ISeriesApi<T['type']>, defaults as SeriesOptionsMap[T['type']]];
        }
        case 'Custom': {
            const series = chart.addCustomSeries(params.view);
            const defaults = clone(series.options());
            series.applyOptions(omit(params))
            series.setData(params.data);
            return [series as ISeriesApi<T['type']>, defaults as SeriesOptionsMap[T['type']]];
        }
    }
}

function omit<T extends { reactive?: unknown; data: unknown; type: unknown; view?: unknown }>(params: T): Omit<T, 'reactive' | 'data' | 'type' | 'view'> {
    const {reactive, data, type, view, ...rest} = params;
    return rest;
}
