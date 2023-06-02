import {LevaInputs, useControls} from 'leva';
import {LastPriceAnimationMode, LineStyle, LineType, LineWidth, PriceLineSource} from 'lightweight-charts';
import {ReactNode} from 'react';
import {AreaSeries, AreaSeriesProps} from 'lightweight-charts-react-wrapper';

export interface ControlledAreaSeriesProps {
    data: AreaSeriesProps['data'];
    children?: ReactNode;
}

export function ControlledAreaSeries(props: ControlledAreaSeriesProps): JSX.Element {
    const series = useControls('Series', {
        visible: {
            value: true,
            label: 'Visible',
        },
        title: {
            type: LevaInputs.STRING,
            value: '',
            label: 'Title',
        },
        lastValueVisible: {
            value: true,
            label: 'Show last value',
        },

        priceScaleId: {
            value: 'right',
            label: 'Price scale',
        },

        topColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            label: 'Top color',
            disabled: true,
            optional: true,
        },
        bottomColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            label: 'Bottom color',
            disabled: true,
            optional: true,
        },
        lineColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            label: 'Line color',
            disabled: true,
            optional: true,
        },

        lineWidth: {
            type: LevaInputs.SELECT,
            value: 3 as LineWidth,
            label: 'Line width',
            options: [1,2,3,4] as LineWidth[],
            disabled: true,
            optional: true,
        },
        lineType: {
            type: LevaInputs.SELECT,
            value: LineType.Simple,
            label: 'Line type',
            options: {
                Simple: LineType.Simple,
                'With steps': LineType.WithSteps,
            },
            disabled: true,
            optional: true,
        },
        lineStyle: {
            type: LevaInputs.SELECT,
            value: LineStyle.Solid,
            label: 'Line style',
            options: {
                Solid: LineStyle.Solid,
                Dashed: LineStyle.Dashed,
                'Large dashed': LineStyle.LargeDashed,
                Dotted: LineStyle.Dotted,
                'Sparse dotted': LineStyle.SparseDotted,
            },
            disabled: true,
            optional: true,
        },

        lastPriceAnimation: {
            type: LevaInputs.SELECT,
            value: LastPriceAnimationMode.Disabled,
            label: 'Last price animation',
            options: {
                Disabled: LastPriceAnimationMode.Disabled,
                Continuous: LastPriceAnimationMode.Continuous,
                'On data update': LastPriceAnimationMode.OnDataUpdate,
            },
            optional: true,
            disabled: true,
        },

        priceLineVisible: {
            value: false,
            label: 'Show price line:',
        },

        priceLineSource: {
            type: LevaInputs.SELECT,
            value: PriceLineSource.LastBar,
            label: '-- source',
            options: {
                'Last bar': PriceLineSource.LastBar,
                'Last visible': PriceLineSource.LastVisible,
            },
            disabled: true,
            optional: true,
            render: (get) => get('Series.priceLineVisible'),
        },
        priceLineWidth: {
            type: LevaInputs.SELECT,
            value: 1 as LineWidth,
            label: '-- width',
            options: [1,2,3,4] as LineWidth[],
            disabled: true,
            optional: true,
            render: (get) => get('Series.priceLineVisible'),
        },
        priceLineStyle: {
            type: LevaInputs.SELECT,
            value: LineStyle.Solid,
            label: '-- style',
            options: {
                Solid: LineStyle.Solid,
                Dashed: LineStyle.Dashed,
                'Large dashed': LineStyle.LargeDashed,
                Dotted: LineStyle.Dotted,
                'Sparse dotted': LineStyle.SparseDotted,
            },
            disabled: true,
            optional: true,
            render: (get) => get('Series.priceLineVisible'),
        },
        priceLineColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            label: '-- color',
            disabled: true,
            optional: true,
            render: (get) => get('Series.priceLineVisible'),
        },

        baseLineVisible: {
            value: false,
            label: 'Show base line:'
        },
        baseLineColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            label: '-- color',
            disabled: true,
            optional: true,
            render: (get) => get('Series.baseLineVisible'),
        },
        baseLineWidth: {
            type: LevaInputs.SELECT,
            value: 1 as LineWidth,
            label: '-- width',
            options: [1,2,3,4] as LineWidth[],
            disabled: true,
            optional: true,
            render: (get) => get('Series.baseLineVisible'),
        },
        baseLineStyle: {
            type: LevaInputs.SELECT,
            value: LineStyle.Solid,
            label: '-- style',
            options: {
                Solid: LineStyle.Solid,
                Dashed: LineStyle.Dashed,
                'Large dashed': LineStyle.LargeDashed,
                Dotted: LineStyle.Dotted,
                'Sparse dotted': LineStyle.SparseDotted,
            },
            disabled: true,
            optional: true,
            render: (get) => get('Series.baseLineVisible'),
        },
        crosshairMarkerVisible: {
            value: true,
            label: 'Show crosshair marker:',
        },
        crosshairMarkerRadius: {
            value: 4,
            label: '-- radius',
            optional: true,
            disabled: true,
            render: (get) => get('Series.crosshairMarkerVisible'),
        },
        crosshairMarkerBorderColor: {
            type: LevaInputs.COLOR,
            value: '#FFFFFF',
            label: '-- color',
            optional: true,
            disabled: true,
            render: (get) => get('Series.crosshairMarkerVisible'),
        },
        crosshairMarkerBackgroundColor: {
            type: LevaInputs.COLOR,
            value: '#FFFFFF',
            label: '-- background color',
            optional: true,
            disabled: true,
            render: (get) => get('Series.crosshairMarkerVisible'),
        }
    });

    return (
        <AreaSeries
            {...props}
            {...series}
        />
    )
}
