import { doc } from '../../globals/globals';
import { hideProps } from './hideProps';

let propsChangedObserverConfig: MutationObserverInit;
let propsChangedObserver: MutationObserver;

export const propsChangedObserverInit = () => {
    propsChangedObserverConfig = {
        childList: true,
        subtree: true,
    };
    propsChangedObserver = new MutationObserver(propsChangedCallback);
};

const propsChangedCallback: MutationCallback = function (mutationsList) {
    for (let i = 0; i < mutationsList.length; i++) {
        const mutationItem = mutationsList[i];
        const addedNode = mutationItem.addedNodes[0] as HTMLElement;
        if (addedNode && addedNode.childNodes.length) {
            const propKeysList = [... addedNode.querySelectorAll('.block-properties .page-property-key')] as HTMLElement[];
            if (propKeysList.length) {
                hideProps(propKeysList);
            }
        }
    }
};

export const propsChangedObserverRun = () => {
    propsChangedObserver.observe(doc.getElementById('app-container') as Element, propsChangedObserverConfig);
};

export const propsChangedObserverStop = () => {
    propsChangedObserver.disconnect();
};
