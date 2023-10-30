import {
    ChartOptions,
    DeepPartial,
    IChartApi,
    MouseEventHandler,
    createChart,
    Time,
} from 'lightweight-charts';

import {ActionResult, clone, merge} from './utils.js';

export interface ChartActionParams extends DeepPartial<ChartOptions> {
    onClick?: MouseEventHandler<Time>;
    onCrosshairMove?: MouseEventHandler<Time>;
}

export type ChartActionResult = ActionResult<ChartActionParams> & { subject(): IChartApi; alive(): boolean };

export function chart(
    node: HTMLElement,
    params: ChartActionParams
): ChartActionResult {
    let {
        onClick,
        onCrosshairMove,
        ...options
    } = params;

    let width = options?.width ?? 0;
    let height = options?.height ?? 0;
    let destroyed = false;

    const chart = createChart(node);
    // TODO: write an issue. Chart returns live collection of options.
    const defaults: Partial<ChartOptions> = clone(chart.options());

    /*
     Following properties override series, price scale and time scale properties.
     It is undesired and uncontrolled behavior. It is better to never save them as defaults.
     */
    delete defaults.overlayPriceScales;
    delete defaults.leftPriceScale;
    delete defaults.rightPriceScale;
    delete defaults.timeScale;

    chart.applyOptions(options);

    if (onClick) {
        chart.subscribeClick(onClick);
    }

    if (onCrosshairMove) {
        chart.subscribeCrosshairMove(onCrosshairMove);
    }

    return {
        alive(): boolean {
            return !destroyed;
        },
        subject(): IChartApi {
            return chart;
        },
        update(nextParams: ChartActionParams): void {
            const {
                onClick: nextOnClick,
                onCrosshairMove: nextOnCrosshairMove,
                ...nextOptions
            } = nextParams;

            if (nextOptions) {
                chart.applyOptions(merge(clone(defaults), nextOptions));

                if (nextOptions.width !== undefined && nextOptions.width !== width
                    || nextOptions.height !== undefined && nextOptions.height !== height
                ) {
                    width = nextOptions.width ?? width;
                    height = nextOptions.height ?? height;
                    if (!nextOptions.autoSize) {
                        chart.resize(width, height, true);
                    }
                }

                options = nextOptions;
            }

            if (nextOnClick !== onClick) {
                if (onClick) {
                    chart.unsubscribeClick(onClick);
                }
                onClick = nextOnClick;
                if (onClick) {
                    chart.subscribeClick(onClick);
                }
            }

            if (nextOnCrosshairMove !== onCrosshairMove) {
                if (onCrosshairMove) {
                    chart.unsubscribeCrosshairMove(onCrosshairMove);
                }
                onCrosshairMove = nextOnCrosshairMove;
                if (onCrosshairMove) {
                    chart.subscribeCrosshairMove(onCrosshairMove);
                }
            }
        },
        destroy(): void {
            if (onClick) {
                chart.unsubscribeClick(onClick);
            }
            if (onCrosshairMove) {
                chart.unsubscribeCrosshairMove(onCrosshairMove);
            }
            chart.remove();
            destroyed = true;
        }
    }
}
