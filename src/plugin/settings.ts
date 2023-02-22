import { LSPluginBaseInfo, SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

import { objectsKeysDiff } from '../utils/utils';
import { doc, globals } from '../modules/globals/globals';

import './settings.css';
import predefinedIconsList from './predefinedIcons.json';

import { settingsConfig } from './settingsConfig';
import { toggleHideDotProps, toggleHideSetOfProps } from '../modules/hideProps/hideProps';
import { refreshUserIconsListCSS, refreshUserPropsListCSS, toggleBlockPropsIcons, togglePagePropsIcons } from '../modules/propsIcons/propsIcons';
import { togglePagePropsLayout, toggleBlockPropsLayout } from '../modules/propsLayout/propsLayout';

export const settingsLoad = () => {
    let insertIndex = 0;
    for (let i = 0; i < settingsConfig.length; ++i) {
        if (settingsConfig[i].key === 'iconsListHeading') {
            insertIndex = i + 1;
        }
    }
    const predefinedIconsSettings = getPredefinedIconsSettings();
    settingsConfig.splice(insertIndex, 0, ...predefinedIconsSettings);
    logseq.useSettingsSchema(settingsConfig);

    globals.pluginConfig = logseq.settings;

    // Listen settings update
    logseq.onSettingsChanged((settings, oldSettings) => {
        onSettingsChangedCallback(settings, oldSettings);
    });
}

const getPredefinedIconsSettings = (): SettingSchemaDesc[] => {
    const settingsArr:SettingSchemaDesc[] = [];
    Object.entries(predefinedIconsList).forEach(iconRecord => {
        const [iconCode, propsNames] = iconRecord;
        const newSettingsItem:SettingSchemaDesc = {
            key: `userIcon-${iconCode}`,
            title: '',
            description: `${propsNames}`,
            type: 'string',
            default: ''
        }
        settingsArr.push(newSettingsItem);
    });
    return settingsArr;
}

const addIconsPropsPageLink = () => {
    doc.getElementById('iconsPropsPageLink')?.remove();
    const iconsPropsPageBlock = doc.querySelector('.desc-item[data-key="iconsPropsPage"');
    const iconsPropsPageLink = `<a id="iconsPropsPageLink" href="#/page/${globals.pluginConfig.iconsPropsPage}">Open page</s>`
    iconsPropsPageBlock?.insertAdjacentHTML('beforeend', iconsPropsPageLink);
}


// Setting changed
export const onSettingsChangedCallback = (settings: LSPluginBaseInfo['settings'], oldSettings: LSPluginBaseInfo['settings']) => {
    globals.pluginConfig = { ...settings };
    const settingsChangedKey = objectsKeysDiff({ ...oldSettings }, globals.pluginConfig)
    if (!settingsChangedKey.length) {
        return;
    }
    if (settingsChangedKey.some(key => key.startsWith('userIcon-'))) {
        refreshUserPropsListCSS();
    }
    if (settingsChangedKey.includes('userIconsList')) {
        refreshUserIconsListCSS();
    }
    if (settingsChangedKey.includes('blockPropsLayout')) {
        toggleBlockPropsLayout();
    }
    if (settingsChangedKey.includes('blockPropsIcons')) {
        toggleBlockPropsIcons();
    }
    if (settingsChangedKey.includes('pagePropsLayout')) {
        togglePagePropsLayout();
    }
    if (settingsChangedKey.includes('pagePropsIcons')) {
        togglePagePropsIcons();
    }
    if (settingsChangedKey.includes('hideDotProps')) {
        toggleHideDotProps();
    }
    if (settingsChangedKey.includes('hideSetOfProps')) {
        toggleHideSetOfProps();
    }
    if (settingsChangedKey.includes('iconsPropsPage')) {
        addIconsPropsPageLink();
        // ....
    }
}
