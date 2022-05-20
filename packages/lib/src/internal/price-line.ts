import {IPriceLine, PriceLineOptions} from 'lightweight-charts';
import {ActionResult} from './utils';
import {SeriesActionParams, SeriesActionResult} from './series';

export type PriceLineActionResult = ActionResult<PriceLineParams> & { subject(): IPriceLine };

export interface PriceLineParams extends PriceLineOptions {

}

export function priceLine<T extends SeriesActionParams>(
    target: SeriesActionResult<T>,
    params: PriceLineParams
): PriceLineActionResult {
    const subject = target.subject().createPriceLine(params);

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
            if (target.alive()) {
                target.subject().removePriceLine(subject);
            }
        }
    };
}
