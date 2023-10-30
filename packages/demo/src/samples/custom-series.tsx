import React, {MutableRefObject, useLayoutEffect, useRef, useState} from 'react';
import {
    BitmapCoordinatesRenderingScope,
    CanvasRenderingTarget2D,
} from 'fancy-canvas';
import {
    CustomData,
    CustomSeriesPricePlotValues,
    ICustomSeriesPaneView,
    PaneRendererCustomData,
    WhitespaceData,
    Time,
    CustomSeriesOptions,
    customSeriesDefaultOptions,
    Range,
    Logical,
    ICustomSeriesPaneRenderer,
    PriceToCoordinateConverter,
    LineData,
    IChartApi,
    DeepPartial,
} from 'lightweight-charts';

import {Chart, CustomSeries} from 'lightweight-charts-react-wrapper';

export default function BrushableSeries() {
    const [chart, setChart] = useState<IChartApi | null>(null);
    const container = useRef<HTMLDivElement | null>(null);

    const [view, options] = useBrushableView(chart, container);
    return (
        <>
            <h1>Custom series: brushable</h1>
            <Chart
                width={600}
                height={300}
                handleScale={false}
                handleScroll={false}
                timeScale={{borderVisible: false}}
                rightPriceScale={{borderVisible: false}}
                grid={{vertLines: {visible: false}, horzLines: {visible: false}}}
                ref={setChart}
                container={{ref: container}}
            >
                <CustomSeries
                    view={view}
                    data={data}
                    {...options}
                />
            </Chart>
        </>
    )
}

function useBrushableView(chart: IChartApi | null, containerRef: MutableRefObject<HTMLDivElement | null>): [
    view: BrushableAreaSeries<BrushableAreaData>,
    options: DeepPartial<BrushableAreaSeriesOptions>,
] {
    const [view] = useState(() => new BrushableAreaSeries());
    const [options, setOptions] = useState<DeepPartial<BrushableAreaSeriesOptions>>(() => ({
        ...baseStyle,
        priceLineVisible: false,
    }));

    useLayoutEffect(
        () => {
            if (containerRef.current === null || chart === null) {
                return;
            }

            const container = containerRef.current;

            chart.timeScale().fitContent();

            interface MouseState {
                drawing: boolean;
                startLogical: number | null;
                activeRange: boolean;
            }

            const mouseState: MouseState = {
                drawing: false,
                startLogical: null,
                activeRange: false,
            };

            function determinePaneXLogical(mouseX: number): Logical | null {
                if (chart === null || container === null) {
                    return null;
                }

                const chartBox = container.getBoundingClientRect();
                const x = mouseX - chartBox.left - chart.priceScale('left').width();
                if (x < 0 || x > chart.timeScale().width()) return null;
                return chart.timeScale().coordinateToLogical(x);
            }

            container.addEventListener('mousedown', (event: MouseEvent) => {
                setOptions({
                    brushRanges: [],
                    ...baseStyle,
                });
                mouseState.startLogical = determinePaneXLogical(event.clientX);
                mouseState.drawing = mouseState.startLogical !== null;
                mouseState.activeRange = false;
            });
            container.addEventListener('mousemove', (event: MouseEvent) => {
                if (!mouseState.drawing) return;
                const endLogical = determinePaneXLogical(event.clientX);
                if (endLogical !== null && mouseState.startLogical !== null) {
                    const first = Math.min(mouseState.startLogical, endLogical);
                    const end = Math.max(mouseState.startLogical, endLogical);
                    if (first === end) return;
                    mouseState.activeRange = true;
                    setOptions({
                        brushRanges: [
                            {
                                range: {
                                    from: first,
                                    to: end,
                                },
                                style: greenStyle,
                            },
                        ],
                        ...fadeStyle,
                    } as unknown as Partial<BrushableAreaSeriesOptions>);
                }
            });

            container.addEventListener('mouseup', () => {
                mouseState.drawing = false;
                if (!mouseState.activeRange) {
                    setOptions({
                        brushRanges: [],
                        ...baseStyle,
                    });
                }
            });

            container.addEventListener('mouseleave', () => {
                mouseState.drawing = false;
            });
        },
        [chart]
    );

    return [view, options];
}

