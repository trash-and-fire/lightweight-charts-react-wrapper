import type {
    IChartApi,
    ITimeScaleApi,
    DeepPartial,
    LogicalRangeChangeEventHandler,
    SizeChangeEventHandler,
    TimeRangeChangeEventHandler,
    TimeScaleOptions
} from 'lightweight-charts';
import type {ActionResult} from './utils';

export interface TimeScaleParams extends DeepPartial<TimeScaleOptions> {
    onVisibleTimeRangeChange?: TimeRangeChangeEventHandler;
    onVisibleLogicalRangeChange?: LogicalRangeChangeEventHandler;
    onSizeChange?: SizeChangeEventHandler;
}

export type TimeScaleActionResult = ActionResult<TimeScaleParams> & { subject(): ITimeScaleApi };

export function timeScale(target: IChartApi, params: TimeScaleParams): TimeScaleActionResult {
    let {
        onVisibleTimeRangeChange,
        onVisibleLogicalRangeChange,
        onSizeChange,
        ...options
    } = params;

    const subject = target.timeScale();

    subject.applyOptions(options);

    if (onVisibleTimeRangeChange) {
        subject.subscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
    }
    if (onVisibleLogicalRangeChange) {
        subject.subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChange);
    }
    if (onSizeChange) {
        subject.subscribeSizeChange(onSizeChange);
    }

    return {
        subject(): ITimeScaleApi {
            return subject;
        },
        update(nextParams: TimeScaleParams): void {
            const {
                onVisibleTimeRangeChange: nextOnVisibleTimeRangeChange,
                onVisibleLogicalRangeChange: nextOnVisibleLogicalRangeChange,
                onSizeChange: nextOnSizeChange,
                ...nextOptions
            } = nextParams;

            if (nextOptions !== options) {
                options = nextOptions;
                if (options) {
                    subject.applyOptions(options);
                }
            }

            if (nextOnVisibleTimeRangeChange !== onVisibleTimeRangeChange) {
                if (onVisibleTimeRangeChange) {
                    subject.unsubscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
                }
                onVisibleTimeRangeChange = nextOnVisibleTimeRangeChange;
                if (onVisibleTimeRangeChange) {
                    subject.subscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
                }
            }

            if (nextOnVisibleLogicalRangeChange !== onVisibleLogicalRangeChange) {
                if (onVisibleLogicalRangeChange) {
                    subject.unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChange);
                }
                onVisibleLogicalRangeChange = nextOnVisibleLogicalRangeChange;
                if (onVisibleLogicalRangeChange) {
                    subject.subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChange);
                }
            }

            if (nextOnSizeChange !== onSizeChange) {
                if (onSizeChange) {
                    subject.unsubscribeSizeChange(onSizeChange);
                }
                onSizeChange = nextOnSizeChange;
                if (onSizeChange) {
                    subject.subscribeSizeChange(onSizeChange);
                }
            }
        },
        destroy(): void {
            if (onVisibleTimeRangeChange) {
                subject.unsubscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
            }

            if (onVisibleLogicalRangeChange) {
                subject.unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChange);
            }

            if (onSizeChange) {
                subject.unsubscribeSizeChange(onSizeChange);
            }
        }
    };
}
