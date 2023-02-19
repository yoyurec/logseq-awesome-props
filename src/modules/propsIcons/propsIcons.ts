import { doc, body, globals } from '../globals/globals';

import iconsRecordsListJSON from '../../plugin/predefinedIcons.json';

import propsIconsStyles from './propsIcons.css?inline';

type iconRecord = {
    [key: string]: string;
}

export const toggleBlockPropsIcons = () => {
    if (globals.pluginConfig.blockPropsIcons) {
        body.dataset.awprBlockPropsIcons = '';
    } else {
        delete body.dataset.awprBlockPropsIcons;
    }
}

export const togglePagePropsIcons = () => {
    if (globals.pluginConfig.pagePropsIcons) {
        body.dataset.awprPagePropsIcons = '';
    } else {
        delete body.dataset.awprPagePropsIcons;
    }
}

export const propsIconsLoad = async () => {
    injectPropsIconsCSS();
    toggleBlockPropsIcons();
    togglePagePropsIcons();
}

export const propsIconsUnload = () => {
    ejectPropsIconsCSS();
}

export const injectPropsIconsCSS = async () => {
    logseq.provideStyle({ key: 'awPr-propsIcons-css', style: propsIconsStyles });
    logseq.provideStyle({ key: 'awPr-predefinedIcons-css', style: generatePredefinedIconsCSS() });
    logseq.provideStyle({ key: 'awPr-userOverridesIcons-css', style: generateUserOverridesIconsCSS() });
}

export const ejectPropsIconsCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-propsIcons-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-predefinedIcons-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-userOverridesIcons-css"]')?.remove();
}

export const refreshPropsIconsListCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-userOverridesIcons-css"]')?.remove();
    logseq.provideStyle({ key: 'awPr-userOverridesIcons-css', style: generateUserOverridesIconsCSS() });
}

const generateIconsCSS = (iconsRecordsObject: iconRecord):string => {
    let css = '';
    Object.keys(iconsRecordsObject).forEach((iconCode: string) => {
        const propsNamesList = iconsRecordsObject[iconCode];
        propsNamesList.split(',').forEach((propName:string) => {
            css += generateIconCSS(iconCode, propName);
        })
    })
    return css;
}

const generatePredefinedIconsCSS = (): string => {
    return generateIconsCSS(iconsRecordsListJSON);
 }

const generateUserOverridesIconsCSS = (): string => {
    const userOverridesIconsObject = Object.keys(globals.pluginConfig)
        .filter((settingsKey: string) => settingsKey.startsWith('userIcon-'))
        .reduce((obj, key) => {
            const iconCode = key.replace('userIcon-', '');
        return Object.assign(obj, {
            [iconCode]: globals.pluginConfig[key]
        });
        }, {});
    return generateIconsCSS(userOverridesIconsObject);
}

const generateIconCSS = (iconCode: string, propName: string) => {
    return `
    body[data-awpr-page-props-icons] .block-properties.page-properties .page-property-key[data-ref="${propName}"]::before,
    .block-properties.page-properties[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before,
    body[data-awpr-block-props-icons] .block-properties:not(.page-properties) .page-property-key[data-ref="${propName}"]::before,
    .block-properties:not(.page-properties)[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before {
        content: "\\${iconCode}" !important;
    }
    .desc-item[data-key="userIcon-${iconCode}"] .form-control::before {
        content: "\\${iconCode}" !important;
    }
    [data-awpr-icon="${propName}"]::before {
        content: "\\${iconCode}";
    }
    `;
}
