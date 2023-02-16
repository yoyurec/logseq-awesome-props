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
    setTimeout(() => {
        logseq.provideStyle({ key: 'awPr-awesomeProps-css', style: iconPropsStyles });
    }, 500)
}

export const iconPropsUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-awesomeProps-css"]')?.remove();
}