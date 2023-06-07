import {ReactNode, useMemo} from 'react';
import {useControls} from 'leva';
import {Chart, ChartProps} from 'lightweight-charts-react-wrapper';
import {
    ColorType,
    CrosshairMode,
    HorzAlign,
    LineStyle,
    LineWidth,
    TrackingModeExitMode,
    VertAlign,
} from 'lightweight-charts';

export interface ControlledChartProps {
    children?: ReactNode;
}

export function ControlledChart(props: ControlledChartProps): JSX.Element {
    const size = useSizeControls('Size');
    const watermark = useWatermarkControls('Watermark');
    const layout = useLayoutControls('Layout');
    const crosshair = useCrosshairControls('Crosshair');
    //
    // const leftPriceScale = useControls({
    //     	/**
    //  * Autoscaling is a feature that automatically adjusts a price scale to fit the visible range of data.
    //  * Note that overlay price scales are always auto-scaled.
    //  *
    //  * @defaultValue `true`
    //  */
    // autoScale: boolean,
    // /**
    //  * Price scale mode.
    //  *
    //  * @defaultValue {@link PriceScaleMode.Normal}
    //  */
    // mode: PriceScaleMode,
    // /**
    //  * Invert the price scale, so that a upwards trend is shown as a downwards trend and vice versa.
    //  * Affects both the price scale and the data on the chart.
    //  *
    //  * @defaultValue `false`
    //  */
    // invertScale: boolean,
    // /**
    //  * Align price scale labels to prevent them from overlapping.
    //  *
    //  * @defaultValue `true`
    //  */
    // alignLabels: boolean,
    // /**
    //  * Price scale margins.
    //  *
    //  * @defaultValue `{ bottom: 0.1, top: 0.2 }`
    //  * @example
    //  * ```js
    //  * chart.priceScale('right').applyOptions({
    //  *     scaleMargins: {
    //  *         top: 0.8,
    //  *         bottom: 0,
    //  *     },
    //  * }),
    //  * ```
    //  */
    // scaleMargins: PriceScaleMargins,
    // /**
    //  * Set true to draw a border between the price scale and the chart area.
    //  *
    //  * @defaultValue `true`
    //  */
    // borderVisible: boolean,
    // /**
    //  * Price scale border color.
    //  *
    //  * @defaultValue `'#2B2B43'`
    //  */
    // borderColor: string,
    // /**
    //  * Show top and bottom corner labels only if entire text is visible.
    //  *
    //  * @defaultValue `false`
    //  */
    // entireTextOnly: boolean,
    // /**
    //  * Indicates if this price scale visible. Ignored by overlay price scales.
    //  *
    //  * @defaultValue `true` for the right price scale and `false` for the left
    //  */
    // visible: boolean,
    // /**
    //  * Draw small horizontal line on price axis labels.
    //  *
    //  * @defaultValue `true`
    //  */
    // drawTicks: boolean,
    // })
    //
    // const timeScale = useControls({
    //     	/**
    //  * The margin space in bars from the right side of the chart.
    //  *
    //  * @defaultValue `0`
    //  */
    // rightOffset: number,
    // /**
    //  * The space between bars in pixels.
    //  *
    //  * @defaultValue `6`
    //  */
    // barSpacing: number,
    // /**
    //  * The minimum space between bars in pixels.
    //  *
    //  * @defaultValue `0.5`
    //  */
    // minBarSpacing: number,
    // /**
    //  * Prevent scrolling to the left of the first bar.
    //  *
    //  * @defaultValue `false`
    //  */
    // fixLeftEdge: boolean,
    // /**
    //  * Prevent scrolling to the right of the most recent bar.
    //  *
    //  * @defaultValue `false`
    //  */
    // fixRightEdge: boolean,
    // /**
    //  * Prevent changing the visible time range during chart resizing.
    //  *
    //  * @defaultValue `false`
    //  */
    // lockVisibleTimeRangeOnResize: boolean,
    // /**
    //  * Prevent the hovered bar from moving when scrolling.
    //  *
    //  * @defaultValue `false`
    //  */
    // rightBarStaysOnScroll: boolean,
    // /**
    //  * Show the time scale border.
    //  *
    //  * @defaultValue `true`
    //  */
    // borderVisible: boolean,
    // /**
    //  * The time scale border color.
    //  *
    //  * @defaultValue `'#2B2B43'`
    //  */
    // borderColor: string,
    // /**
    //  * Show the time scale.
    //  *
    //  * @defaultValue `true`
    //  */
    // visible: boolean,
    // /**
    //  * Show the time, not just the date, in the time scale and vertical crosshair label.
    //  *
    //  * @defaultValue `false`
    //  */
    // timeVisible: boolean,
    // /**
    //  * Show seconds in the time scale and vertical crosshair label in `hh:mm:ss` format for intraday data.
    //  *
    //  * @defaultValue `true`
    //  */
    // secondsVisible: boolean,
    // /**
    //  * Shift the visible range to the right (into the future) by the number of new bars when new data is added.
    //  *
    //  * Note that this only applies when the last bar is visible.
    //  *
    //  * @defaultValue `true`
    //  */
    // shiftVisibleRangeOnNewBar: boolean,
    // /**
    //  * Tick marks formatter can be used to customize tick marks labels on the time axis.
    //  *
    //  * @defaultValue `undefined`
    //  */
    // tickMarkFormatter?: TickMarkFormatter,
    // })
    //

    const grid = useGridControls('Grid');
    const localization = useLocalizationControls('Localization');
    const handleScroll = useHandleScrollControls('Handle scroll');
    const handleScale = useHandleScaleControls('Handle scale');
    const kineticScroll = useKineticScrollControls('Kinetic scroll');
    const trackingMode = useTrackingModeControls('Tracking mode');

    const container = useMemo(
        (): ChartProps['container'] => size.autoSize ? {
            style: { aspectRatio: '3 / 2', width: size.width, contain: 'size' },
        } : {
            ref: (r: HTMLDivElement | null) => console.log(r),
        },
        [size.autoSize, size.width]
    );

    return (
        <Chart
            {...props}
            {...size}
            container={container}
            watermark={watermark}
            layout={layout}
            trackingMode={trackingMode}
            crosshair={crosshair}
            grid={grid}
            kineticScroll={kineticScroll}
            handleScale={handleScale}
            handleScroll={handleScroll}
            localization={localization}
        />
    );
}

