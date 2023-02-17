import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';

export const settingsConfig: SettingSchemaDesc[] = [
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
        key: 'iconsHeading',
        title: 'Properties icons',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'iconProps',
        title: 'Enable icons for props?',
        description: 'Wanna suggest yours? Welcome to https://bit.ly/dicsocrdPropsThread OR create an issue on GitHub https://bit.ly/newPropIconRequest',
        type: 'boolean',
        default: true,
    },
    {
        key: 'iconsListHeading',
        title: 'Icons list. Change/translate properties names to yours (comma separated, no spaces)',
        description: '',
        type: 'heading',
        default: null,
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
