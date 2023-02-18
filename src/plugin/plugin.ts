import { doc, body, globals } from '../modules/globals/globals';

import { checkPluginUpdate } from '../utils/utils';

import { propsIconsLoad, propsIconsUnload } from '../modules/propsIcons/propsIcons';
import { hidePropsLoad, hidePropsUnload } from '../modules/hideProps/hideProps';
import { propsLayoutLoad, propsLayoutUnload } from '../modules/propsLayout/propsLayout';

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
        showSettingsPopup: showSettingsPopup,
    });
    logseq.App.registerUIItem(
        'toolbar',
        {
            key: 'AwesomeProps',
            template: `
                <a
                class="button" id="awPr-toggle-button"
                data-on-click="showSettingsPopup" data-rect>
                    <i id="awPr-toggle-icon">
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' stroke='currentColor' fill='none' ><path d='M4.182 4h-.727A1.455 1.455 0 0 0 2 5.455V12a1.454 1.454 0 0 0 1.455 1.454H10A1.454 1.454 0 0 0 11.454 12v-.727'/><path d='m10.636 2.636 2.182 2.182m1.011-1.033a1.527 1.527 0 0 0-2.16-2.16L5.545 7.727V9.91h2.182l6.102-6.116v-.008Z'/></svg>
                    </i>
                </a>
            `
        }
    );
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

export const showSettingsPopup = () => {
    logseq.showSettingsUI();
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
    hidePropsUnload();
}
