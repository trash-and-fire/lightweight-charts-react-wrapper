import type {IChartApi, IPriceScaleApi, DeepPartial, PriceScaleOptions} from 'lightweight-charts';
import type {ActionResult} from './utils';

export type PriceScaleActionResult = ActionResult<PriceScaleParams> & { subject(): IPriceScaleApi }

export interface PriceScaleParams extends DeepPartial<PriceScaleOptions> {
    id: string;
}

export function priceScale(target: IChartApi, params: PriceScaleParams): PriceScaleActionResult {
    let {
        id,
        ...options
    } = params;

    let subject = target.priceScale(id);

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
                subject = target.priceScale(id);
            }

            if (nextOptions !== options) {
                options = nextOptions;
                if (options) {
                    subject.applyOptions(options);
                }
            }
        },
        destroy(): void {

        }
    };
}
