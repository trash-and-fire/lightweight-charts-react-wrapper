import {
    ForwardedRef,
    forwardRef,
    memo,
    MutableRefObject,
    ReactNode, useContext,
    useImperativeHandle,
    useLayoutEffect,
    useRef
} from 'react';
import {IPriceLine, PriceLineOptions} from 'lightweight-charts';
import {createLazyValue, LazyValue} from '../internal/lazy-value';
import {priceLine, PriceLineActionResult} from '../internal/price-line';
import {SeriesContext} from './internal/series-context';

export interface PriceLineProps extends PriceLineOptions {
    children?: ReactNode;
}

export const PriceLine = memo(forwardRef(function PriceLine(props: PriceLineProps, ref: ForwardedRef<IPriceLine>) {
    usePriceLineAction(props, ref);

    return null;
}));

function usePriceLineAction(props: PriceLineProps, ref: ForwardedRef<IPriceLine>): MutableRefObject<LazyValue<PriceLineActionResult>> {
    const {children, ...rest} = props;

    const series = useContext(SeriesContext)!;

    const context = useRef(createLazyValue(
        () => priceLine(series(), rest),
        (value: PriceLineActionResult) => value.destroy()
    ));

    useLayoutEffect(() => {
        context.current();

        return () => {
            context.current.reset();
        }
    }, []);

    useLayoutEffect(() => {
        context.current().update(rest);
    }, [rest]);

    useImperativeHandle(ref, () => context.current().subject(), []);

    return context;
}
