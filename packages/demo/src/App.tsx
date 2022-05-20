import React, {useCallback, useState} from 'react';
import {IChartApi} from 'lightweight-charts';
import {Chart, AreaSeries} from 'lightweight-charts-react-wrapper';

import './App.css';

function App() {
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(300);
    const [color, setColor] = useState<string>('')
    return (
        <div className="App">
            <header className="App-header">
                <label>
                    Width: <input type="range" min={300} max={900} value={width} onChange={(e) => setWidth(e.target.valueAsNumber)}/>
                </label>
                <br/>
                <label>
                    Height: <input type="range" min={150} max={450} value={height} onChange={(e) => setHeight(e.target.valueAsNumber)}/>
                </label>
                <br/>
                <label>
                    Color: <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
                </label>
                <br/>
                <Chart width={width} height={height} ref={useCallback((ref: IChartApi | null) => console.log(ref), [])}>
                    <AreaSeries
                        lineColor={color ? color : undefined}
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
                    />
                </Chart>
            </header>
        </div>
    );
}

export default App;
