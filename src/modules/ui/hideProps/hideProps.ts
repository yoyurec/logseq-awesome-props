import { doc, globals } from '../../globals/globals';

import { propsChangedObserverInit, propsChangedObserverRun, propsChangedObserverStop } from './propsObserver';

import './hideProps.css';

export const hidePropsLoad = async () => {
    hideProps();
    propsChangedObserverInit();
    propsChangedObserverRun();
    // Route listener
    logseq.App.onRouteChanged(() => {
        propsChangedObserverStop();
        setTimeout(() => {
            hideProps();
            propsChangedObserverRun();
        }, 100);
    });
}

export const hidePropsUnload = () => {
    hideDotPropsUnload();
    hideSetOfPropsUnload();
}

export const toggleHideDotPropsFeature = () => {
    if (globals.pluginConfig.featureHideDotProps) {
        hideProps();
    } else {
        hideDotPropsUnload();
    }
}

export const toggleHideSetOfPropsFeature = () => {
    if (globals.pluginConfig.featureHideSetOfProps) {
        hideProps();
    } else {
        hideSetOfPropsUnload();
    }
}

const hideDotPropsUnload = () => {
    const dotPropList = doc.querySelectorAll('.awUI-hideDotProp');
    if (dotPropList.length) {
        for (let i = 0; i < dotPropList.length; i++) {
            const dotProp = dotPropList[i];
            dotProp.classList.remove('hidden', 'awUI-hideDotProp');
        }
    }
}

const hideSetOfPropsUnload = () => {
    const setOfPropsList = doc.querySelectorAll('.awUI-hideSetOfProps');
    if (setOfPropsList.length) {
        for (let i = 0; i < setOfPropsList.length; i++) {
            const setOfPropsItem = setOfPropsList[i];
            setOfPropsItem.classList.remove('hidden', 'awUI-hideSetOfProps');
        }
    }
}

export const hideProps = async (propKeysList?: HTMLElement[]) => {
    if (!globals.pluginConfig.featureHideDotProps && !globals.pluginConfig.featureHideSetOfProps) {
        return;
    }
    if (!propKeysList) {
        propKeysList = [... doc.querySelectorAll('#app-container .block-properties .page-property-key')] as HTMLElement[];
    }
    if (propKeysList.length) {
        let hidePropsArr: string[] = [];
        if (globals.pluginConfig.featureHideSetOfProps) {
            hidePropsArr = (globals.pluginConfig.featureHideSetOfProps as string).trim().toLowerCase().replaceAll(', ', ',').split(',');
        }
        for (let i = 0; i < propKeysList.length; i++) {
            const propKeyItemText = propKeysList[i].textContent;
            const propItem = propKeysList[i].parentElement!.parentElement;
            if (propKeyItemText && propItem) {
                if (globals.pluginConfig.featureHideDotProps && propKeyItemText?.startsWith('.')) {
                    propItem.classList.add('hidden', 'awUI-hideDotProp');
                } else if (globals.pluginConfig.featureHideSetOfProps && hidePropsArr.includes(propKeyItemText)) {
                    propItem.classList.add('hidden', 'awUI-hideSetOfProps');
                } else {
                    propItem.classList.remove('hidden', 'awUI-hideSetOfProps');
                }
            }
        }
    }
};