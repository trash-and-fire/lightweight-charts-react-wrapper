import React, {useState} from 'react';
import {CanvasRenderingTarget2D} from 'fancy-canvas';
import {
    ISeriesPrimitivePaneRenderer,
    ISeriesPrimitiveAxisView,
    ISeriesPrimitivePaneView,
    Coordinate,
    Time,
    IChartApi,
    ISeriesApi,
    SeriesType,
    SeriesAttachedParameter,
} from 'lightweight-charts';
import {Chart, LineSeries, SeriesPrimitive, IReactiveSeriesPrimitive} from 'lightweight-charts-react-wrapper';

import {Switcher} from './components/switcher';

export default function VerticalLines() {
    const [color, setColor] = useState(AVAILABLE_COLORS[0]);
    const [first] = useState(() => new VertLine(data[data.length - 50].time));
    const [second] = useState(() => new VertLine(data[data.length - 25].time));

    return (
        <>
            <h1>Vertical Lines</h1>
            <Chart width={600} height={300}>
                <LineSeries data={data}>
                    <SeriesPrimitive
                        view={first}
                        showLabel={true}
                        color={color}
                        labelText={'Hello'}
                    />
                    <SeriesPrimitive
                        view={second}
                        showLabel={false}
                        color={color}
                        width={2}
                    />
                </LineSeries>
            </Chart>
            <Switcher list={AVAILABLE_COLORS} value={color} onChange={(e) => setColor(e.currentTarget.value)}/>
        </>
    );
}

const AVAILABLE_COLORS = ['red', 'green', 'blue'];

