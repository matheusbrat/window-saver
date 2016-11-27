const bluebird = require('bluebird');
const windowsHelpers = require('../../app/utils/windows.js');
import * as arrayHelpers from '../../app/utils/arrays';

global.Promise = bluebird;

function promisifier(method) {
    // return a function
    return function promisified(...args) {
        // which returns a promise
        return new Promise(resolve => {
            args.push(resolve);
            method.apply(this, args);
        });
    };
}

function promisifyAll(obj, list) {
    list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

promisifyAll(chrome, [
    'tabs',
    'windows',
    'browserAction',
    'contextMenus'
]);
promisifyAll(chrome.storage, [
    'local',
]);


function tabAction(windowId, isWindowClosing = false) {
    chrome.storage.local.get((storage) => {
        const state = storage.state;
        if (Object.keys(state.windows.monitorWindows).includes(windowId.toString())) {
            if (!isWindowClosing) {
                chrome.windows.get(windowId, { populate: true }, (window) => {
                    if (window) {
                        let windowUpdated = windowsHelpers.convertLocalWindow(window);
                        windowUpdated.monitoring = true;
                        windowUpdated.name = state.windows.monitorWindows[windowId].name;
                        state.windows.monitorWindows[windowId] = windowUpdated;
                    } else {
                        delete state.windows.monitorWindows[windowId];
                    }
                    chrome.storage.local.set({ state });
                });
            }
        }
    });
}

chrome.tabs.onCreated.addListener((tab) => {
    tabAction(tab.windowId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    tabAction(tab.windowId);
});

chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
    tabAction(moveInfo.windowId);
});

chrome.tabs.onDetached.addListener((tabId, detachInfo) => {
    tabAction(detachInfo.oldWindowId);
});

chrome.tabs.onAttached.addListener((tabId, attachInfo) => {
    tabAction(attachInfo.newWindowId);
});

chrome.tabs.onRemoved.addListener((tab, removeInfo) => {
    tabAction(removeInfo.windowId, removeInfo.isWindowClosing);
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}


chrome.windows.onCreated.addListener((windowCreated) => {
    chrome.windows.getAll((windows) => {
        let windowsIds = windows.map((window) => {
            return window.id;
        });
        chrome.storage.local.get((storage) => {
            chrome.windows.get(windowCreated.id, { populate: true }, (windowCreated) => {
                windowCreated = windowsHelpers.convertLocalWindow(windowCreated);
                Object.keys(storage.state.windows.monitorWindows).forEach((key) => {
                    let mWindow = storage.state.windows.monitorWindows[key];
                    if (!windowsIds.includes(mWindow.localId)) {
                        let windowCreatedTabsUrls = windowCreated.tabs.map((tab) => {
                            return tab.link;
                        });
                        let mWindowTabsUrls = mWindow.tabs.map((tab) => {
                            return tab.link;
                        });
                        if (arrayHelpers.sameMembers(windowCreatedTabsUrls, mWindowTabsUrls)) {
                            let clonedStorage = Object.assign({}, storage);
                            windowCreated.monitoring = true;
                            windowCreated.name = storage.state.windows.monitorWindows[key].name;
                            delete clonedStorage.state.windows.monitorWindows[key];
                            clonedStorage.state.windows.monitorWindows[windowCreated.localId] = windowCreated;
                            chrome.storage.local.set(clonedStorage);
                        }
                    }
                });
            });
        });
    });
});

chrome.windows.onRemoved.addListener((windowId) => {
    chrome.storage.local.get((storage) => {
        let removedWindow = storage.state.windows.monitorWindows[windowId];
        removedWindow.monitoring = false;
        delete storage.state.windows.monitorWindows[windowId];
        let newId = '_' + windowId;
        if (newId in Object.keys(storage.state.windows.monitorWindows)) {
            newId = '_' + guid();
        }
        removedWindow.localId = newId;
        storage.state.windows.monitorWindows[newId] = removedWindow;
        chrome.storage.local.set(storage);
    });
});
