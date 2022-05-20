export function ensure<T>(value: T | null | undefined): T {
    if (value === null || value === undefined) {
        throw new Error('no value');
    }
    return value;
}

export interface ActionResult<T> {
    update(params: T): void;
    destroy(): void;
}
