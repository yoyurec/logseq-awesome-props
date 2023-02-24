import { packageVersion } from '../../.version';

import { body, doc, globals } from '../modules/globals/globals';

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

export const getInheritedBackgroundColor = (el: Element | null): string => {
    if (!el) {
        return '';
    }
    const defaultStyle = 'rgba(0, 0, 0, 0)';
    const backgroundColor = getComputedStyle(el).backgroundColor
    if (backgroundColor != defaultStyle) return backgroundColor
    if (!el.parentElement) return defaultStyle
    return getInheritedBackgroundColor(el.parentElement)
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

export const injectPluginCSS = (iframeId: string, label: string, cssContent: string) => {
    const pluginIframe = doc.getElementById(iframeId) as HTMLIFrameElement;
    if (!pluginIframe) {
        return
    }
    ejectPluginCSS(iframeId, label);
    pluginIframe.contentDocument?.head.insertAdjacentHTML(
        'beforeend',
        `<style id='${label}'>
            ${cssContent}
        </style>`
    );
}

export const ejectPluginCSS = (iframeId: string, label: string) => {
    const pluginIframe = doc.getElementById(iframeId) as HTMLIFrameElement;
    if (!pluginIframe) {
        return;
    }
    pluginIframe.contentDocument?.getElementById(label)?.remove();
}

export const toKebabCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export const getMainCSSColors = (): string => {
    const link = doc.createElement('a');
    body.insertAdjacentElement('beforeend', link);
    const linkColor = getComputedStyle(link).color.trim();
    link.remove();
    return `
        :root {
            --ls-primary-text-color:${getComputedStyle(doc.querySelector('.cp__sidebar-main-content')!).color.trim()};
            --ls-primary-text-color-alt:${getComputedStyle(doc.querySelector('#left-sidebar .nav-header > div a span')!).color.trim()};
            --ls-link-text-color:${linkColor};
            --ls-primary-background-color:${getInheritedBackgroundColor(doc.querySelector('.cp__sidebar-main-content')).trim()};
            --ls-secondary-background-color:${getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim()};
        }
    `
}