function useSizeControls(name: string) {
    return useControls(name, {
        autoSize: {
            value: true,
            label: 'Autosize',
        },
        width: {
            value: 600,
            label: 'Width',
        },
        height: {
            value: 300,
            label: 'Height',
            render: (get) => !get(`${name}.autoSize`),
        },
    });
}

function useWatermarkControls(name: string) {
    const watermark = useControls(name, {
        visible: {
            value: false,
            label: 'Visible',
        },
        text: {
            value: '',
            label: 'Text',
            render: (get) => get(`${name}.visible`),
        },
        color: {
            value: 'rgba(0, 0, 0, 0.5)',
            label: '-- color',
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.visible`),
        },
        fontSize: {
            value: 48,
            label: '-- font size',
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.visible`),
        },
        fontFamily: {
            value: `'Trebuchet MS', Roboto, Ubuntu, sans-serif`,
            label: '-- font family',
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.visible`),

        },
        fontStyle: {
            value: '',
            label: '-- font style',
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.visible`),
        },
        horzAlign: {
            value: 'center' as const,
            label: '-- horizontal align',
            options: ['left', 'right', 'center'] as const,
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.visible`),
        },
        vertAlign: {
            value: 'center' as const,
            label: '-- vertical align',
            options: ['left', 'right', 'center'] as const,
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.visible`),
        },
    });

    return {...watermark, vertAlign: watermark.vertAlign as VertAlign, horzAlign: watermark.horzAlign as HorzAlign};
}

