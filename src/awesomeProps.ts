import '@logseq/libs';

import { pluginLoad } from './plugin/plugin';
import { settingsLoad } from './plugin/settings';

import './awesomeProps.css';

// Main logseq on ready
const main = async () => {
    console.log(`AwesomeProps: plugin loaded`);
    settingsLoad();
    pluginLoad();
};

logseq.ready(main).catch(null);
