import {ISeriesPrimitive} from 'lightweight-charts';
import {ActionResult} from './utils.js';
import {SeriesActionParams, SeriesActionResult} from './series';

export interface IReactiveSeriesPrimitive<O> extends ISeriesPrimitive {
    applyOptions(options: Omit<O, 'view'>): void;
}

export type SeriesPrimitiveParams<O> = O & {
    view: IReactiveSeriesPrimitive<O>;
}

export type SeriesPrimitiveActionResult<O> = ActionResult<SeriesPrimitiveParams<O>>;

export function seriesPrimitive<O>(
    target: SeriesActionResult<SeriesActionParams>,
    params: SeriesPrimitiveParams<O>
): SeriesPrimitiveActionResult<O> {
    let { view, ...options } = params;

    view.applyOptions(options);
    target.subject().attachPrimitive(view);

    return {
        update(nextParams: SeriesPrimitiveParams<O>): void {
            const { view: nextView, ...nextOptions } = nextParams;
            if (nextView !== view) {
                target.subject().detachPrimitive(view);
                view = nextView;
                options = nextOptions;
                view.applyOptions(options);
                target.subject().attachPrimitive(view);
            } else {
                options = nextOptions;
                view.applyOptions(options);
            }
        },
        destroy(): void {
            target.subject().detachPrimitive(view);
        }
    };
}
