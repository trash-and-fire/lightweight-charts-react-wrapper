import type {IPriceLine, ISeriesApi, SeriesType, PriceLineOptions} from 'lightweight-charts';
import type {ActionResult} from './utils';

export type PriceLineActionResult = ActionResult<PriceLineParams> & { subject(): IPriceLine };

export interface PriceLineParams extends PriceLineOptions {

}

export function priceLine<T extends SeriesType>(
    target: ISeriesApi<T>,
    params: PriceLineParams
): PriceLineActionResult {
    const subject = target.createPriceLine(params);

    return {
        subject(): IPriceLine {
            return subject;
        },
        update(nextParams: PriceLineParams): void {
            if (nextParams) {
                subject.applyOptions(nextParams);
            }
        },
        destroy(): void {
            target.removePriceLine(subject);
        }
    };
}
