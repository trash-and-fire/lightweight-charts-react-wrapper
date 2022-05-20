export type LazyValue<T> = {
    (): T;
    reset(): void;
}
