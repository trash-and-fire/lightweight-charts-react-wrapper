import {Link} from 'react-router-dom';
import {Sandboxer} from './utils/sandoxer';

const context = require.context('./samples', false, /\.tsx$/);
// eslint-disable-next-line
import styles from './gallery.module.css';

const components = context.keys().map((request) => {
    // const [file] = /(\w|[-.])+$/.exec(request);
    // const id = repl.samples[file]?.uid;
    return {
        path: context.resolve(request).slice(2),
        // href: id !== undefined ? `https://svelte.dev/repl/${id}` : undefined,
        constructor: context(request).default,
    }
});

export function Gallery() {
    return (
        <>
            <Link to="/terminal/">
                Terminal
            </Link>
            <br/>
            <div className={styles.container}>
                {components.map((component: { path: string; constructor: () => JSX.Element }) => (
                    <div key={component.constructor.name} className={styles.item}>
                        <Sandboxer
                            examplePath={
                                'packages/demo/' + component.path
                            }
                            gitInfo={{
                                account: 'trash-and-fire',
                                host: 'github',
                                repository: 'lightweight-charts-react-wrapper',
                            }}
                            dependencies={{
                                'lightweight-charts-react-wrapper': '*',
                                'react': '*',
                                'react-dom': '*',
                                'lightweight-charts': '>=3.8.0',
                                'tslib': '*',
                                '@babel/runtime': '*',
                                'classnames': '*',
                            }}
                            template="create-react-app-typescript"
                        >
                            {({ onClick }) => (
                                <a className={styles.link} target="_blank" onClick={onClick} title="Show in REPL">
                                    <svg width="18" height="15" viewBox="0 0 18 15" xmlns="http://www.w3.org/2000/svg">
                                        <g stroke="currentColor" fill="none">
                                            <path d="M12.5 2.5l5 5-5 5M10.5.5l-3 14M5.5 2.5l-5 5 5 5"></path>
                                        </g>
                                    </svg>
                                </a>
                            )}
                        </Sandboxer>
                        <component.constructor/>
                    </div>
                ))}
            </div>
        </>
    );
}
