import React, {useLayoutEffect} from 'react';
import {LineStyle} from 'lightweight-charts';
import {Link} from 'react-router-dom';
import {PriceLine, PriceScale, TimeScale} from 'lightweight-charts-react-wrapper';
import {Leva} from 'leva';

import {ControlledAreaSeries} from './controlled-area-series';
import {ControlledChart} from './controlled-chart';
import {data} from './data/line-data';

import styles from './terminal.module.css';

export function Terminal() {
    useLayoutEffect(() => {
        document.documentElement.classList.add(styles['app-mode']);
        return () => document.documentElement.classList.remove(styles['app-mode']);
    },[]);

    return (
        <main className={styles.main}>
            <section className={styles.chart}>
                <Link to="/">
                    Gallery
                </Link>
                <ControlledChart>
                    <PriceScale id="left" visible={true}/>
                    <TimeScale onVisibleLogicalRangeChange={console.log}/>
                    <ControlledAreaSeries data={data}>
                        <PriceLine
                            title="price"
                            price={26}
                            color="#FF0000"
                            lineWidth={1}
                            lineStyle={LineStyle.Solid}
                            lineVisible={true}
                            axisLabelVisible={true}
                        />
                    </ControlledAreaSeries>
                </ControlledChart>
            </section>
            <section className={styles.settings}>
                <Leva fill={true} flat={true} titleBar={false} collapsed={false}/>
            </section>
        </main>
    );
}
