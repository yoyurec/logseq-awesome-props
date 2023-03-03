import { doc, body, globals } from '../modules/globals/globals';

import { checkPluginUpdate } from '../utils/utils';

import { propsIconsLoad, propsIconsUnload } from '../modules/propsIcons/propsIcons';
import { hidePropsLoad, hidePropsUnload } from '../modules/hideProps/hideProps';
import { propsLayoutLoad, propsLayoutUnload } from '../modules/propsLayout/propsLayout';
import { generatePluginPopup, togglePluginPopup } from './pluginPopup';

import './plugin.css';

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
    logseq.provideModel({
        togglePluginPopup: togglePluginPopup
    });
    logseq.App.registerUIItem(
        'toolbar',
        {
            key: 'AwesomeProps',
            template: `
                <button
                class="button" id="awPr-toggle-button"
                data-on-click="togglePluginPopup" data-rect>
                    <span id="awPr-toggle-icon">
                        ${globals.pluginSVGIcon}
                    </span>
                </button>
            `
        }
    );
    setTimeout(() => {
        if (doc.head) {
            const logseqCSS = doc.head.querySelector(`link[href="./css/style.css"]`);
            logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeProps" href="lsp://logseq.io/${globals.pluginID}/dist/assets/awesomeProps.css">`)
        }
    }, 100);
    generatePluginPopup();
}

const unregisterPlugin = () => {
    doc.getElementById('css-awesomeProps')?.remove();
}

// Main logic runners
const runStuff = async () => {
    setTimeout(() => {
        propsIconsLoad();
        propsLayoutLoad();
    }, 2000);
    setTimeout(() => {
        hidePropsLoad();
    }, 3000)
}

const stopStuff = () => {
    propsLayoutUnload();
    propsIconsUnload();
    hidePropsUnload();
}
