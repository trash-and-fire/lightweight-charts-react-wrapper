import React, {ChangeEvent} from 'react';
import cn from 'classnames';

import styles from './switcher.module.css';

export interface SwitcherProps {
    list: string[];
    name?: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Switcher({list, value, name = 'switcher', onChange}: SwitcherProps): JSX.Element {
    return (
        <div className="switcher">
            {list.map((item: string) => (
                <label key={item} className={cn(styles['switcher-item'], value === item && styles.active)}>
                    {item}
                    <input
                        className={styles.input}
                        type="radio"
                        name={name}
                        value={item}
                        checked={item === value}
                        onChange={onChange}
                    />
                </label>
            ))}
        </div>
    );
}
