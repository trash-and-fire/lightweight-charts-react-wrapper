import {IPriceScaleApi, DeepPartial, PriceScaleOptions} from 'lightweight-charts';
import {ActionResult, clone, merge} from './utils';
import {ChartActionResult} from './chart';

export type PriceScaleActionResult = ActionResult<PriceScaleParams> & { subject(): IPriceScaleApi }

export interface PriceScaleParams extends DeepPartial<PriceScaleOptions> {
    id: string;
}

export function priceScale(target: ChartActionResult, params: PriceScaleParams): PriceScaleActionResult {
    let {
        id,
        ...options
    } = params;

    let subject = target.subject().priceScale(id);
    const defaults = clone(subject.options());
    subject.applyOptions(options);

    return {
        subject(): IPriceScaleApi {
            return subject;
        },
        update(nextParams: PriceScaleParams): void {
            const {
                id: nextId,
                ...nextOptions
            } = nextParams;

            if (nextId !== id) {
                id = nextId;
                subject = target.subject().priceScale(id);
            }

            if (nextOptions !== options) {
                options = nextOptions;
                if (options) {
                    subject.applyOptions(merge(clone(defaults), options));
                }
            }
        },
        destroy(): void {

        }
    };
}
