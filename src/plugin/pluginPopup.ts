import { doc, globals } from '../modules/globals/globals';
import { getMainCSSColors, injectPluginCSS } from '../utils/utils';

export const togglePluginPopup = () => {
    openPluginPopup();
}

const openPluginPopup = () => {
    injectPluginCSS('logseq-awesome-props_iframe', 'awPr-vars', getMainCSSColors());
    setPopupPosition();
    logseq.showMainUI();
}

const closePluginPopup = async () => {
    logseq.hideMainUI();
}

const setPopupPosition = () => {
    const button = doc.getElementById('awPr-toggle-button');
    if (button) {
        const buttonPos = button.getBoundingClientRect();
        const appInner = document.getElementById('app-inner');
        Object.assign(
            appInner!.style,
            {
                top: `${buttonPos.top + 40}px`,
                left: `${buttonPos.left - 100}px`,
            }
        );
    }
}

export const generatePluginPopup = () => {
    const app = document.getElementById('app');
    app!.addEventListener('click', containerClickHandler);
    const appSettingsBtn = document.getElementById('app-settings-btn');
    appSettingsBtn!.addEventListener('click', settingsBtnClickHandler);
    const settingsPageBtn = document.getElementById('settings-page-link');
    settingsPageBtn!.addEventListener('click', settingsPageBtnClickHandler);
}

const containerClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest('#app-inner')) {
        closePluginPopup();
    }
}

const settingsBtnClickHandler = () => {
    closePluginPopup();
    logseq.showSettingsUI();
}

const settingsPageBtnClickHandler = async () => {
    closePluginPopup();
    const graph = await logseq.App.getCurrentGraph();
    if (graph) {
        window.location.href = `logseq://graph/${graph.name}?page=${globals.pluginConfig.iconsPropsPage}`;
    }
}