function useLayoutControls(name: string) {
    const {
        backgroundType,
        backgroundBottomColor,
        backgroundTopColor,
        backgroundColor,
        ...layout
    } = useControls(name, {
        backgroundType: {
            label: 'Background:',
            value: ColorType.Solid,
            options: {
                'Solid': ColorType.Solid,
                'Vertical gradient': ColorType.VerticalGradient,
            }
        },
        backgroundColor: {
            label: '-- color',
            value: '#FFFFFF',
            render: (get) => get(`${name}.backgroundType`) === ColorType.Solid,
        },
        backgroundTopColor: {
            label: '-- top color',
            value: '#FFFFFF',
            render: (get) => get(`${name}.backgroundType`) === ColorType.VerticalGradient,
        },
        backgroundBottomColor: {
            label: '-- bottom color',
            value: '#FFFFFF',
            render: (get) => get(`${name}.backgroundType`) === ColorType.VerticalGradient,
        },
        textColor: {
            label: 'Text color',
            value: '#292929',
            optional: true,
            disabled: true,
        },
        fontSize: {
            label: 'Font size',
            value: 10,
            optional: true,
            disabled: true,
        },
        fontFamily: {
            label: 'Font family',
            value: `'Trebuchet MS', Roboto, Ubuntu, sans-serif`,
            optional: true,
            disabled: true,
        },
    });
    const background = backgroundType === ColorType.Solid ? {
        type: ColorType.Solid,
        color: backgroundColor,
    } : {
        type: ColorType.VerticalGradient,
        topColor: backgroundTopColor,
        bottomColor: backgroundBottomColor,
    };

    return {...layout, background};
}

function useCrosshairControls(name: string) {
    const {
        vertLineVisible,
        vertLineColor,
        vertLineStyle,
        vertLineWidth,
        vertLineLabelVisible,
        vertLineLabelBackgroundColor,
        horzLineVisible,
        horzLineColor,
        horzLineStyle,
        horzLineWidth,
        horzLineLabelVisible,
        horzLineLabelBackgroundColor,
        ...crosshair
    } = useControls(name, {
        mode: {
            label: 'Mode',
            value: CrosshairMode.Magnet,
            options: {
                'Magnet': CrosshairMode.Magnet,
                'Normal': CrosshairMode.Normal,
            },
            optional: true,
            disabled: true,
        },
        vertLineVisible: {
            label: 'Show vertical line',
            value: true,
        },
        vertLineColor: {
            label: '-- color',
            value: '#FF0000',
            optional: true,
            disabled: true,
        },
        vertLineStyle: {
            label: '-- style',
            value: LineStyle.Solid,
            options: {
                Solid: LineStyle.Solid,
                Dashed: LineStyle.Dashed,
                'Large dashed': LineStyle.LargeDashed,
                Dotted: LineStyle.Dotted,
                'Sparse dotted': LineStyle.SparseDotted,
            },
            disabled: true,
            optional: true,
            render: (get) => get(`${name}.vertLineVisible`),
        },
        vertLineWidth: {
            value: 1 as LineWidth,
            label: '-- width',
            options: [1, 2, 3, 4] as LineWidth[],
            disabled: true,
            optional: true,
            render: (get) => get(`${name}.vertLineVisible`),
        },
        vertLineLabelVisible: {
            label: '-- show label',
            value: true,
            render: (get) => get(`${name}.vertLineVisible`),
        },
        vertLineLabelBackgroundColor: {
            label: '-- label background',
            value: '#FF0000',
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.vertLineVisible`),
        },
        horzLineVisible: {
            label: 'Show horizontal line',
            value: true,
        },
        horzLineColor: {
            label: '-- color',
            value: '#FF0000',
            optional: true,
            disabled: true,
        },
        horzLineStyle: {
            label: '-- style',
            value: LineStyle.Solid,
            options: {
                Solid: LineStyle.Solid,
                Dashed: LineStyle.Dashed,
                'Large dashed': LineStyle.LargeDashed,
                Dotted: LineStyle.Dotted,
                'Sparse dotted': LineStyle.SparseDotted,
            },
            disabled: true,
            optional: true,
            render: (get) => get(`${name}.horzLineVisible`),
        },
        horzLineWidth: {
            value: 1 as LineWidth,
            label: '-- width',
            options: [1, 2, 3, 4] as LineWidth[],
            disabled: true,
            optional: true,
            render: (get) => get(`${name}.horzLineVisible`),
        },
        horzLineLabelVisible: {
            label: '-- show label',
            value: true,
            render: (get) => get(`${name}.horzLineVisible`),
        },
        horzLineLabelBackgroundColor: {
            label: '-- label background',
            value: '#FF0000',
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.horzLineVisible`),
        },
    })

    const vertLine = {
        visible: vertLineVisible,
        color: vertLineColor,
        style: vertLineStyle,
        width: vertLineWidth,
        labelVisible: vertLineLabelVisible,
        labelBackgroundColor: vertLineLabelBackgroundColor,
    };

    const horzLine = {
        visible: horzLineVisible,
        color: horzLineColor,
        style: horzLineStyle,
        width: horzLineWidth,
        labelVisible: horzLineLabelVisible,
        labelBackgroundColor: horzLineLabelBackgroundColor,
    };

    return {...crosshair, vertLine, horzLine};
}

