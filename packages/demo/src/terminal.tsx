import React, {useLayoutEffect} from 'react';
import {LastPriceAnimationMode, LineStyle, LineType, LineWidth, PriceLineSource} from 'lightweight-charts';
import {Link} from 'react-router-dom';
import {AreaSeries, Chart, PriceLine, PriceScale, TimeScale} from 'lightweight-charts-react-wrapper';
import {folder, Leva, LevaInputs, useControls} from 'leva';

import styles from './terminal.module.css';

export function Terminal() {
    useLayoutEffect(() => {
        document.documentElement.classList.add(styles['app-mode']);
        return () => document.documentElement.classList.remove(styles['app-mode']);
    },[]);

    const chart = useControls('Chart', {
        width: 600,
        height: 300,
    });

    const {top, bottom, ...series} = useControls('Series', {
        lastValueVisible: true,
        title: {
            type: LevaInputs.STRING,
            value: '',
            disabled: true,
            optional: true,
        },
        priceScaleId: 'right',
        visible: true,
        priceLineVisible: false,
        priceLineSource: {
            type: LevaInputs.SELECT,
            value: PriceLineSource.LastBar,
            options: [PriceLineSource.LastBar, PriceLineSource.LastVisible],
            render: (get) => get('Series.priceLineVisible'),
        },
        priceLineWidth: {
            type: LevaInputs.SELECT,
            value: 1 as LineWidth,
            options: [1,2,3,4] as LineWidth[],
            render: (get) => get('Series.priceLineVisible'),
        },
        priceLineStyle: {
            type: LevaInputs.SELECT,
            value: LineStyle.Solid,
            options: [LineStyle.Solid, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.Dotted, LineStyle.SparseDotted],
            disabled: true,
            optional: true,
            render: (get) => get('Series.priceLineVisible'),
        },
        priceLineColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            disabled: true,
            optional: true,
            render: (get) => get('Series.priceLineVisible'),
        },
        baseLineVisible: false,
        baseLineColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            disabled: true,
            optional: true,
            render: (get) => get('Series.baseLineVisible'),
        },
        baseLineWidth: {
            type: LevaInputs.SELECT,
            value: 1 as LineWidth,
            options: [1,2,3,4] as LineWidth[],
            render: (get) => get('Series.baseLineVisible'),
        },
        baseLineStyle: {
            type: LevaInputs.SELECT,
            value: LineStyle.Solid,
            options: [LineStyle.Solid, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.Dotted, LineStyle.SparseDotted],
            disabled: true,
            optional: true,
            render: (get) => get('Series.baseLineVisible'),
        },
        topColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            disabled: true,
            optional: true,
        },
        bottomColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            disabled: true,
            optional: true,
        },
        lineColor: {
            type: LevaInputs.COLOR,
            value: '#FF0000',
            disabled: true,
            optional: true,
        },
        scaleMargins: folder({
            top: {
                min: 0,
                max: 1,
                value: 0.1,
            },
            bottom: {
                min: 0,
                max: 1,
                value: 0.1,
            },
        }),
        lineStyle: {
            type: LevaInputs.SELECT,
            value: LineStyle.Solid,
            options: [LineStyle.Solid, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.Dotted, LineStyle.SparseDotted],
            disabled: true,
            optional: true,
        },
        lineWidth: {
            type: LevaInputs.SELECT,
            value: 3 as LineWidth,
            options: [1,2,3,4] as LineWidth[],
        },
        lineType: {
            type: LevaInputs.SELECT,
            value: LineType.Simple,
            options: [LineType.Simple, LineType.WithSteps],
        },
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: {
            value: 4,
            render: (get) => get('Series.crosshairMarkerVisible'),
        },
        crosshairMarkerBorderColor: {
            type: LevaInputs.COLOR,
            value: '#FFFFFF',
            optional: true,
            disabled: true,
            render: (get) => get('Series.crosshairMarkerVisible'),
        },
        crosshairMarkerBackgroundColor: {
            type: LevaInputs.COLOR,
            value: '#FFFFFF',
            optional: true,
            disabled: true,
            render: (get) => get('Series.crosshairMarkerVisible'),
        },
        lastPriceAnimation: {
            type: LevaInputs.SELECT,
            value: LastPriceAnimationMode.Disabled,
            options: [LastPriceAnimationMode.Disabled, LastPriceAnimationMode.Continuous, LastPriceAnimationMode.OnDataUpdate],
        },
    });

    return (
        <main className={styles.main}>
            <section className={styles.chart}>
                <Link to="/">
                    Gallery
                </Link>
                <Chart {...chart}>
                    <PriceScale id="left" visible={true}/>
                    <TimeScale onVisibleLogicalRangeChange={console.log}/>
                    <AreaSeries
                        {...series}
                        scaleMargins={{top, bottom}}
                        data={[
                            {time: '2018-10-19', value: 52.89},
                            {time: '2018-10-22', value: 51.65},
                            {time: '2018-10-23', value: 51.56},
                            {time: '2018-10-24', value: 50.19},
                            {time: '2018-10-25', value: 51.86},
                            {time: '2018-10-26', value: 51.25},
                            {time: '2018-10-29', value: 52.23},
                            {time: '2018-10-30', value: 52.69}
                        ]}
                    >
                        <PriceLine
                            title="price"
                            price={51}
                            color="#FF0000"
                            lineWidth={1}
                            lineStyle={LineStyle.Solid}
                            lineVisible={true}
                            axisLabelVisible={true}
                        />
                    </AreaSeries>
                </Chart>
            </section>
            <section className={styles.settings}>
                <Leva fill={true} flat={true} titleBar={false} collapsed={false}/>
            </section>
        </main>
    );
}
