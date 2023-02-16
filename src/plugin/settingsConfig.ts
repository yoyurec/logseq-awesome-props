import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

export const settingsConfig: SettingSchemaDesc[] = [
    {
        key: 'styleHeading',
        title: 'Properties style',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'iconProps',
        title: '',
        description: 'Enable predefined icons for props? (https://github.com/yoyurec/logseq-awesome-props#-properties-style)',
        type: 'boolean',
        default: true,
    },
    {
        key: 'hideHeading',
        title: 'Properties visibility',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'hideDotProps',
        title: '',
        description: 'Hide (in view mode) props started with dot (.propName)?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'hideSetOfProps',
        title: '',
        description: 'Hide own specific page props (comma separated). Delete to disable',
        type: 'string',
        default: 'propToHide,propAnother,color,hidetitle,banner',
    },
    {
        key: 'otherHeading',
        title: 'Other',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'pluginUpdateNotify',
        title: '',
        description: 'Enable new version notifier on app load?',
        type: 'boolean',
        default: true,
    },
];
