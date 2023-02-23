import { doc, globals } from '../globals/globals';

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

export const toggleHideDotProps = () => {
    if (globals.pluginConfig.hideDotProps) {
        hideProps();
    } else {
        hideDotPropsUnload();
    }
}

export const toggleHideSetOfProps = () => {
    if (globals.pluginConfig.hideSetOfProps) {
        hideProps();
    } else {
        hideSetOfPropsUnload();
    }
}

const hideDotPropsUnload = () => {
    const dotPropList = doc.querySelectorAll('.awPr-hideDotProp');
    if (dotPropList.length) {
        for (let i = 0; i < dotPropList.length; i++) {
            const dotProp = dotPropList[i];
            dotProp.classList.remove('hidden', 'awPr-hideDotProp');
        }
    }
}

const hideSetOfPropsUnload = () => {
    const setOfPropsList = doc.querySelectorAll('.awPr-hideSetOfProps');
    if (setOfPropsList.length) {
        for (let i = 0; i < setOfPropsList.length; i++) {
            const setOfPropsItem = setOfPropsList[i];
            setOfPropsItem.classList.remove('hidden', 'awPr-hideSetOfProps');
        }
    }
}

export const hideProps = async (propsKeysList?: HTMLElement[]) => {
    if (!globals.pluginConfig.hideDotProps && !globals.pluginConfig.hideSetOfProps) {
        return;
    }
    if (!propsKeysList) {
        propsKeysList = [... doc.querySelectorAll('#app-container .block-properties .page-property-key')] as HTMLElement[];
    }
    if (propsKeysList.length) {
        let hidePropsArr: string[] = [];
        if (globals.pluginConfig.hideSetOfProps) {
            hidePropsArr = (globals.pluginConfig.hideSetOfProps as string).trim().toLowerCase().replaceAll(' ', '').split(',');
        }
        for (let i = 0; i < propsKeysList.length; i++) {
            const propKeyItemText = propsKeysList[i].textContent;
            const propItem = propsKeysList[i].parentElement!.parentElement;
            if (propKeyItemText && propItem) {
                if (globals.pluginConfig.hideDotProps && propKeyItemText?.startsWith('.')) {
                    propItem.classList.add('hidden', 'awPr-hideDotProp');
                } else if (globals.pluginConfig.hideSetOfProps && hidePropsArr.includes(propKeyItemText)) {
                    propItem.classList.add('hidden', 'awPr-hideSetOfProps');
                } else {
                    propItem.classList.remove('hidden', 'awPr-hideSetOfProps');
                }
            }
        }
    }
    // const visiblePropsKeysList = [... doc.querySelectorAll('#app-container .block-properties')] as HTMLElement[];
};