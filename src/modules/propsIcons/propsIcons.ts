import { doc, body, globals } from '../globals/globals';

import predefinedIconsListJSON from '../../plugin/predefinedIcons.json';
import propsIconsStyles from './propsIcons.css?inline';

import { toKebabCase } from '../../utils/utils';

type iconRecord = {
    [key: string]: string;
}

export const toggleBlockPropsIcons = () => {
    if (globals.pluginConfig.blockPropsIcons) {
        body.dataset.awprBlockPropsIcons = '';
    } else {
        delete body.dataset.awprBlockPropsIcons;
    }
}

export const togglePagePropsIcons = () => {
    if (globals.pluginConfig.pagePropsIcons) {
        body.dataset.awprPagePropsIcons = '';
    } else {
        delete body.dataset.awprPagePropsIcons;
    }
}

export const propsIconsLoad = async () => {
    toggleBlockPropsIcons();
    togglePagePropsIcons();
    injectPropsIconsCSS();
    renderPredefinedPropsList();
}

export const propsIconsUnload = () => {
    ejectPropsIconsCSS();
}

export const injectPropsIconsCSS = async () => {
    logseq.provideStyle({ key: 'awPr-propsIcons-css', style: propsIconsStyles });
    logseq.provideStyle({ key: 'awPr-predefinedIconsList-css', style: generatePropsListCSS(predefinedIconsListJSON) });
    logseq.provideStyle({ key: 'awPr-userPropsList-css', style: generatePropsListCSS(getUsersProps()) });
    logseq.provideStyle({ key: 'awPr-userIconsList-css', style: generateUserPropsListCSS(await getUserIconsList()) });
}

export const ejectPropsIconsCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-propsIcons-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-predefinedIconsList-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-userPropsList-css"]')?.remove();
    doc.head.querySelector('style[data-injected-style^="awPr-userIconsList-css"]')?.remove();
}

export const refreshUserPropsListCSS = () => {
    doc.head.querySelector('style[data-injected-style^="awPr-userPropsList-css"]')?.remove();
    logseq.provideStyle({ key: 'awPr-userPropsList-css', style: generatePropsListCSS(getUsersProps()) });
}
export const refreshUserIconsListCSS = async () => {
    doc.head.querySelector('style[data-injected-style^="awPr-userIconsList-css"]')?.remove();
    logseq.provideStyle({ key: 'awPr-userIconsList-css', style: generateUserPropsListCSS(await getUserIconsList()) });
}

const generatePropsList = (iconsRecordsObject: iconRecord): string => {
    const propsObj:iconRecord = revertIconsRecords(iconsRecordsObject);
    return Object.keys(propsObj).reduce((list, prop) => {
        return list + `  ${prop}:: ${propsObj[prop]}\n`;
    },``);
}

const generatePropsListCSS = (iconsRecordsObject: iconRecord): string => {
    const propsObj:iconRecord = revertIconsRecords(iconsRecordsObject);
    return Object.keys(propsObj).reduce((css, prop) => {
        return css + generatePropItemCSS(prop, propsObj[prop]);
    },'');
}

const generateUserPropsListCSS = (iconsRecordsObject: iconRecord): string => {
    return Object.keys(iconsRecordsObject).reduce((css, prop) => {
        return css + generateUserPropItemCSS(prop, iconsRecordsObject[prop]);
    },'');
}

const getUsersProps = () => {
    return Object.keys(globals.pluginConfig)
        .filter((settingsKey: string) => settingsKey.startsWith('userIcon-'))
        .reduce((obj, key) => {
            const propsNames = globals.pluginConfig[key];
            if (!propsNames) {
                return obj;
            }
            const iconCode = key.replace('userIcon-', '');
            return Object.assign(obj, {
                [iconCode]: globals.pluginConfig[key].replaceAll(' ', '')
            });
        }, {});
}

const revertIconsRecords = (iconsRecordsObject: iconRecord) => {
    // { icon: prop1, prop2 } -> { prop1: icon, prop2: icon }
    return Object.keys(iconsRecordsObject).reduce((allAccObj, icon) => {
        const propsObj = iconsRecordsObject[icon].split(',').reduce((accObj, prop) => {
            return Object.assign(accObj, {
                [prop]: icon
            });
        },{});
        return Object.assign(allAccObj, propsObj);
    },{});
}

