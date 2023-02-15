import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import { globals } from '../modules/globals/globals';

export const settingsConfig: SettingSchemaDesc[] = [
    {
        key: 'styleHeading',
        title: 'Properties style',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'featureAwesomeProps',
        title: '',
        description: 'Enable predefined icons for props? (https://github.com/yoyurec/logseq-awesome-props#-page-properties)',
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
        key: 'featureHideDotProps',
        title: '',
        description: 'Hide (in view mode) props started with dot (.propName)?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureHideSetOfProps',
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
        key: 'featureUpdaterEnabled',
        title: '',
        description: 'Enable new version notifier on app load?',
        type: 'boolean',
        default: true,
    },
];
