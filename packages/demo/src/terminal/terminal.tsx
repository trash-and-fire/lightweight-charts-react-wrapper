import React, {useLayoutEffect} from 'react';
import {LastPriceAnimationMode, LineStyle, LineType, LineWidth, PriceLineSource} from 'lightweight-charts';
import {Link} from 'react-router-dom';
import {AreaSeries, Chart, PriceLine, PriceScale, TimeScale} from 'lightweight-charts-react-wrapper';
import {folder, Leva, LevaInputs, useControls} from 'leva';

import styles from './terminal.module.css';
import {ControlledAreaSeries} from './controlled-area-series';

export function Terminal() {
    useLayoutEffect(() => {
        document.documentElement.classList.add(styles['app-mode']);
        return () => document.documentElement.classList.remove(styles['app-mode']);
    },[]);

    const chart = useControls('Chart', {
        width: 600,
        height: 300,
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
                    <ControlledAreaSeries
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
                    </ControlledAreaSeries>
                </Chart>
            </section>
            <section className={styles.settings}>
                <Leva fill={true} flat={true} titleBar={false} collapsed={false}/>
            </section>
        </main>
    );
}
