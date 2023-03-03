import { doc } from '../modules/globals/globals';
import { getMainCSSColors, injectPluginCSS } from '../utils/utils';

import tablerIconsListJSON from './tablerIcons.json';
import logseqIconsListJSON from './logseqIcons.json';

type iconPickerListObj = {
    styles: string;
    html: string;
}

type iconItem = {
    n: string;
    t: string;
    u: string;
}


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
                right: `0px`
            }
        );
    }
}

export const generatePluginPopup = () => {
    const app = document.getElementById('app');
    app!.addEventListener('click', containerClickHandler);

    const appSettingsBtn = document.getElementById('app-settings-btn');
    appSettingsBtn!.addEventListener('click', settingsBtnClickHandler);

    const iconPickerBtn = document.getElementById('icon-picker-btn');
    iconPickerBtn!.addEventListener('click', iconPickerBtnClickHandler);

    const iconPickerList = document.getElementById('icon-picker-list');
    iconPickerList!.addEventListener('click', iconPickerListClickHandler);

    const searchField = document.getElementById('icon-picker-search') as HTMLInputElement;
    searchField!.addEventListener('input', iconPickerSearchHandler);

    const iconPickerListObj = generateIconPicker(tablerIconsListJSON);
    iconPickerList?.insertAdjacentHTML('afterbegin', iconPickerListObj.html);
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

const iconPickerBtnClickHandler = () => {
    document.getElementById('app-inner')?.classList.toggle('hidden-picker');
}

const iconPickerListClickHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target) {
        const content = target.innerHTML || '';
        navigator.clipboard.writeText(content).then(() => {
            logseq.UI.showMsg(`Icon ${target.className.replace('icon-', '')} copied to clipboard`, 'success', { timeout: 1500 });
          },() => {
            console.error('Failed to copy');
          });
    }
}

const iconPickerSearchHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const searchText = target.value.toLowerCase();
    const stylesheet = new CSSStyleSheet();
    let stylesContent = '';
    if (searchText) {
        stylesContent = `.icon-item:not([data-search*="${searchText}"]) {display: none;}`;
    }
    stylesheet.replaceSync(stylesContent);
    document.adoptedStyleSheets = [stylesheet];
}

const generateIconPicker = (iconsArr: iconItem[]): iconPickerListObj => {
    const result: iconPickerListObj = {
        styles: '',
        html: ''
    };
    const existingIcons: string[] = logseqIconsListJSON;
    iconsArr.forEach(item => {
        if (!existingIcons.includes(item.u)) {
            // TODO: delete checking when Logseq will update Tabler icons to latest 2.x.x version
            return;
        }
        result.html = result.html + `
        <div class="icon-item" data-search="${item.t}">
            <div class="icon-glyph" title="Click to copy icon glyph">&#x${item.u};</div>
            <code class="icon-code" title="Click to copy icon code">${item.u}</code>
            <div class="icon-name">${item.n}</div>
        </div>
        `;
    },);
    return result;
}
