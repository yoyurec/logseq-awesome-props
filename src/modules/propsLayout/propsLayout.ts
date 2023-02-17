import { body, doc, globals } from '../globals/globals';

import propsLayoutStyles from './propsLayout.css?inline';

export const toggleBlockPropsLayout = () => {
    switch (globals.pluginConfig.blockPropsLayout) {
        case 'Grid':
            body.dataset.awprBlockPropsLayout = 'grid';
            break;
        case 'Flat':
            body.dataset.awprBlockPropsLayout = 'flat';
            break;
    }
}

export const togglePagePropsLayout = () => {
    switch (globals.pluginConfig.pagePropsLayout) {
        case 'Grid':
            body.dataset.awprPagePropsLayout = 'grid';
            break;
        case 'Flat':
            body.dataset.awprPagePropsLayout = 'flat';
            break;
    }
}

export const propsLayoutLoad = async () => {
    injectPropsLayoutsCSS();
    togglePagePropsLayout();
    toggleBlockPropsLayout();
}

const injectPropsLayoutsCSS = () => {
    if (!doc.head.querySelector('style[data-injected-style^="awPr-propsLayout-css"]')) {
        // avoid loading if CSS exists
        logseq.provideStyle({ key: 'awPr-propsLayout-css', style: propsLayoutStyles });
    }
}
const ejectPropsLayoutsCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-propsLayout-css"]')?.remove();
}

export const propsLayoutUnload = () => {
    ejectPropsLayoutsCSS();
}
