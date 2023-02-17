import { LSPluginBaseInfo, SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

import { objectsKeysDiff } from '../utils/utils';
import { globals } from '../modules/globals/globals';

import './settings.css';
import predefinedIconsList from './predefinedIcons.json';

import { settingsConfig } from './settingsConfig';
import { toggleHideDotProps, toggleHideSetOfProps } from '../modules/hideProps/hideProps';
import { toggleIconProps } from '../modules/iconProps/iconProps';

export const settingsLoad = () => {
    let insertIndex = 0;
    for (let i = 0; i < settingsConfig.length; ++i) {
        if (settingsConfig[i].key === 'iconsListHeading') {
            insertIndex = i + 1;
        }
    }
    const predefinedIconsSettings = getPredefinedIconsSettings();
    settingsConfig.splice(insertIndex, 0, ...predefinedIconsSettings);
    console.dir(settingsConfig);
    logseq.useSettingsSchema(settingsConfig);

    globals.pluginConfig = logseq.settings;

    // Listen settings update
    logseq.onSettingsChanged((settings, oldSettings) => {
        onSettingsChangedCallback(settings, oldSettings);
    });
}

const getPredefinedIconsSettings = (): SettingSchemaDesc[] => {
    const settingsArr = [];
    for (let i = 0; i < predefinedIconsList.length; ++i) {
        const iconObj = predefinedIconsList[i];
        const newSettingsItem:SettingSchemaDesc = {
            key: `icon-${Object.keys(iconObj)[0]}`,
            title: '',
            description: '',
            type: 'string',
            default: Object.values(iconObj)[0],
        }
        settingsArr.push(newSettingsItem);
    }
    return settingsArr;
 }

// Setting changed
export const onSettingsChangedCallback = (settings: LSPluginBaseInfo['settings'], oldSettings: LSPluginBaseInfo['settings']) => {
    globals.pluginConfig = { ...settings };
    const settingsChangedKey = objectsKeysDiff({ ...oldSettings }, globals.pluginConfig)
    if (!settingsChangedKey.length) {
        return;
    }

    if (settingsChangedKey.includes('iconProps')) {
        toggleIconProps();
    }
    if (settingsChangedKey.includes('hideDotProps')) {
        toggleHideDotProps();
    }
    if (settingsChangedKey.includes('hideSetOfProps')) {
        toggleHideSetOfProps();
    }
}
