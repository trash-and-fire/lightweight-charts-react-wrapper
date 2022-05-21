import React, {Component} from 'react';
import {flushSync} from 'react-dom';
import isEqual from 'lodash-es/isEqual';
import pick from 'lodash-es/pick';

import {
    fetchFiles,
    sendFilesToCSB,
    getSandboxUrl,
    finaliseCSB,
} from 'codesandboxer';

export interface GitInfo {
    account: string;
    repository: string;
    branch?: string | undefined;
    host: 'bitbucket' | 'github';
}

export interface Files {
    [key: string]: { content: string };
}

export interface Package {
    name: string;
    version: string;
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
    peerDependencies: {
        [key: string]: string;
    };
}

export type ImportReplacement = [string, string];

export interface Error {
    name: string;
    description?: string | undefined;
    content?: string | undefined;
}

export interface State {
    parameters: string;
    isLoading: boolean;
    isDeploying: boolean;
    sandboxId?: string | undefined;
    sandboxUrl?: string | undefined;
    deployPromise?: Promise<any> | undefined;
    files?: Files | undefined;
    error?: Error | undefined;
    fileName: string;
}

export interface Props {
    examplePath: string;
    name?: string | undefined;
    gitInfo: GitInfo;
    example?: string | Promise<string> | undefined;
    pkgJSON?: Package | string | Promise<Package | string> | undefined;
    importReplacements?: ImportReplacement[] | undefined;
    dependencies?: { [key: string]: string } | undefined;
    skipRedirect?: boolean | undefined;
    ignoreInternalImports?: boolean | undefined;
    preload?: boolean | undefined;
    autoDeploy?: boolean | undefined;
    onLoadComplete?: ((
        arg: { parameters: string; files: Files } | { error: any }
    ) => unknown) | undefined;
    afterDeploy?: ((sandboxUrl: string, sandboxId: string) => unknown) | undefined;
    afterDeployError?: ((error: Error) => unknown) | undefined;
    providedFiles?: Files | undefined;
    children: (obj: {
        isLoading: boolean;
        isDeploying: boolean;
        files?: Files | undefined;
        sandboxId?: string | undefined;
        sandboxUrl?: string | undefined;
        error?: Error;
        onClick: (e: React.MouseEvent) => void;
    }) => React.ReactNode;
    style?: object | undefined;
    extensions?: string[] | undefined;
    template?: 'create-react-app' | 'create-react-app-typescript' | 'vue-cli' | undefined;
}

export class Sandboxer extends Component<Props, State> {
    button: HTMLElement | null = null;

    state: State = {
        parameters: '',
        isLoading: false,
        isDeploying: false,
        fileName: 'example',
    };
    static defaultProps = {
        children: ({ onClick }: Parameters<Props['children']>[0]) => <button type="submit" onClick={onClick}>Deploy to CodeSandbox</button>,
        pkgJSON: {},
        dependencies: {},
        providedFiles: {},
        importReplacements: [],
        extensions: [],
        style: {display: 'inline-block'},
    };

    shouldReload = false;

    loadFiles = () => {
        let {onLoadComplete, providedFiles, dependencies, name} = this.props;

        // by assembling a deploy promise, we can save it for later if loadFiles is
        // being called by `preload`, and preload can use it once it is ready.
        // We return deployPromise at the end so that non-preloaded calls can then be
        // resolved
        let deployPromise = fetchFiles(this.props)
            .then((fetchedInfo: any) => {
                let {parameters} = finaliseCSB(fetchedInfo, {
                    extraFiles: providedFiles,
                    extraDependencies: dependencies,
                    name,
                });
                flushSync(() => {
                    this.setState(
                        {
                            parameters,
                            isLoading: false,
                            files: fetchedInfo.files,
                            fileName: fetchedInfo.fileName,
                        },
                        () => {
                            if (onLoadComplete) {
                                onLoadComplete({parameters, files: fetchedInfo.files});
                            }
                        }
                    );
                });
            })
            .catch((error: Error) => {
                this.setState({error, isLoading: false});
                if (onLoadComplete) onLoadComplete({error});
            });

        this.setState({
            isLoading: true,
            deployPromise,
        });

        return deployPromise;
    };

    deploy = () => {
        let {afterDeploy, skipRedirect, afterDeployError} = this.props;
        let {parameters, error, fileName} = this.state;
        if (error) return;

        sendFilesToCSB(parameters, {fileName})
            .then(({sandboxId, sandboxUrl}: any) => {
                this.setState({
                    sandboxId,
                    sandboxUrl,
                    isDeploying: false,
                    isLoading: false,
                });
                if (!skipRedirect) {
                    window.open(sandboxUrl);
                }
                if (afterDeploy) {
                    afterDeploy(getSandboxUrl(sandboxId, 'embed'), sandboxId);
                }
            })
            .catch((errors: any) => {
                if (afterDeployError) {
                    afterDeployError({
                        name: 'error deploying to CodeSandbox',
                        content: errors,
                    });
                }
                this.setState({
                    error: {
                        name: 'error deploying to CodeSandbox',
                        content: errors,
                    },
                });
            });
    };

    deployToCSB = (e?: React.MouseEvent) => {
        const {deployPromise, isDeploying} = this.state;
        if (e) {
            e.preventDefault();
        }
        if (isDeploying) return null;
        this.setState({isDeploying: true});

        if (!this.shouldReload && deployPromise) {
            deployPromise.then(this.deploy);
        } else {
            this.shouldReload = false;
            this.loadFiles().then(this.deploy);
        }
    };

    componentDidUpdate(prevProps: Props) {
        /* If props related to loading files have been changed, next deploy should reload files */
        /* The props that are compared should be the same as the arguments of fetchFiles */
        const compareKeys = [
            'examplePath',
            'gitInfo',
            'importReplacements',
            'dependencies',
            'providedFiles',
            'name',
            'extensions',
            'template',
        ];
        if (!isEqual(pick(this.props, compareKeys), pick(prevProps, compareKeys))) {
            this.shouldReload = true;
        } else {
            /* pkgJSON and example also need to be compared, but may be promises, which must be resolved before they can be compared */
            Promise.all([this.props.example, prevProps.example]).then(
                ([example, prevExample]) => {
                    if (example !== prevExample) {
                        this.shouldReload = true;
                    } else {
                        Promise.all([this.props.pkgJSON, prevProps.pkgJSON]).then(
                            ([pkgJSON, prevPkgJSON]) => {
                                if (!isEqual(pkgJSON, prevPkgJSON)) {
                                    this.shouldReload = true;
                                }
                            }
                        );
                    }
                }
            );
        }
    }

    componentDidMount() {
        if (this.props.autoDeploy) {
            this.deployToCSB();
            return;
        }

        if (this.props.preload) this.loadFiles();
    }

    render() {
        const {isLoading, isDeploying, error, sandboxId, sandboxUrl} = this.state;
        return this.props.children({
            isLoading,
            isDeploying,
            error,
            sandboxId,
            sandboxUrl,
            onClick: this.deployToCSB,
        })
    }
}
