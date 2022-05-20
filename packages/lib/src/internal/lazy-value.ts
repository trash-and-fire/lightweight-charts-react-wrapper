export type LazyValue<T> = {
    (): T;
    reset(): void;
}

export function createLazyValue<T>(
    init: () => T,
    reset: (value: T) => void
): LazyValue<T> {
    let subject: T | null = null;

    const getter = () => {
        if (subject === null) {
            subject = init();
        }
        return subject;
    }

    getter.reset = () => {
        if (subject !== null) {
            reset(subject);
        }
        subject = null;
    }

    return getter;
}