const greenStyle: Partial<BrushableAreaStyle> = {
    lineColor: 'rgb(4,153,129)',
    topColor: 'rgba(4,153,129, 0.4)',
    bottomColor: 'rgba(4,153,129, 0)',
    lineWidth: 3,
};

const fadeStyle: Partial<BrushableAreaStyle> = {
    lineColor: 'rgb(40,98,255, 0.2)',
    topColor: 'rgba(40,98,255, 0.05)',
    bottomColor: 'rgba(40,98,255, 0)',
};

const baseStyle: Partial<BrushableAreaStyle> = {
    lineColor: 'rgb(40,98,255)',
    topColor: 'rgba(40,98,255, 0.4)',
    bottomColor: 'rgba(40,98,255, 0)',
};

// ------------------------------------------------------
// -------------- Custom Series Renderer ----------------
// ------------------------------------------------------

/**
 * BrushableArea Series Data
 */
interface BrushableAreaData extends CustomData {
    value: number;
}

interface BrushRange {
    range: Range<Logical>;
    style: BrushableAreaStyle;
}

interface BrushableAreaStyle {
    lineColor: string;
    topColor: string;
    bottomColor: string;
    lineWidth: number;
}

interface BrushableAreaSeriesOptions extends CustomSeriesOptions, BrushableAreaStyle {
    basePrice: number;
    /**
     * If you need to remove the brush ranges then set to null instead of an
     * empty array.
     */
    brushRanges: readonly BrushRange[];
}

const defaultOptions: BrushableAreaSeriesOptions = {
    ...customSeriesDefaultOptions,
    lineColor: 'rgb(40,98,255)',
    topColor: 'rgba(40,98,255, 0.4)',
    bottomColor: 'rgba(40,98,255, 0)',
    lineWidth: 2,
    basePrice: 0,
    brushRanges: [],
} as const;

class BrushableAreaSeries<TData extends BrushableAreaData> implements ICustomSeriesPaneView<
    Time,
    TData,
    BrushableAreaSeriesOptions
> {
    _renderer: BrushableAreaSeriesRenderer<TData> = new BrushableAreaSeriesRenderer();

    priceValueBuilder(plotRow: TData): CustomSeriesPricePlotValues {
        return [plotRow.value];
    }

    isWhitespace(data: TData | WhitespaceData): data is WhitespaceData {
        return (data as Partial<TData>).value === undefined;
    }

    renderer(): BrushableAreaSeriesRenderer<TData> {
        return this._renderer;
    }

    update(
        data: PaneRendererCustomData<Time, TData>,
        options: BrushableAreaSeriesOptions
    ): void {
        this._renderer.update(data, options);
    }

    defaultOptions() {
        return defaultOptions;
    }
}

interface BrushableAreaBarItem {
    x: number;
    y: number;
}

class BrushableAreaSeriesRenderer<TData extends BrushableAreaData> implements ICustomSeriesPaneRenderer {
    _data: PaneRendererCustomData<Time, TData> | null = null;
    _options: BrushableAreaSeriesOptions | null = null;

    draw(
        target: CanvasRenderingTarget2D,
        priceConverter: PriceToCoordinateConverter
    ): void {
        target.useBitmapCoordinateSpace(scope =>
            this._drawImpl(scope, priceConverter)
        );
    }

    update(
        data: PaneRendererCustomData<Time, TData>,
        options: BrushableAreaSeriesOptions
    ): void {
        this._data = data;
        this._options = options;
    }

