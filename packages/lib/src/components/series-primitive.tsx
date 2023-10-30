import {memo, useContext, useLayoutEffect, useRef} from 'react';
import {IReactiveSeriesPrimitive, seriesPrimitive, SeriesPrimitiveActionResult} from '../internal/series-primitive.js';
import {SeriesContext} from './internal/series-context.js';
import {createLazyValue} from '../internal/lazy-value.js';

export type {IReactiveSeriesPrimitive};

export type SeriesPrimitiveProps<T> = T & {
    view: IReactiveSeriesPrimitive<T>;
}

export const SeriesPrimitive = memo(
    function SeriesPrimitive<T>(props: SeriesPrimitiveProps<T>){
        useSeriesPrimitive(props);
        return null;
    }
) as {
    <T,>(props: SeriesPrimitiveProps<T>): JSX.Element | null;
};

function useSeriesPrimitive<T>(props: SeriesPrimitiveProps<T>) {
    const series = useContext(SeriesContext)!;

    const context = useRef(createLazyValue(
        () => seriesPrimitive(series(), props),
        (value: SeriesPrimitiveActionResult<any>) => value.destroy()
    ));

    useLayoutEffect(() => {
        context.current();

        return () => {
            context.current.reset();
        }
    }, []);

    useLayoutEffect(() => {
        context.current().update(props);
    }, [props]);


    return context;
}

