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
        key: 'pagePropsHeading',
        title: 'Page properties style',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'pagePropsLayout',
        title: '',
        description: 'Page props style',
        type: 'enum',
        enumPicker: 'radio',
        enumChoices: ['Grid', 'Flat'],
        default: 'Grid',
    },
    {
        key: 'pagePropsIcons',
        title: '',
        description: 'Enable page props icons?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'blocksPropsHeading',
        title: 'Block properties style',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'blockPropsLayout',
        title: '',
        description: 'Block props style',
        type: 'enum',
        enumPicker: 'radio',
        enumChoices: ['Grid', 'Flat'],
        default: 'Grid',
    },
    {
        key: 'blockPropsIcons',
        title: '',
        description: 'Enable block props icons?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'iconsHeading',
        title: 'Properties icons',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'iconsListHeadingInfo',
        title: 'Wanna suggest yours icons? Welcome to https://bit.ly/dicsocrdPropsThread OR create an issue on GitHub https://bit.ly/newPropIconRequest',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'iconsListHeading',
        title: 'Predefined icons. Translate properties names to yours, add new to existing... (comma separated, no spaces)',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'usersIconsHeading',
        title: 'User icons',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'iconsPropsPage',
        title: 'Page name with your custom icons config',
        description: 'Use props block with `prop:: iconCode` text. Get codes on https://tabler-icons.io. ⚠ Not all icons (lot of started with "f" code are missed) supported by Logseq (update is coming...)',
        type: 'string',
        default: 'awesome-props-icons',
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
