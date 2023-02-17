import { doc, globals } from '../globals/globals';

import predefinedIconsList from '../../plugin/predefinedIcons.json';

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
    setTimeout(() => {
        logseq.provideStyle({ key: 'awPr-iconProps-css', style: iconPropsStyles });
    }, 500)

    setTimeout(() => {
        logseq.provideStyle({ key: 'awPr-predefinedIcons-css', style: getPredefinedIconsCSS() });
    }, 500)
}

export const iconPropsUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-iconProps-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-predefinedIcons-css"]')?.remove();
}

const getPredefinedIconsCSS = (): string => {
    let css = '';
    for (let i = 0; i < predefinedIconsList.length; ++i) {
        const iconObj = predefinedIconsList[i];
        const propIcon = Object.keys(iconObj)[0];
        const propNamesArr = Object.values(iconObj)[0].split(',');
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
    }
    return css;
 }