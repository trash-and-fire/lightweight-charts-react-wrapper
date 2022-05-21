import React, {useCallback, useRef, useState} from 'react';
import {BusinessDay, CandlestickData, ISeriesApi, ITimeScaleApi} from 'lightweight-charts';
import {Chart, CandlestickSeries, TimeScale} from 'lightweight-charts-react-wrapper';

export default function InfiniteHistory() {
    const timeScale = useRef<ITimeScaleApi>(null)
    const candleSeries = useRef<ISeriesApi<'Candlestick'>>(null);
    const timer = useRef<number | null>(null);

    const [data, setData] = useState(() => generateBarsData({
        timeFrom: {day: 1, month: 1, year: 2018},
        timeTo: {day: 1, month: 1, year: 2019},
    }));

    const handleVisibleLogicalRangeChange = useCallback(() => {
        if (!timeScale.current || !candleSeries.current) {
            return;
        }
        if (timer.current !== null) {
            return;
        }
        timer.current = window.setTimeout(() => {
            if (!timeScale.current || !candleSeries.current) {
                return;
            }

            const logicalRange = timeScale.current.getVisibleLogicalRange();
            if (logicalRange !== null) {
                const barsInfo = candleSeries.current.barsInLogicalRange(logicalRange);
                if (barsInfo !== null && barsInfo.barsBefore < 10) {
                    setData((current: CandlestickData[]) => {
                        const firstTime = getBusinessDayBeforeCurrentAt(current[0].time as BusinessDay, 1);
                        const lastTime = getBusinessDayBeforeCurrentAt(firstTime, Math.max(100, -barsInfo.barsBefore + 100));
                        const newPeriod = {
                            timeFrom: lastTime,
                            timeTo: firstTime,
                        };
                        return [...generateBarsData(newPeriod), ...current]
                    });
                }
            }
            timer.current = null;
        }, 500);
    }, []);

    return (
        <>
            <h1>Infinite History</h1>
            <div className="container">
                <Chart width={600} height={300}>
                    <TimeScale
                        ref={timeScale}
                        onVisibleLogicalRangeChange={handleVisibleLogicalRangeChange}
                    />
                    <CandlestickSeries
                        ref={candleSeries}
                        data={data}
                        reactive={true}
                    />
                </Chart>
            </div>
        </>
    )
}

function getBusinessDayBeforeCurrentAt(date: BusinessDay, daysDelta: number): BusinessDay {
    const dateWithDelta = new Date(Date.UTC(date.year, date.month - 1, date.day - daysDelta, 0, 0, 0, 0));
    return {year: dateWithDelta.getFullYear(), month: dateWithDelta.getMonth() + 1, day: dateWithDelta.getDate()};
}

function generateBarsData(period: { timeFrom: BusinessDay, timeTo: BusinessDay}): CandlestickData[] {
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
