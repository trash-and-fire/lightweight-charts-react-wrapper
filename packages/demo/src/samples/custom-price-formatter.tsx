import React, {useState} from 'react';
import {CrosshairMode} from 'lightweight-charts';
import {Chart, AreaSeries} from 'lightweight-charts-react-wrapper';
import {Switcher} from './components/switcher';

export default function CustomPriceFormatter() {
    const [selected, setSelected] = useState(AVAILABLE_FORMATTERS[0])

    return (
        <>
            <h1>Custom Price Formatter</h1>
            <Chart {...options} localization={{priceFormatter: FORMATTERS[selected]}}>
                <AreaSeries
                    data={data}
                    topColor="rgba(21, 101, 192, 0.5)"
                    bottomColor="rgba(21, 101, 192, 0.5)"
                    lineColor="rgba(255, 255, 255, 0.8)"
                    lineWidth={2}
                />
            </Chart>
            <Switcher
                list={AVAILABLE_FORMATTERS}
                value={selected}
                onChange={(e) => setSelected(e.target.value as keyof typeof FORMATTERS)}
            />
        </>
    )
}

const FORMATTERS = {
    Dollar: (price: number) => '$' + price.toFixed(2),
    Pound: (price: number) => '\u00A3' + price.toFixed(2),
};
const AVAILABLE_FORMATTERS = Object.keys(FORMATTERS) as unknown as (keyof typeof FORMATTERS)[];

const options = {
    width: 600,
    height: 300,
    crosshair: {
        mode: CrosshairMode.Normal,
    },
    layout: {
        backgroundColor: '#000',
        textColor: 'rgba(255, 255, 255, 0.8)',
    },
    grid: {
        vertLines: {
            color: 'rgba(255, 255, 255, 0.2)',
        },
        horzLines: {
            color: 'rgba(255, 255, 255, 0.2)',
        },
    },
    rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.8)',
    },
}

