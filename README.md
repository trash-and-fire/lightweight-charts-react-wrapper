# lightweight-charts-react-wrapper

This package is a React wrapper for [lightweight-charts](https://github.com/tradingview/lightweight-charts)

## [Demo](https://trash-and-fire.github.io/lightweight-charts-react-wrapper/)

Here are some official examples rewritten on React.

## Installing

```bash
npm install lightweight-charts lightweight-charts-react-wrapper
```

## Usage

```tsx
import { Chart, LineSeries } from "lightweight-charts-react-wrapper";
const data = [
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 76.64 },
    { time: '2019-04-14', value: 81.89 },
    { time: '2019-04-15', value: 74.43 },
    { time: '2019-04-16', value: 80.01 },
    { time: '2019-04-17', value: 96.63 },
    { time: '2019-04-18', value: 76.64 },
    { time: '2019-04-19', value: 81.89 },
    { time: '2019-04-20', value: 74.43 },
];

export function App() {
    return (
        <Chart width={800} height={600}>
            <LineSeries data={data}/>
        </Chart>
    );
}
```

## Getting reference to lightweight-chart objects

You can use the `ref` property to get a reference to a lightweight-chart api-instance from any component.
```tsx
function App() {
    const ref = useRef(null);
    return (
        <>
            <Chart width={400} height={300} ref={ref}/>
            <button on:click={() => ref.current?.timeScale().fitContent()}>Fit Content</button>
        </>
    )
}
```

## Components

### Chart

`<Chart>` - main chart container and wrapping dom element.
You can pass any option from [`ChartOptions`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ChartOptions) as separate property.

Events:
- [`onCrosshairMove`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/IChartApi#subscribeclick): `(params: MouseEventParams) => void`
- [`onClick`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/IChartApi#subscribecrosshairmove): `(params: MouseEventParams) => void`

Use the `ref` property to get a reference to a [`IChartApi`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/IChartApi) instance

### Series

Following types of series are supported:
- `<AreaSeries>`
- `<BarSeries>`
- `<BaselineSeries>`
- `<CandlestickSeries>`
- `<HistogramSeries>`
- `<LineSeries>`

Series components should be nested inside a chart component. 

You can pass any series option as separate property. 
List of available options corresponding to each type of series can be found [here](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/SeriesOptionsMap)

Use the `ref` property to get reference to a [`ISeriesApi<SeriesType>`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi) instance.

#### Passing data
To pass a data to a series you can use the `data` property. Look [here](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/SeriesDataItemTypeMap) to find what shape of data you need for each series type.

By default `data` represents only the **initial** data. Any subsequent data update does not update series.
If you want to change this behavior please add `reactive={true}` to your series component. In this case series will apply a new data if it is not reference equal to previous array. 

### Other components

- `<PriceLine>` - price line (`IPriceLine`). It has to be nested inside `<[Type]Series>` component.
- `<TimeScale>` - time-scale (`ITimeScaleApi`). It has to be nested inside `<Chart>` component.
- `<PriceScale>` - price-scale (`IPriceScaleApi`). It has to be nested inside `<Chart>` component.
