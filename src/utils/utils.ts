import { packageVersion } from '../../.version';

import { globals } from '../modules/globals/globals';

export const objectsKeysDiff = (orig: object, updated: object) => {
    const difference = Object.keys(orig).filter((key) => {
        if (key === 'presetCustom') {
            return false
        }
        // @ts-ignore
        return orig[key] !== updated[key]
    });
    return difference;
}

export const checkPluginUpdate = async () => {
    const response = await fetch(
        `https://api.github.com/repos/yoyurec/${globals.pluginID}/releases/latest`,
        { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    const repoInfo = await response.json();
    if (repoInfo) {
        const latestReleaseVersion = repoInfo.tag_name.replace('v', '');
        // https://stackoverflow.com/a/65687141
        const hasUpdate = latestReleaseVersion.localeCompare(packageVersion, undefined, { numeric: true, sensitivity: 'base' });
        if (hasUpdate == 1) {
            logseq.UI.showMsg(`"${globals.pluginID}" new version is available! Please, update!`, 'warning', {timeout: 30000});
        }
    }
}