const data = [
    {time: '2018-10-19', value: 72.35},
    {time: '2018-10-22', value: 72.57},
    {time: '2018-10-23', value: 72.10},
    {time: '2018-10-24', value: 70.54},
    {time: '2018-10-25', value: 69.96},
    {time: '2018-10-26', value: 70.40},
    {time: '2018-10-29', value: 71.45},
    {time: '2018-10-30', value: 72.87},
    {time: '2018-10-31', value: 73.61},
    {time: '2018-11-01', value: 73.12},
    {time: '2018-11-02', value: 72.27},
    {time: '2018-11-05', value: 73.12},
    {time: '2018-11-06', value: 73.31},
    {time: '2018-11-07', value: 75.08},
    {time: '2018-11-08', value: 75.48},
    {time: '2018-11-09', value: 74.86},
    {time: '2018-11-12', value: 74.69},
    {time: '2018-11-13', value: 74.61},
    {time: '2018-11-14', value: 74.09},
    {time: '2018-11-15', value: 74.84},
    {time: '2018-11-16', value: 76.06},
    {time: '2018-11-19', value: 76.35},
    {time: '2018-11-20', value: 74.78},
    {time: '2018-11-21', value: 74.79},
    {time: '2018-11-23', value: 74.67},
    {time: '2018-11-26', value: 75.44},
    {time: '2018-11-27', value: 76.34},
    {time: '2018-11-28', value: 77.23},
    {time: '2018-11-29', value: 77.91},
    {time: '2018-11-30', value: 79.34},
    {time: '2018-12-03', value: 79.22},
    {time: '2018-12-04', value: 78.21},
    {time: '2018-12-06', value: 78.37},
    {time: '2018-12-07', value: 76.72},
    {time: '2018-12-10', value: 77.42},
    {time: '2018-12-11', value: 77.11},
    {time: '2018-12-12', value: 78.01},
    {time: '2018-12-13', value: 79.01},
    {time: '2018-12-14', value: 76.48},
    {time: '2018-12-17', value: 75.23},
    {time: '2018-12-18', value: 74.33},
    {time: '2018-12-19', value: 73.77},
    {time: '2018-12-20', value: 73.49},
    {time: '2018-12-21', value: 72.90},
    {time: '2018-12-24', value: 71.15},
    {time: '2018-12-26', value: 74.00},
    {time: '2018-12-27', value: 75.38},
    {time: '2018-12-28', value: 75.37},
    {time: '2018-12-31', value: 76.41},
    {time: '2019-01-02', value: 75.59},
    {time: '2019-01-03', value: 74.04},
    {time: '2019-01-04', value: 76.27},
    {time: '2019-01-07', value: 75.43},
    {time: '2019-01-08', value: 75.99},
    {time: '2019-01-09', value: 75.41},
    {time: '2019-01-10', value: 74.48},
    {time: '2019-01-11', value: 74.90},
    {time: '2019-01-14', value: 73.37},
    {time: '2019-01-15', value: 74.50},
    {time: '2019-01-16', value: 74.61},
    {time: '2019-01-17', value: 75.60},
    {time: '2019-01-18', value: 75.87},
    {time: '2019-01-22', value: 75.83},
    {time: '2019-01-23', value: 75.44},
    {time: '2019-01-24', value: 73.17},
    {time: '2019-01-25', value: 72.95},
    {time: '2019-01-28', value: 72.92},
    {time: '2019-01-29', value: 73.23},
    {time: '2019-01-30', value: 73.37},
    {time: '2019-01-31', value: 74.43},
    {time: '2019-02-01', value: 76.45},
    {time: '2019-02-04', value: 76.87},
    {time: '2019-02-05', value: 77.15},
    {time: '2019-02-06', value: 77.39},
    {time: '2019-02-07', value: 76.82},
    {time: '2019-02-08', value: 77.52},
    {time: '2019-02-11', value: 76.71},
    {time: '2019-02-12', value: 78.52},
    {time: '2019-02-13', value: 79.02},
    {time: '2019-02-14', value: 78.94},
    {time: '2019-02-15', value: 79.81},
    {time: '2019-02-19', value: 79.24},
    {time: '2019-02-20', value: 79.43},
    {time: '2019-02-21', value: 79.83},
    {time: '2019-02-22', value: 80.77},
    {time: '2019-02-25', value: 80.38},
    {time: '2019-02-26', value: 80.74},
    {time: '2019-02-27', value: 80.62},
    {time: '2019-02-28', value: 81.29},
    {time: '2019-03-01', value: 81.65},
    {time: '2019-03-04', value: 81.37},
    {time: '2019-03-05', value: 81.70},
    {time: '2019-03-06', value: 80.76},
    {time: '2019-03-07', value: 80.45},
    {time: '2019-03-08', value: 79.80},
    {time: '2019-03-11', value: 80.87},
    {time: '2019-03-12', value: 81.23},
    {time: '2019-03-13', value: 81.60},
    {time: '2019-03-14', value: 81.49},
    {time: '2019-03-15', value: 81.57},
    {time: '2019-03-18', value: 81.35},
    {time: '2019-03-19', value: 81.91},
    {time: '2019-03-20', value: 82.08},
    {time: '2019-03-21', value: 82.95},
    {time: '2019-03-22', value: 82.29},
    {time: '2019-03-25', value: 82.35},
    {time: '2019-03-26', value: 82.92},
    {time: '2019-03-27', value: 82.29},
    {time: '2019-03-28', value: 82.63},
    {time: '2019-03-29', value: 83.17},
    {time: '2019-04-01', value: 83.30},
    {time: '2019-04-02', value: 83.21},
    {time: '2019-04-03', value: 83.18},
    {time: '2019-04-04', value: 81.85},
    {time: '2019-04-05', value: 81.15},
    {time: '2019-04-08', value: 80.95},
    {time: '2019-04-09', value: 80.80},
    {time: '2019-04-10', value: 80.82},
    {time: '2019-04-11', value: 79.84},
    {time: '2019-04-12', value: 79.43},
    {time: '2019-04-15', value: 78.53},
    {time: '2019-04-16', value: 77.56},
    {time: '2019-04-17', value: 73.92},
    {time: '2019-04-18', value: 73.19},
    {time: '2019-04-22', value: 73.46},
    {time: '2019-04-23', value: 74.60},
    {time: '2019-04-24', value: 74.73},
    {time: '2019-04-25', value: 76.34},
    {time: '2019-04-26', value: 76.63},
    {time: '2019-04-29', value: 76.78},
    {time: '2019-04-30', value: 78.71},
    {time: '2019-05-01', value: 78.72},
    {time: '2019-05-02', value: 79.52},
    {time: '2019-05-03', value: 80.00},
    {time: '2019-05-06', value: 79.48},
    {time: '2019-05-07', value: 77.90},
    {time: '2019-05-08', value: 78.18},
    {time: '2019-05-09', value: 78.33},
    {time: '2019-05-10', value: 78.19},
    {time: '2019-05-13', value: 77.17},
    {time: '2019-05-14', value: 77.42},
    {time: '2019-05-15', value: 77.55},
    {time: '2019-05-16', value: 79.13},
    {time: '2019-05-17', value: 78.72},
    {time: '2019-05-20', value: 78.88},
    {time: '2019-05-21', value: 79.50},
    {time: '2019-05-22', value: 80.98},
    {time: '2019-05-23', value: 81.02},
    {time: '2019-05-24', value: 81.17},
    {time: '2019-05-28', value: 81.10},
];
