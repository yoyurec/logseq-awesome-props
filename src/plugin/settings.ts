import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import { globals } from '../modules/globals/globals';
import { settingsConfig } from './settingsConfig';
import { toggleHideDotPropsFeature, toggleHideSetOfPropsFeature } from '../modules/ui/hideProps/hideProps';
import { objectsKeysDiff } from '../utils/utils';

import './settings.css';

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

    if (settingsChangedKey.includes('featureHideDotProps')) {
        toggleHideDotPropsFeature();
    }
    if (settingsChangedKey.includes('featureHideSetOfProps')) {
        toggleHideSetOfPropsFeature();
    }
}
