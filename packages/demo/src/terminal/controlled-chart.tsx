import {ReactNode} from 'react';
import {useControls} from 'leva';
import {Chart} from 'lightweight-charts-react-wrapper';
import {
    ColorType,
    CrosshairMode,
    HorzAlign,
    LineStyle,
    LineWidth,
    TrackingModeExitMode,
    VertAlign
} from 'lightweight-charts';

export interface ControlledChartProps {
    children?: ReactNode;
}

export function ControlledChart(props: ControlledChartProps): JSX.Element {
    const size = useControls('Size', {
        width: 600,
        height: 300,
    });

    const watermark = useControls('Watermark', {
        visible: {
            value: false,
            label: 'Visible',
        },
        text: {
            value: '',
            label: 'Text',
            render: (get) => get('Watermark.visible'),
        },
        color: {
            value: 'rgba(0, 0, 0, 0.5)',
            label: '-- color',
            optional: true,
            disabled: true,
            render: (get) => get('Watermark.visible'),
        },
        fontSize: {
            value: 48, label: '-- font size',
            optional: true,
            disabled: true,
            render: (get) => get('Watermark.visible'),
        },
        fontFamily: {
            value: `'Trebuchet MS', Roboto, Ubuntu, sans-serif`,
            label: '-- font family',
            optional: true,
            disabled: true,
            render: (get) => get('Watermark.visible'),

        },
        fontStyle: {
            value: '',
            label: '-- font style',
            optional: true,
            disabled: true,
            render: (get) => get('Watermark.visible'),
        },
        horzAlign: {
            value: 'center' as const,
            label: '-- horizontal align',
            options: ['left', 'right', 'center'] as const,
            optional: true,
            disabled: true,
            render: (get) => get('Watermark.visible'),
        },
        vertAlign: {
            value: 'center' as const,
            label: '-- vertical align',
            options: ['left', 'right', 'center'] as const,
            optional: true,
            disabled: true,
            render: (get) => get('Watermark.visible'),
        },
    })

    const {
        backgroundType,
        backgroundBottomColor,
        backgroundTopColor,
        backgroundColor,
        ...layout
    } = useControls('Layout', {
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
            render: (get) => get('Layout.backgroundType') === ColorType.Solid,
        },
        backgroundTopColor: {
            label: '-- top color',
            value: '#FFFFFF',
            render: (get) => get('Layout.backgroundType') === ColorType.VerticalGradient,
        },
        backgroundBottomColor: {
            label: '-- bottom color',
            value: '#FFFFFF',
            render: (get) => get('Layout.backgroundType') === ColorType.VerticalGradient,
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
    } = useControls('Crosshair', {
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
            render: (get) => get('Crosshair.vertLineVisible'),
        },
        vertLineWidth: {
            value: 1 as LineWidth,
            label: '-- width',
            options: [1,2,3,4] as LineWidth[],
            disabled: true,
            optional: true,
            render: (get) => get('Crosshair.vertLineVisible'),
        },
        vertLineLabelVisible: {
            label: '-- show label',
            value: true,
            render: (get) => get('Crosshair.vertLineVisible'),
        },
        vertLineLabelBackgroundColor: {
            label: '-- label background',
            value: '#FF0000',
            optional: true,
            disabled: true,
            render: (get) => get('Crosshair.vertLineVisible'),
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
            render: (get) => get('Crosshair.horzLineVisible'),
        },
        horzLineWidth: {
            value: 1 as LineWidth,
            label: '-- width',
            options: [1,2,3,4] as LineWidth[],
            disabled: true,
            optional: true,
            render: (get) => get('Crosshair.horzLineVisible'),
        },
        horzLineLabelVisible: {
            label: '-- show label',
            value: true,
            render: (get) => get('Crosshair.horzLineVisible'),
        },
        horzLineLabelBackgroundColor: {
            label: '-- label background',
            value: '#FF0000',
            optional: true,
            disabled: true,
            render: (get) => get('Crosshair.horzLineVisible'),
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
    //
    // const grid = useControls({
    //     	/**
    //  * Vertical grid line options.
    //  */
    // vertLines: GridLineOptions,
    // /**
    //  * Horizontal grid line options.
    //  */
    // horzLines: GridLineOptions,
    // })
    //
    // const localization = useControls({
    //     	/**
    //  * Current locale used to format dates. Uses the browser's language settings by default.
    //  *
    //  * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation
    //  * @defaultValue `navigator.language`
    //  */
    // locale: string,
    // /**
    //  * Override formatting of the price scale crosshair label. Can be used for cases that can't be covered with built-in price formats.
    //  *
    //  * @see {@link PriceFormatCustom}
    //  * @defaultValue `undefined`
    //  */
    // priceFormatter?: PriceFormatterFn,
    // /**
    //  * Override formatting of the time scale crosshair label.
    //  *
    //  * @defaultValue `undefined`
    //  */
    // timeFormatter?: TimeFormatterFn,
    // /**
    //  * Date formatting string.
    //  *
    //  * Can contain `yyyy`, `yy`, `MMMM`, `MMM`, `MM` and `dd` literals which will be replaced with corresponding date's value.
    //  *
    //  * Ignored if {@link timeFormatter} has been specified.
    //  *
    //  * @defaultValue `'dd MMM \'yy'`
    //  */
    // dateFormat: string,
    // })
    //
    // const handleScroll = useControls({
    //     	/**
    //  * Enable scrolling with the mouse wheel.
    //  *
    //  * @defaultValue `true`
    //  */
    // mouseWheel: boolean,
    // /**
    //  * Enable scrolling by holding down the left mouse button and moving the mouse.
    //  *
    //  * @defaultValue `true`
    //  */
    // pressedMouseMove: boolean,
    // /**
    //  * Enable horizontal touch scrolling.
    //  *
    //  * When enabled the chart handles touch gestures that would normally scroll the webpage horizontally.
    //  *
    //  * @defaultValue `true`
    //  */
    // horzTouchDrag: boolean,
    // /**
    //  * Enable vertical touch scrolling.
    //  *
    //  * When enabled the chart handles touch gestures that would normally scroll the webpage vertically.
    //  *
    //  * @defaultValue `true`
    //  */
    // vertTouchDrag: boolean,
    // })
    //
    // const handleScale = useControls({
    //     	/**
    //  * Enable scaling with the mouse wheel.
    //  *
    //  * @defaultValue `true`
    //  */
    // mouseWheel: boolean,
    // /**
    //  * Enable scaling with pinch/zoom gestures.
    //  *
    //  * @defaultValue `true`
    //  */
    // pinch: boolean,
    // /**
    //  * Enable scaling the price and/or time scales by holding down the left mouse button and moving the mouse.
    //  */
    // axisPressedMouseMove: AxisPressedMouseMoveOptions | boolean,
    // /**
    //  * Enable resetting scaling by double-clicking the left mouse button.
    //  *
    //  * @defaultValue `true`
    //  */
    // axisDoubleClickReset: boolean,
    // })
    //
    // const kineticScroll = useControls({
    //     	/**
    //  * Enable kinetic scroll with touch gestures.
    //  *
    //  * @defaultValue `true`
    //  */
    // touch: boolean,
    // /**
    //  * Enable kinetic scroll with the mouse.
    //  *
    //  * @defaultValue `false`
    //  */
    // mouse: boolean,
    // })
    //
    const trackingMode = useControls('Tracking Mode', {
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

    return (
        <Chart
            {...props}
            {...size}
            watermark={{...watermark, vertAlign: watermark.vertAlign as VertAlign, horzAlign: watermark.horzAlign as HorzAlign}}
            layout={{...layout, background}}
            trackingMode={trackingMode}
            crosshair={{...crosshair, vertLine, horzLine}}
        />
    );
}