function useTrackingModeControls(name: string) {
    return useControls(name, {
        exitMode: {
            label: 'Exit mode',
            value: TrackingModeExitMode.OnNextTap,
            options: {
                'On next tap': TrackingModeExitMode.OnNextTap,
                'On touch end': TrackingModeExitMode.OnTouchEnd,
            },
            optional: true,
            disabled: true,
        },
    })
}

function useGridControls(name: string) {
    const grid = useControls(name, {
        vertLinesVisible: {
            label: 'Show vertical lines:',
            value: true,
        },
        vertLinesColor: {
            label: '-- color',
            value: '#FF0000',
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.vertLinesVisible`),
        },
        vertLinesStyle: {
            label: '-- style',
            value: LineStyle.Dashed,
            options: {
                Solid: LineStyle.Solid,
                Dashed: LineStyle.Dashed,
                'Large dashed': LineStyle.LargeDashed,
                Dotted: LineStyle.Dotted,
                'Sparse dotted': LineStyle.SparseDotted,
            },
            disabled: true,
            optional: true,
            render: (get) => get(`${name}.vertLinesVisible`),
        },

        horzLinesVisible: {
            label: 'Show horizontal lines:',
            value: true,
        },
        horzLinesColor: {
            label: '-- color',
            value: '#FF0000',
            optional: true,
            disabled: true,
            render: (get) => get(`${name}.horzLinesVisible`),
        },
        horzLinesStyle: {
            label: '-- style',
            value: LineStyle.Dashed,
            options: {
                Solid: LineStyle.Solid,
                Dashed: LineStyle.Dashed,
                'Large dashed': LineStyle.LargeDashed,
                Dotted: LineStyle.Dotted,
                'Sparse dotted': LineStyle.SparseDotted,
            },
            disabled: true,
            optional: true,
            render: (get) => get(`${name}.horzLinesVisible`),
        },
    });

    return {
        vertLines: {
            visible: grid.vertLinesVisible,
            style: grid.vertLinesStyle,
            color: grid.vertLinesColor,
        },
        horzLines: {
            visible: grid.horzLinesVisible,
            style: grid.horzLinesStyle,
            color: grid.horzLinesColor,
        },
    };
}

function useKineticScrollControls(name: string) {
    return useControls(name, {
        touch: {
            label: 'Touch',
            value: true,
        },
        mouse: {
            label: 'Mouse',
            value: false,
        },
    });
}

function useHandleScaleControls(name: string) {
    const {
        axisPressedMouseMoveTime,
        axisPressedMouseMovePrice,
        ...handleScale
    } = useControls(name, {
        mouseWheel: {
            label: 'Mouse wheel',
            value: true,
        },
        pinch: {
            label: 'Pinch',
            value: true,
        },
        axisPressedMouseMoveTime: {
            label: 'Axis pressed mouse move time',
            value: true,
        },
        axisPressedMouseMovePrice: {
            label: 'Axis pressed mouse move price',
            value: true,
        },
        axisDoubleClickReset: {
            label: 'Axis double click reset',
            value: true,
        },
    });

    return {
        ...handleScale,
        axisPressedMouseMove: {
            time: axisPressedMouseMoveTime,
            price: axisPressedMouseMovePrice,
        },
    };
}

function useHandleScrollControls(name: string) {
    return useControls(name, {
        mouseWheel: {
            label: 'Mouse wheel',
            value: true,
        },
        pressedMouseMove: {
            label: 'Pressed mouse move',
            value: true,
        },
        horzTouchDrag: {
            label: 'Horizontal touch drag',
            value: true,
        },
        vertTouchDrag: {
            label: 'Vertical touch drag',
            value: true,
        },
    });
}

function useLocalizationControls(name: string) {
    return useControls(name, {
        locale: {
            label: 'Locale',
            value: 'de-DE',
            optional: true,
            disabled: true,
        },

        dateFormat: {
            label: 'Date format',
            value: `'dd MMM \'yyyy'`,
            optional: true,
            disabled: true,
        },
    });
}
