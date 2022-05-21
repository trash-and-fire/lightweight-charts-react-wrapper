/// <reference types="react-scripts" />
/// <reference types="webpack-env" />

declare module 'codesandboxer' {
    export function fetchFiles(...args: any): any;
    export function sendFilesToCSB(...args: any): any;
    export function getSandboxUrl(...args: any): any;
    export function finaliseCSB(...args: any): any;
}
