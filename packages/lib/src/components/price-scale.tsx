import {
    ForwardedRef,
    forwardRef,
    memo,
    MutableRefObject,
    ReactNode,
    useContext,
    useImperativeHandle,
    useLayoutEffect,
    useRef
} from 'react';
import {DeepPartial, IPriceScaleApi, PriceScaleOptions} from 'lightweight-charts';
import {createLazyValue, LazyValue} from '../internal/lazy-value';
import {priceScale, PriceScaleActionResult} from '../internal/price-scale';
import {ChartContext} from './internal/chart-context';

export interface PriceScaleProps extends DeepPartial<PriceScaleOptions> {
    id: string;
    children?: ReactNode;
}

export const PriceScale = memo(forwardRef((props: PriceScaleProps, ref: ForwardedRef<IPriceScaleApi>) => {
    usePriceScaleAction(props, ref);

    return null;
}));

function usePriceScaleAction(props: PriceScaleProps, ref: ForwardedRef<IPriceScaleApi>): MutableRefObject<LazyValue<PriceScaleActionResult>> {
    const {children, ...rest} = props;

    const chart = useContext(ChartContext)!;

    const context = useRef(createLazyValue(
        () => priceScale(chart(), rest),
        (value: PriceScaleActionResult) => value.destroy()
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
