import { doc } from '../modules/globals/globals';
import { getMainCSSColors, injectPluginCSS } from '../utils/utils';

export const togglePluginPopup = () => {
    if (!logseq.isMainUIVisible) {
        openPluginPopup();
    } else {
        closePluginPopup();
    }
}

const openPluginPopup = () => {
    injectPluginCSS('logseq-awesome-props_iframe', 'awPr-vars', getMainCSSColors());
    setPopupPosition();
    generatePluginPopup();
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
                right: `0px`,
                // items + padding + settings btn
                height: `600px`
            }
        );
    }
}

const generatePluginPopup = () => {
    const app = document.getElementById('app');
    app!.addEventListener('click', containerClickHandler);
    const appSettingsBtn = document.getElementById('app-settings-btn');
    appSettingsBtn!.addEventListener('click', settingsBtnClickHandler);
}

const containerClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.closest('#app-inner')) {
        closePluginPopup();
    }
}

export const settingsBtnClickHandler = () => {
    closePluginPopup();
    logseq.showSettingsUI();
}
