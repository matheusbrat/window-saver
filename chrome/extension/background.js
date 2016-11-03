const bluebird = require('bluebird');
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
    list.forEach(api => bluebird.promisifyAll(obj[api], {promisifier}));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
    'tabs',
    'windows',
    'browserAction',
    'contextMenus'
]);
promisifyAll(chrome.storage, [
    'local',
]);

// chrome.windows.onCreated.addListener((window) => {
//     chrome.runtime.sendMessage((response) => {
//
//     });
// });

function convertLocalWindows(windows) {
    let processedWindows = []
    for (var x in windows) {
        let processedWindow = convertLocalWindow(windows[x]);
        processedWindows.push(processedWindow);
    }
    return processedWindows;
}

function convertLocalWindow(window) {
    let processedWindow = {localId: window.id, tabs: convertLocalTabs(window.tabs)};
    return processedWindow;
}

function convertLocalTabs(tabs) {
    let processedTabs = []
    for (var x in tabs) {
        let item = tabs[x];
        let processedTab = {
            img: item.favIconUrl ? item.favIconUrl : '',
            title: item.title,
            link: item.url
        };
        processedTabs.push(processedTab);
    }
    return processedTabs;
}

function tabAction(windowId, isWindowClosing=false) {
    console.log(windowId, isWindowClosing);
    chrome.storage.local.get((storage) => {
        let state = storage.state;
        if (Object.keys(state.windows.monitorWindows).includes(windowId.toString())) {
            console.log("Chegou aqui", isWindowClosing)
            if (isWindowClosing) {
                delete state.windows.monitorWindows[windowId];
                chrome.storage.local.set({state: state});
            } else {
                console.log("calling chrome.windows.get", windowId);
                chrome.windows.get(windowId, {populate: true}, (window) => {
                    if (window) {
                        let windowUpdated = convertLocalWindow(window);
                        state.windows.monitorWindows[windowId] = windowUpdated;
                    } else {
                        delete state.windows.monitorWindows[windowId];

                    }
                    chrome.storage.local.set({state: state});
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

// chrome.tabs.onReplaced.addListener((tab) => {
//     tabAction(tab.windowId);
// });


// chrome.runtime.onMessage.addListener(function(message, sender,  sendResponse) {
//     if (message.monitor) {
//         sendResponse(message.monitor);
//     }
//     // console.log("to recebendo message", message);
//     // if (message.monitor) {
//     //     chrome.storage.local.get('monitoring', (monitoring) => {
//     //         monitoring.push(message.monitor);
//     //         chrome.storage.local.set({ monitoring: monitoring })
//     //         chrome.tabs.onCreated.addListener((tab) => {
//     //             if (tab.windowId in monitoring) {
//     //                 chrome.
//     //             }
//     //         })
//     //     });
//     //
//     //     sendResponse(message.monitor);
//     // }
//     return true;
// });

// chrome.storage.local.get('state', (state) => {
//     if (state.windows && state.windows.localWindows) {
//         state.windows.localWindows.forEach((window) => {
//            if (window.monitoring) {
//                 // TODO: monitor window
//            }
//         });
//     }
// });



// chrome.windows.onCreated.addListener((window) => {
//     console.log(chrome.storage);
// });
