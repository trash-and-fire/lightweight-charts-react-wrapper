import {ISeriesApi} from 'lightweight-charts';
import {ForwardedRef, useContext, useImperativeHandle, useLayoutEffect, useRef} from 'react';
import {ChartContext} from './chart-context';
import {createLazyValue} from '../../internal/lazy-value';
import {series, SeriesActionParams, SeriesActionResult} from '../../internal/series';

export function createSeriesHook<T extends SeriesActionParams>(type: T['type']) {
    return (props: Omit<T, 'type'>, ref: ForwardedRef<ISeriesApi<T['type']>>) => {
        const chart = useContext(ChartContext)!;

        const context = useRef(createLazyValue(
            () => series(chart(), { ...props, type }),
            (value: SeriesActionResult<T> ) => value.destroy()
        ));

        useLayoutEffect(() => {
            context.current();

            return () => {
                context.current.reset();
            }
        }, []);

        useLayoutEffect(() => {
            context.current().update({ ...props, type: type } as T);
        }, [props]);

        useImperativeHandle(ref, () => context.current().subject(), []);

        return context;
    }
}
