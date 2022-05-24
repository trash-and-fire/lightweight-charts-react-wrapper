export function ensure<T>(value: T | null | undefined): T {
    if (value === null || value === undefined) {
        throw new Error('no value');
    }
    return value;
}

export function clone<T>(object: T): T {
    const source = object as any;

    if (source === null || typeof source !== 'object') {
        return source;
    }

    const result: any = Array.isArray(source) ? [] : {};

    for (let key in source) {
        if (!source.hasOwnProperty(key)) {
            continue;
        }
        const value = source[key];

        if (value !== null && typeof value === 'object') {
            result[key] = clone(value);
        } else {
            result[key] = value;
        }
    }

    return result;
}

export function merge(dest: Record<string, any>, source: Record<string, any>): Record<string, any> {
    for (const key in source) {
        if (!source.hasOwnProperty(key)) {
            continue
        }
        if (source[key] === undefined) {
            continue;
        }

        if (dest[key] === undefined || typeof source[key] !== 'object') {
            dest[key] = source[key];
        } else {
            merge(dest[key], source[key]);
        }
    }

    return dest;
}


export interface ActionResult<T> {
    update(params: T): void;
    destroy(): void;
}
