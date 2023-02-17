import { doc, globals } from '../globals/globals';

import iconPropsStyles from './iconProps.css?inline';

export const toggleIconProps = () => {
    if (globals.pluginConfig.iconProps) {
        iconPropsLoad();
    } else {
        iconPropsUnload();
    }
}

export const iconPropsLoad = async () => {
    if (!globals.pluginConfig.iconProps) {
        return;
    }
    logseq.provideStyle({ key: 'awPr-iconProps-css', style: iconPropsStyles });
    logseq.provideStyle({ key: 'awPr-predefinedIcons-css', style: getPredefinedIconsCSS() });
}

export const iconPropsUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-iconProps-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-predefinedIcons-css"]')?.remove();
}

export const refreshIconsCSS = () => {
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
                .block-properties .page-property-key[data-ref="${propName}"]::before {
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
