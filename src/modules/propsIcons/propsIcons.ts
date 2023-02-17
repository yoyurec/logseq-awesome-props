import { doc, body, globals } from '../globals/globals';

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
    logseq.provideStyle({ key: 'awPr-predefinedIcons-css', style: getPredefinedIconsCSS() });
}

export const ejectPropsIconsCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-propsIcons-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-predefinedIcons-css"]')?.remove();
}

export const refreshPropsIconsListCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-predefinedIcons-css"]')?.remove();
    logseq.provideStyle({ key: 'awPr-predefinedIcons-css', style: getPredefinedIconsCSS() });
 }

const getPredefinedIconsCSS = (): string => {
    let css = '';
    const settingsObj = logseq.settings;
    if (!settingsObj) {
        return css;
    }
    Object.keys(settingsObj)
        .filter(key => key.startsWith('icon-'))
        .forEach(key => {
            const propIcon = key.replace('icon-', '');
            const propNamesArr = settingsObj[key].split(',');
            for (let i = 0; i < propNamesArr.length; ++i) {
                const propName = propNamesArr[i];
                const newCSSItem = `
                body[data-awpr-page-props-icons] .block-properties.page-properties .page-property-key[data-ref="${propName}"]::before,
                .block-properties.page-properties[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before,
                body[data-awpr-block-props-icons] .block-properties:not(.page-properties) .page-property-key[data-ref="${propName}"]::before,
                .block-properties:not(.page-properties)[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before {
                    content: "\\${propIcon}" !important;
                }
                .desc-item[data-key="icon-${propIcon}"] .form-control::before {
                    content: "\\${propIcon}" !important;
                }
                `;
                css += newCSSItem;
            }
        });
    return css;
}