    _drawImpl(
        renderingScope: BitmapCoordinatesRenderingScope,
        priceToCoordinate: PriceToCoordinateConverter
    ): void {
        if (
            this._data === null ||
            this._data.bars.length === 0 ||
            this._data.visibleRange === null ||
            this._options === null
        ) {
            return;
        }
        const options = this._options;

        const bars: BrushableAreaBarItem[] = this._data.bars.map(bar => {
            return {
                x: Math.round(bar.x * renderingScope.horizontalPixelRatio),
                y:
                    priceToCoordinate(bar.originalData.value)! *
                    renderingScope.verticalPixelRatio,
            };
        });

        const ctx = renderingScope.context;
        const bottomChartY = renderingScope.bitmapSize.height;

        const getRangeStyle = (index: number): BrushableAreaStyle => {
            if (typeof options.brushRanges === 'string') return options;
            const foundRange = options.brushRanges.findIndex(
                (brushRange: BrushRange) => {
                    return index >= brushRange.range.from && index < brushRange.range.to;
                }
            );
            if (foundRange >= 0) {
                return options.brushRanges[foundRange].style;
            }
            return options;
        };

        const rangeStyles: BrushableAreaStyle[] = new Array(
            this._data.visibleRange.to
        );
        const firstBar = bars[this._data.visibleRange.from];
        let minY = firstBar.y;
        for (
            let i = this._data.visibleRange.from + 1;
            i < this._data.visibleRange.to;
            i++
        ) {
            rangeStyles[i] = getRangeStyle(i);
            const bar = bars[i];
            if (bar.y < minY) minY = bar.y;
        }

        const gradientMap: Map<string, CanvasGradient> = new Map();
        function getGradient(bottom: string, top: string): CanvasGradient {
            const hash = bottom + top;
            if (gradientMap.has(hash)) return gradientMap.get(hash)!;
            const gradient = ctx.createLinearGradient(0, bottomChartY, 0, minY);
            gradient.addColorStop(0, bottom);
            gradient.addColorStop(1, top);
            gradientMap.set(hash, gradient);
            return gradient;
        }

        // DRAW AREAS
        let previousPosition: [number, number] = [firstBar.x, firstBar.y];
        for (
            let i = this._data.visibleRange.from + 1;
            i < this._data.visibleRange.to;
            i++
        ) {
            const bar = bars[i];
            const rangeStyle = rangeStyles[i];
            ctx.beginPath();
            ctx.moveTo(previousPosition[0], previousPosition[1]);
            ctx.lineTo(bar.x, bar.y);
            ctx.lineTo(bar.x, bottomChartY);
            ctx.lineTo(previousPosition[0], bottomChartY);
            ctx.closePath();
            ctx.fillStyle = getGradient(rangeStyle.bottomColor, rangeStyle.topColor);
            ctx.fill();
            previousPosition = [bar.x, bar.y];
        }

        // DRAW LINE
        previousPosition = [firstBar.x, firstBar.y];
        for (
            let i = this._data.visibleRange.from + 1;
            i < this._data.visibleRange.to;
            i++
        ) {
            const bar = bars[i];
            const rangeStyle = rangeStyles[i];
            const rangeStyleChanged =
                i > 0 ? rangeStyles[i - 1] !== rangeStyle : false;
            const rangeStyleWillChange =
                i === this._data.visibleRange.to - 1
                    ? true
                    : rangeStyles[i + 1] !== rangeStyle;
            if (rangeStyleChanged) {
                ctx.beginPath();
                ctx.moveTo(previousPosition[0], previousPosition[1]);
            }
            ctx.lineTo(bar.x, bar.y);
            if (rangeStyleWillChange) {
                ctx.strokeStyle = rangeStyle.lineColor;
                ctx.lineWidth =
                    rangeStyle.lineWidth * renderingScope.verticalPixelRatio;
                ctx.stroke();
            }
            previousPosition = [bar.x, bar.y];
        }
    }
}

let randomFactor = 25 + Math.random() * 25;
function generateLineData(numberOfPoints: number = 500): LineData[] {
    randomFactor = 25 + Math.random() * 25;
    const res = [];
    const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
    for (let i = 0; i < numberOfPoints; ++i) {
        const time = (date.getTime() / 1000) as Time;
        const value = samplePoint(i);
        res.push({
            time,
            value,
        });

        date.setUTCDate(date.getUTCDate() + 1);
    }

    return res;
}
function samplePoint(i: number) {
    return i * (0.5 +
        Math.sin(i / 10) * 0.2 +
        Math.sin(i / 20) * 0.4 +
        Math.sin(i / randomFactor) * 0.8 +
        Math.sin(i / 500) * 0.5) +
    200;
}

// -----------------------------------------------

const data: (BrushableAreaData | WhitespaceData)[] = generateLineData();