export const getUserIconsList = async (): Promise<iconRecord> => {
    const iconsPropsPageContent = await logseq.Editor.getPage((globals.pluginConfig.iconsPropsPage as string).toLowerCase());
    if (iconsPropsPageContent) {
        const iconsPropsPageConfig = iconsPropsPageContent.properties as iconRecord;
        if (iconsPropsPageConfig && Object.keys(iconsPropsPageConfig).length !== 0) {
            return Object.keys(iconsPropsPageConfig)
                .filter((propName: string) => (
                    iconsPropsPageConfig[propName].length == 4
                    && (iconsPropsPageConfig[propName].startsWith('e') || iconsPropsPageConfig[propName].startsWith('f')))
                )
                .reduce((obj, propName) => {
                    return Object.assign(obj, {
                        [toKebabCase(propName)]: iconsPropsPageConfig[propName]
                    });
                }, {});
        }
    }
    return {};
}

const generatePropItemCSS = (propName: string, iconCode: string) => {
    return `
    body[data-awpr-page-props-icons] .block-properties.page-properties .page-property-key[data-ref="${propName}"]::before,
    .block-properties.page-properties[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before,
    body[data-awpr-block-props-icons] .block-properties:not(.page-properties) .page-property-key[data-ref="${propName}"]::before,
    .block-properties:not(.page-properties)[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before {
        content: "\\${iconCode}" !important;
    }
    [data-awpr-icon="${propName}"]::before {
        content: "\\${iconCode}";
    }
    .desc-item[data-key="userIcon-${iconCode}"] .form-control::before {
        content: "\\${iconCode}" !important;
    }
    `;
}
const generateUserPropItemCSS = (propName: string, iconCode: string) => {
    return `
    body[data-awpr-page-props-icons] .block-properties.page-properties .page-property-key[data-ref="${propName}"]::before,
    .block-properties.page-properties[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before,
    body[data-awpr-block-props-icons] .block-properties:not(.page-properties) .page-property-key[data-ref="${propName}"]::before,
    .block-properties:not(.page-properties)[data-awpr-page-props-icons] .page-property-key[data-ref="${propName}"]::before {
        content: "\\${iconCode}" !important;
    }
    [data-awpr-icon="${propName}"]::before {
        content: "\\${iconCode}";
    }
    `;
}

export const insertPropsListBlock = async (event: HTMLElement) => {
    const predefinedProps: iconRecord = predefinedIconsListJSON;
    const userProps: iconRecord = getUsersProps();
    const blockUUID = event.dataset.blockUuid as string;
    Object.keys(userProps).forEach(key => {
        predefinedProps[key] = predefinedProps[key] + ',' + userProps[key];
    });
    const propsObj: iconRecord = revertIconsRecords(predefinedProps);
    const propsList = Object.keys(propsObj).reduce((list, prop) => {
        return list + `  ${prop}::  ${propsObj[prop]}\n`;
    },'  .awpr-layout-grid:: true\n');
    await logseq.Editor.insertBlock(blockUUID, propsList);
}

const renderPredefinedPropsList = async () => {
    logseq.provideModel({
        insertPropsListBlock: insertPropsListBlock,
    });

    logseq.Editor.registerSlashCommand('AwesomeProps: insert list generator button', async () => {
        await logseq.Editor.insertAtEditingCursor(
            `{{renderer :awpr-props-list}} `,
        );
    })

    logseq.App.onMacroRendererSlotted(({ slot, payload }) => {
        const awPrRenderKey = 'awpr-props-list';
        const [type] = payload.arguments
        if (!type?.startsWith(`:${awPrRenderKey}`)) {
            return
        }
        return logseq.provideUI({
            key: awPrRenderKey,
            slot,
            reset: true,
            template: `<button class="button" style="display: flex; align-items: center; border: 1px solid var(--ls-border-color);" data-block-uuid="${payload.uuid}" data-on-click="insertPropsListBlock"><i style="width: 1em;">${globals.pluginSVGIcon}</i> Insert props list from settings (predefined + your overrides)</button>`
        });
    });
}
