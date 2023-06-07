import React, {useCallback, useRef, useState} from 'react';
import {AreaData, BusinessDay, CandlestickData, CrosshairMode, ISeriesApi, MouseEventParams} from 'lightweight-charts';
import {Chart, LineSeries, CandlestickSeries} from 'lightweight-charts-react-wrapper';

import styles from './moving-average.module.css';

export default function MovingAverage() {
    const ref = useRef<ISeriesApi<'Line'>>(null);
    const [value, setValue] = useState('n/a');

    const handleCrosshairMove = useCallback((e: MouseEventParams) => {
        if (ref.current === null) {
            return;
        }
        const data = e.seriesData.get(ref.current) as AreaData | undefined;
        if (data !== undefined) {
            setValue((Math.round(data.value * 100) / 100).toFixed(2));
        } else {
            setValue('n/a');
        }
    }, []);

    return (
        <>
            <h1>Moving Average</h1>
            <div className={styles.container}>
                <Chart
                    width={600}
                    height={300}
                    crosshair={{mode: CrosshairMode.Normal}}
                    onCrosshairMove={handleCrosshairMove}
                >
                    <CandlestickSeries
                        data={candles}
                    />
                    <LineSeries
                        data={sma}
                        color="rgba(4, 111, 232, 1)"
                        lineWidth={2}
                        ref={ref}
                    />
                </Chart>
                <div className={styles['sma-legend']}>
                    MA10 <span style={{color: 'rgba(4, 111, 232, 1)'}}>{value}</span>
                </div>
            </div>
        </>
    )
}

const candles = generateBarsData();
const sma = calculateSMA(candles, 10);

function calculateSMA(data: CandlestickData[], count: number) {
    const avg = (data: CandlestickData[]) => {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum += data[i].close;
        }
        return sum / data.length;
    };
    const result = [];
    for (let i = count - 1, len = data.length; i < len; i++) {
        const val = avg(data.slice(i - count + 1, i));
        result.push({time: data[i].time, value: val});
    }
    return result;
}

function generateBarsData(period?: { timeFrom: BusinessDay, timeTo: BusinessDay}): CandlestickData[] {
    const res: Partial<CandlestickData>[] = [];
    const controlPoints = generateControlPoints(res, period);
    for (let i = 0; i < controlPoints.length - 1; i++) {
        const left = controlPoints[i];
        const right = controlPoints[i + 1];
        fillBarsSegment(left, right, res);
    }
    return res as CandlestickData[];
}

function fillBarsSegment(left: { price: number; index: number }, right: { price: number; index: number }, points: Partial<CandlestickData>[]) {
    const deltaY = right.price - left.price;
    const deltaX = right.index - left.index;
    const angle = deltaY / deltaX;
    for (let i = left.index; i <= right.index; i++) {
        const basePrice = left.price + (i - left.index) * angle;
        const openNoise = (0.1 - Math.random() * 0.2) + 1;
        const closeNoise = (0.1 - Math.random() * 0.2) + 1;
        const open = basePrice * openNoise;
        const close = basePrice * closeNoise;
        const high = Math.max(basePrice * (1 + Math.random() * 0.2), open, close);
        const low = Math.min(basePrice * (1 - Math.random() * 0.2), open, close);
        points[i].open = open;
        points[i].high = high;
        points[i].low = low;
        points[i].close = close;
    }
}

function generateControlPoints(res: Partial<CandlestickData>[], period?: { timeFrom: BusinessDay, timeTo: BusinessDay }, dataMultiplier?: number) {
    let time = period !== undefined ? period.timeFrom : {day: 1, month: 1, year: 2018};
    const timeTo = period !== undefined ? period.timeTo : {day: 1, month: 1, year: 2019};
    const days = getDiffDays(time, timeTo);
    dataMultiplier = dataMultiplier || 1;
    const controlPoints = [];
    controlPoints.push({index: 0, price: getRandomPrice() * dataMultiplier});
    for (let i = 0; i < days; i++) {
        if (i > 0 && i < days - 1 && Math.random() < 0.05) {
            controlPoints.push({index: i, price: getRandomPrice() * dataMultiplier});
        }
        res.push({time: time});
        time = nextBusinessDay(time);
    }
    controlPoints.push({index: res.length - 1, price: getRandomPrice() * dataMultiplier});
    return controlPoints;
}

function getDiffDays(dateFrom: BusinessDay, dateTo: BusinessDay): number {
    const df = convertBusinessDayToUTCTimestamp(dateFrom);
    const dt = convertBusinessDayToUTCTimestamp(dateTo);
    const diffTime = Math.abs(dt.getTime() - df.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function convertBusinessDayToUTCTimestamp(date: BusinessDay): Date {
    return new Date(Date.UTC(date.year, date.month - 1, date.day, 0, 0, 0, 0));
}

function nextBusinessDay(time: BusinessDay): BusinessDay {
    const d = convertBusinessDayToUTCTimestamp({year: time.year, month: time.month, day: time.day + 1});
    return {year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate()};
}

function getRandomPrice(): number {
    return 10 + Math.round(Math.random() * 10000) / 100;
}
