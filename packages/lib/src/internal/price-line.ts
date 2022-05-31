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
    // TODO: wait 4.0
    const subject = (target.subject().createPriceLine as () => IPriceLine)();
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
