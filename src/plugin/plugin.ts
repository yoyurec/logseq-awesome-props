import { doc, body, globals } from '../modules/globals/globals';

import { iconPropsLoad, iconPropsUnload } from '../modules/iconProps/iconProps';
import { hidePropsLoad, hidePropsUnload } from '../modules/hideProps/hideProps';
import { checkPluginUpdate } from '../utils/utils';

export const pluginLoad = () => {
    body.classList.add(globals.isPluginEnabled);
    registerPlugin();

    runStuff();

    setTimeout(() => {
        // Listen plugin unload
        logseq.beforeunload(async () => {
            pluginUnload();
        });
    }, 2000)

    if (globals.pluginConfig.pluginUpdateNotify) {
        setTimeout(() => {
            checkPluginUpdate();
        }, 8000)
    }
}

const pluginUnload = () => {
    body.classList.remove(globals.isPluginEnabled);
    unregisterPlugin();
    stopStuff();
}

const registerPlugin = async () => {
    setTimeout(() => {
        if (doc.head) {
            const logseqCSS = doc.head.querySelector(`link[href="./css/style.css"]`);
            logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeProps" href="lsp://logseq.io/${globals.pluginID}/dist/assets/awesomeProps.css">`)
        }
    }, 100)
}

const unregisterPlugin = () => {
    doc.getElementById('css-awesomeProps')?.remove();
}

// Main logic runners
const runStuff = async () => {
    setTimeout(() => {
        iconPropsLoad();
    }, 2000);
    setTimeout(() => {
        hidePropsLoad();
    }, 3000)
}

const stopStuff = () => {
    iconPropsUnload();
    hidePropsUnload();
}
