import { doc, body, globals } from '../globals/globals';

import predefinedIconsList from '../../plugin/predefinedIcons.json';

import propsIconsStyles from './propsIcons.css?inline';

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
    logseq.provideStyle({ key: 'awPr-predefinedIcons-css', style: getIconsCSS() });
}

export const ejectPropsIconsCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-propsIcons-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-predefinedIcons-css"]')?.remove();
}

export const refreshPropsIconsListCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-predefinedIcons-css"]')?.remove();
    logseq.provideStyle({ key: 'awPr-predefinedIcons-css', style: getIconsCSS() });
 }

const getIconsCSS = (): string => {
    let css = '';
    for (let i = 0; i < predefinedIconsList.length; ++i) {
        const iconRecord = predefinedIconsList[i];
        const iconCode = Object.keys(iconRecord)[0];
        const predefinedPropsArr = Object.values(iconRecord)[0].split(',');
       // const userIconCode = `icon-${iconCode}`;
        const userPropsArr = logseq.settings![`icon-${iconCode}`].split(',')
        const mergedPropsArr = [...new Set([...predefinedPropsArr ,...userPropsArr])];
        for (let i = 0; i < mergedPropsArr.length; ++i) {
            const propName = mergedPropsArr[i];
            const newCSSItem = `
            body[data-awpr-page-props-icons] .block-properties.page-properties .page-property-key[data-ref="${propName}"]::before,
            .block-properties.page-properties[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before,
            body[data-awpr-block-props-icons] .block-properties:not(.page-properties) .page-property-key[data-ref="${propName}"]::before,
            .block-properties:not(.page-properties)[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before {
                content: "\\${iconCode}" !important;
            }
            .desc-item[data-key="icon-${iconCode}"] .form-control::before {
                content: "\\${iconCode}" !important;
            }
            `;
            css += newCSSItem;
        }
    }
    return css;
}
