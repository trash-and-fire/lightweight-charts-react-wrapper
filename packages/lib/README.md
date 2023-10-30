# lightweight-charts-react-wrapper
![bundle-size](https://badgen.net/bundlephobia/minzip/lightweight-charts-react-wrapper/)

React.js component-based wrapper for [Lightweight Charts](https://github.com/tradingview/lightweight-charts) to easily create interactive financial charts in React

## [Demo](https://trash-and-fire.github.io/lightweight-charts-react-wrapper/)

At the link above, you can find codesandbox examples for any use case, including legend, loading historical data, multiple series on the same chart, moving average, and more.
Feel free to ask questions and ask for more use cases in the issues tab.

## Installing

```bash
npm install lightweight-charts lightweight-charts-react-wrapper
```

## Usage

```tsx
import {Chart, LineSeries} from "lightweight-charts-react-wrapper";

const data = [
    {time: '2019-04-11', value: 80.01},
    {time: '2019-04-12', value: 96.63},
    {time: '2019-04-13', value: 76.64},
    {time: '2019-04-14', value: 81.89},
    {time: '2019-04-15', value: 74.43},
    {time: '2019-04-16', value: 80.01},
    {time: '2019-04-17', value: 96.63},
    {time: '2019-04-18', value: 76.64},
    {time: '2019-04-19', value: 81.89},
    {time: '2019-04-20', value: 74.43},
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
            <button onClick={() => ref.current?.timeScale().fitContent()}>Fit Content</button>
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
- `<CustomSeries>`

Series components should be nested inside a chart component. 

You can pass any series option as separate property. 
List of available options corresponding to each type of series can be found [here](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/SeriesOptionsMap)

Use the `ref` property to get reference to a [`ISeriesApi<SeriesType>`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi) instance.

#### Passing data
To pass a data to a series you can use the `data` property. Look [here](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/SeriesDataItemTypeMap) to find what shape of data you need for each series type.

By default `data` represents only the **initial** data. Any subsequent data update does not update series.
If you want to change this behavior please add `reactive={true}` to your series component. In this case series will apply a new data if it is not reference equal to previous array. 

#### Passing markers
To pass markers to a series you can use the `markers` property. Markers should be an array of `SeriesMarker<Time>`.

#### Custom series
You can pass an instance of a class that implements the [ICustomSeriesPaneView](https://tradingview.github.io/lightweight-charts/docs/next/api/interfaces/ICustomSeriesPaneView) interface as the value of the `view` property.
All additional properties other than `children`, `ref`, `reactive`, and `markers` will be passed to the [ICustomSeriesPaneView::update](https://tradingview.github.io/lightweight-charts/docs/next/api/interfaces/ICustomSeriesPaneView#update) method
```jsx
function BrushableSeries() {
    const [view] = useState(() => new BrushableAreaSeries())
    return <CustomSeries view={view} data={data} {...options}/>
}
```
Look the [demo page](https://trash-and-fire.github.io/lightweight-charts-react-wrapper/) for an example of custom series.

### Price line

To draw price line add `<PriceLine>` component inside any series.
```jsx
    <Chart width={600} height={300}>
        <LineSeries data={data}>
            <PriceLine
                title="minimum price"
                price={minimumPrice}
            />
            <PriceLine
                title="average price"
                price={avgPrice}
            />
            <PriceLine
                title="maximum price"
                price={maximumPrice}
            />
        </LineSeries>
    </Chart>
```

You can pass any options from [`PriceLineOptions`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/PriceLineOptions) as separate property. The `price` property is mandatory in dev mode.

Use the `ref` property to get reference to a [`IPriceLine`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/IPriceLine) instance.

### Custom Series Primitives
You can implement your own series primitive using the `<SeriesPrimitive>` component.
```jsx
export function VerticalLine() {
    const [view] = useState(() => new VertLine());
    
    return (
        <SeriesPrimitive
            view={view}
            time={Date.now()}
            showLabel={true}
            color={color}
            labelText={'Hello'}
        />
    );
}
```
The only mandatory property is `view` which should be an instance of the class that implements [ISeriesPrimitive](https://tradingview.github.io/lightweight-charts/docs/next/api#iseriesprimitive) and additional method `applyOptions(options: T): void`.
All additional properties other than `view` will be passed to the `applyOptions` method.

Any series primitive should be nested inside a `<[Type]Series>` component.

Look the [demo page](https://trash-and-fire.github.io/lightweight-charts-react-wrapper/) for an example of vertical lines.

### Time scale

`<TimeScale>` - the component is a binding to the current time scale of the current chart.
This component has to be nested inside a chart component and should not have duplicates. Each chart has only one time scale.

You can pass any option from [`TimeScaleOptions`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/TimeScaleOptions) as separate property.

Events:
- [`onVisibleTimeRangeChange`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ITimeScaleApi#subscribevisibletimerangechange) - `(timeRange: TimeRange | null) => void`
- [`onVisibleLogicalRangeChange`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ITimeScaleApi#subscribevisiblelogicalrangechange) - `(logicalRange: LogicalRange | null) => void`
- [`onSizeChange`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ITimeScaleApi#subscribesizechange) - `(width: number, height: number) => void`

Use the `ref` property to get reference to a [`ITimeScaleApi`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ITimeScaleApi) instance.

Note: don't use `ChartOptions['timeScale']` and `<TimeScale>` component at the same time. This can lead to uncontrolled overwriting of options.

### Price scale

`<PriceScale>` - the component is a bindings to a certain price scale.
This component has to be nested inside chart component and requires an `id` property. Two price scales with the same `id` within the same chart result in undefined behaviour. 

You can pass any option from [`PriceScaleOptions`](https://tradingview.github.io/lightweight-charts/docs/api/interfaces/PriceScaleOptions) as separate property.

Note: don't use `ChartOptions['leftPriceScale']'` or `ChartOptions['rightPriceScale']` or `ChartOptions['overlayPriceScale']` and `<PriceScale>` at the same time. This can lead to uncontrolled overwriting of options.

## Licence

MIT

Review the license [requirements](https://github.com/tradingview/lightweight-charts#license) for the required "attribution notice" in the Lightweight Chart Repository.
