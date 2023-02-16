import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import { objectsKeysDiff } from '../utils/utils';
import { globals } from '../modules/globals/globals';

import './settings.css';

import { settingsConfig } from './settingsConfig';
import { toggleHideDotProps, toggleHideSetOfProps } from '../modules/hideProps/hideProps';
import { toggleIconProps } from '../modules/iconProps/iconProps';

export const settingsLoad = () => {
    logseq.useSettingsSchema(settingsConfig);
    globals.pluginConfig = logseq.settings;

    // Listen settings update
    logseq.onSettingsChanged((settings, oldSettings) => {
        onSettingsChangedCallback(settings, oldSettings);
    });
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
