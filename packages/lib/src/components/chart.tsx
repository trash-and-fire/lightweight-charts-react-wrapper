import {useLayoutEffect, useRef} from 'react';
import {createChart} from 'lightweight-charts';

export interface ChartProps {

}

export function Chart(props: ChartProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (ref.current !== null) {
            createChart(ref.current);
        }
    }, []);

    return <div ref={ref}/>
}