const data = [
    {time: {year: 2018, month: 1, day: 1}, value: 27.58405298746434},
    {time: {year: 2018, month: 1, day: 2}, value: 31.74088841431117},
    {time: {year: 2018, month: 1, day: 3}, value: 35.892978753808926},
    {time: {year: 2018, month: 1, day: 4}, value: 39.63642029045179},
    {time: {year: 2018, month: 1, day: 5}, value: 40.79167357702531},
    {time: {year: 2018, month: 1, day: 6}, value: 47.691740220947764},
    {time: {year: 2018, month: 1, day: 7}, value: 49.377161099825415},
    {time: {year: 2018, month: 1, day: 8}, value: 52.47379203136591},
    {time: {year: 2018, month: 1, day: 9}, value: 50.40209743179448},
    {time: {year: 2018, month: 1, day: 10}, value: 61.47316837848548},
    {time: {year: 2018, month: 1, day: 11}, value: 58.22831552141069},
    {time: {year: 2018, month: 1, day: 12}, value: 59.36868132891698},
    {time: {year: 2018, month: 1, day: 13}, value: 62.10845687168416},
    {time: {year: 2018, month: 1, day: 14}, value: 51.259701958506724},
    {time: {year: 2018, month: 1, day: 15}, value: 56.247578870411644},
    {time: {year: 2018, month: 1, day: 16}, value: 55.483307642385164},
    {time: {year: 2018, month: 1, day: 17}, value: 55.85295564734231},
    {time: {year: 2018, month: 1, day: 18}, value: 48.3138216778343},
    {time: {year: 2018, month: 1, day: 19}, value: 53.071901176203866},
    {time: {year: 2018, month: 1, day: 20}, value: 50.873781097281885},
    {time: {year: 2018, month: 1, day: 21}, value: 49.7840315054249},
    {time: {year: 2018, month: 1, day: 22}, value: 52.34956807336156},
    {time: {year: 2018, month: 1, day: 23}, value: 53.79112543285674},
    {time: {year: 2018, month: 1, day: 24}, value: 53.984887985424805},
    {time: {year: 2018, month: 1, day: 25}, value: 58.56902893497121},
    {time: {year: 2018, month: 1, day: 26}, value: 54.76191372282466},
    {time: {year: 2018, month: 1, day: 27}, value: 63.38042554684846},
    {time: {year: 2018, month: 1, day: 28}, value: 55.452618512103065},
    {time: {year: 2018, month: 1, day: 29}, value: 65.60820758942769},
    {time: {year: 2018, month: 1, day: 30}, value: 56.82795136583009},
    {time: {year: 2018, month: 1, day: 31}, value: 70.3148022984224},
    {time: {year: 2018, month: 2, day: 1}, value: 65.86230944167264},
    {time: {year: 2018, month: 2, day: 2}, value: 72.05467846676524},
    {time: {year: 2018, month: 2, day: 3}, value: 72.99238887850564},
    {time: {year: 2018, month: 2, day: 4}, value: 67.03373730222785},
    {time: {year: 2018, month: 2, day: 5}, value: 69.97670934736414},
    {time: {year: 2018, month: 2, day: 6}, value: 73.08910595492105},
    {time: {year: 2018, month: 2, day: 7}, value: 81.43976528732057},
    {time: {year: 2018, month: 2, day: 8}, value: 73.62230936920984},
    {time: {year: 2018, month: 2, day: 9}, value: 82.15522801870938},
    {time: {year: 2018, month: 2, day: 10}, value: 77.99384538574678},
    {time: {year: 2018, month: 2, day: 11}, value: 85.62489628897463},
    {time: {year: 2018, month: 2, day: 12}, value: 86.93090666568217},
    {time: {year: 2018, month: 2, day: 13}, value: 75.99689788850394},
    {time: {year: 2018, month: 2, day: 14}, value: 88.46418548355727},
    {time: {year: 2018, month: 2, day: 15}, value: 86.20760396539865},
    {time: {year: 2018, month: 2, day: 16}, value: 81.88757639758437},
    {time: {year: 2018, month: 2, day: 17}, value: 79.58151786389108},
    {time: {year: 2018, month: 2, day: 18}, value: 80.96845249711073},
    {time: {year: 2018, month: 2, day: 19}, value: 73.54901807055447},
    {time: {year: 2018, month: 2, day: 20}, value: 75.65626118347262},
    {time: {year: 2018, month: 2, day: 21}, value: 78.41307347680399},
    {time: {year: 2018, month: 2, day: 22}, value: 74.60352602043042},
    {time: {year: 2018, month: 2, day: 23}, value: 72.28241570381236},
    {time: {year: 2018, month: 2, day: 24}, value: 72.24427397962566},
    {time: {year: 2018, month: 2, day: 25}, value: 64.80996965592134},
    {time: {year: 2018, month: 2, day: 26}, value: 67.37511361319652},
    {time: {year: 2018, month: 2, day: 27}, value: 65.5449131917524},
    {time: {year: 2018, month: 2, day: 28}, value: 65.4802711362433},
    {time: {year: 2018, month: 3, day: 1}, value: 62.207767815581086},
    {time: {year: 2018, month: 3, day: 2}, value: 59.78884720470812},
    {time: {year: 2018, month: 3, day: 3}, value: 67.51846586137782},
    {time: {year: 2018, month: 3, day: 4}, value: 68.752834400291},
    {time: {year: 2018, month: 3, day: 5}, value: 66.63416073573323},
    {time: {year: 2018, month: 3, day: 6}, value: 65.58601621691751},
    {time: {year: 2018, month: 3, day: 7}, value: 57.33498792621458},
    {time: {year: 2018, month: 3, day: 8}, value: 56.93436946311955},
    {time: {year: 2018, month: 3, day: 9}, value: 58.31144672902557},
    {time: {year: 2018, month: 3, day: 10}, value: 59.96407207657268},
    {time: {year: 2018, month: 3, day: 11}, value: 55.7861486424976},
    {time: {year: 2018, month: 3, day: 12}, value: 52.91803500214551},
    {time: {year: 2018, month: 3, day: 13}, value: 54.491591573038306},
    {time: {year: 2018, month: 3, day: 14}, value: 51.924409342593385},
    {time: {year: 2018, month: 3, day: 15}, value: 41.90263950118436},
    {time: {year: 2018, month: 3, day: 16}, value: 40.514436076485694},
    {time: {year: 2018, month: 3, day: 17}, value: 41.065887666854486},
    {time: {year: 2018, month: 3, day: 18}, value: 40.44445534031683},
    {time: {year: 2018, month: 3, day: 19}, value: 42.13922977216152},
    {time: {year: 2018, month: 3, day: 20}, value: 42.317162952084495},
    {time: {year: 2018, month: 3, day: 21}, value: 39.02881877743751},
    {time: {year: 2018, month: 3, day: 22}, value: 39.81917993955704},
    {time: {year: 2018, month: 3, day: 23}, value: 36.753197056053374},
    {time: {year: 2018, month: 3, day: 24}, value: 37.02203306330588},
    {time: {year: 2018, month: 3, day: 25}, value: 36.36014042161194},
    {time: {year: 2018, month: 3, day: 26}, value: 33.56275879100148},
    {time: {year: 2018, month: 3, day: 27}, value: 34.39112540787079},
    {time: {year: 2018, month: 3, day: 28}, value: 30.57170225544929},
    {time: {year: 2018, month: 3, day: 29}, value: 33.56826040802756},
    {time: {year: 2018, month: 3, day: 30}, value: 32.89895543218274},
    {time: {year: 2018, month: 3, day: 31}, value: 31.015658561825738},
    {time: {year: 2018, month: 4, day: 1}, value: 33.189179815787455},
    {time: {year: 2018, month: 4, day: 2}, value: 29.530756945582162},
    {time: {year: 2018, month: 4, day: 3}, value: 29.250978140719916},
    {time: {year: 2018, month: 4, day: 4}, value: 27.89635178919736},
    {time: {year: 2018, month: 4, day: 5}, value: 26.995427160624686},
    {time: {year: 2018, month: 4, day: 6}, value: 25.89631885043023},
    {time: {year: 2018, month: 4, day: 7}, value: 28.71812492475548},
];

