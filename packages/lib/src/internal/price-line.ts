import {DeepPartial, IPriceLine, PriceLineOptions} from 'lightweight-charts';
import {ActionResult, clone, merge} from './utils';
import {SeriesActionParams, SeriesActionResult} from './series';

export type PriceLineActionResult = ActionResult<PriceLineParams> & { subject(): IPriceLine };

export interface PriceLineParams extends DeepPartial<PriceLineOptions> {

}

export function priceLine<T extends SeriesActionParams>(
    target: SeriesActionResult<T>,
    params: PriceLineParams
): PriceLineActionResult {
    // TODO: this works well but throw in dev mode if price is not provided
    const subject = (target.subject().createPriceLine as (options: Partial<PriceLineOptions>) => IPriceLine)({ price: 0 });
    const defaults = clone(subject.options());
    subject.applyOptions(params);
    return {
        subject(): IPriceLine {
            return subject;
        },
        update(nextParams: PriceLineParams): void {
            if (nextParams) {
                subject.applyOptions(merge(clone(defaults), nextParams));
            }
        },
        destroy(): void {
            if (target.alive()) {
                target.subject().removePriceLine(subject);
            }
        }
    };
}
