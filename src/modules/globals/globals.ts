import { logseq as PL } from '../../../package.json';

type globalsType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const doc = parent.document;
export const root = doc.documentElement;
export const body = doc.body;

export const globals: globalsType = {
    pluginID: PL.id,
    pluginSVGIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" stroke="currentColor" fill="none" ><path d="M4.182 4h-.727A1.455 1.455 0 0 0 2 5.455V12a1.454 1.454 0 0 0 1.455 1.454H10A1.454 1.454 0 0 0 11.454 12v-.727"/><path d="m10.636 2.636 2.182 2.182m1.011-1.033a1.527 1.527 0 0 0-2.16-2.16L5.545 7.727V9.91h2.182l6.102-6.116v-.008Z"/></svg>',
    pluginConfig: null,
    isPluginEnabled: 'is-awPr-enabled',
};