class VertLinePaneRenderer implements ISeriesPrimitivePaneRenderer {
    private _source: VertLine;
    private _x: Coordinate | null = null;

    constructor(source: VertLine, x: Coordinate | null) {
        this._source = source;
        this._x = x;
    }
    draw(target: CanvasRenderingTarget2D) {
        target.useBitmapCoordinateSpace(scope => {
            if (this._x === null) return;
            const ctx = scope.context;
            const position = positionsLine(
                this._x,
                scope.horizontalPixelRatio,
                this._source.options().width
            );
            ctx.fillStyle = this._source.options().color;
            ctx.fillRect(
                position.position,
                0,
                position.length,
                scope.bitmapSize.height
            );
        });
    }
}
class VertLinePaneView implements ISeriesPrimitivePaneView {
    _source: VertLine;
    _x: Coordinate | null = null;

    constructor(source: VertLine) {
        this._source = source;
    }
    update() {
        const chart = this._source.chart();
        if (chart === null) {
            return;
        }
        const timeScale = chart.timeScale();
        this._x = timeScale.timeToCoordinate(this._source._time);
    }
    renderer() {
        return new VertLinePaneRenderer(this._source, this._x);
    }
}

class VertLineTimeAxisView implements ISeriesPrimitiveAxisView {
    _source: VertLine;
    _x: Coordinate | null = null;

    constructor(source: VertLine) {
        this._source = source;
    }
    update() {
        const chart = this._source.chart();
        if (chart === null) {
            return;
        }
        const timeScale = chart.timeScale();
        this._x = timeScale.timeToCoordinate(this._source._time);
    }
    visible() {
        return this._source.options().showLabel;
    }
    tickVisible() {
        return this._source.options().showLabel;
    }
    coordinate() {
        return this._x ?? 0;
    }
    text() {
        return this._source.options().labelText;
    }
    textColor() {
        return this._source.options().labelTextColor;
    }
    backColor() {
        return this._source.options().labelBackgroundColor;
    }
}

interface VertLineOptions {
    color: string;
    labelText: string;
    width: number;
    labelBackgroundColor: string;
    labelTextColor: string;
    showLabel: boolean;
}

class VertLine implements IReactiveSeriesPrimitive<Partial<VertLineOptions>> {
    private static _defaultOptions: VertLineOptions = {
        color: 'green',
        labelText: '',
        width: 3,
        labelBackgroundColor: 'green',
        labelTextColor: 'white',
        showLabel: false,
    }
    private _chart: IChartApi | null = null;
    private _series: ISeriesApi<SeriesType> | null = null;
    private _requestUpdate = () => {};

    private _options: VertLineOptions = VertLine._defaultOptions;

    _time: Time;
    _paneViews: VertLinePaneView[];
    _timeAxisViews: VertLineTimeAxisView[];

    constructor(time: Time) {
        this._time = time;
        this._paneViews = [new VertLinePaneView(this)];
        this._timeAxisViews = [new VertLineTimeAxisView(this)];
    }

    applyOptions(options: Partial<VertLineOptions>) {
        this._options = { ...this._options, ...options };
        this._requestUpdate();
    }

    attached(context: SeriesAttachedParameter) {
        this._chart = context.chart;
        this._series = context.series;

        this._requestUpdate = context.requestUpdate;
    }

    detached() {
        this._series = null;
        this._chart = null;

        this._requestUpdate = () => {};
    }

    updateAllViews() {
        this._paneViews.forEach(pw => pw.update());
        this._timeAxisViews.forEach(tw => tw.update());
    }

    timeAxisViews() {
        return this._timeAxisViews;
    }

    paneViews() {
        return this._paneViews;
    }

    chart() {
        return this._chart;
    }

    series() {
        return this._series;
    }

    options() {
        return this._options;
    }
}

interface BitmapPositionLength {
    /** coordinate for use with a bitmap rendering scope */
    position: number;
    /** length for use with a bitmap rendering scope */
    length: number;
}

function centreOffset(lineBitmapWidth: number): number {
    return Math.floor(lineBitmapWidth * 0.5);
}

function positionsLine(
    positionMedia: number,
    pixelRatio: number,
    desiredWidthMedia: number = 1,
    widthIsBitmap?: boolean
): BitmapPositionLength {
    const scaledPosition = Math.round(pixelRatio * positionMedia);
    const lineBitmapWidth = widthIsBitmap
        ? desiredWidthMedia
        : Math.round(desiredWidthMedia * pixelRatio);
    const offset = centreOffset(lineBitmapWidth);
    const position = scaledPosition - offset;
    return { position, length: lineBitmapWidth };
}
