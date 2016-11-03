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

chrome.runtime.onMessage.addListener(function(message, sender,  sendResponse) {
    console.log("to recebendo message", message);
    if (message.monitor) {
        chrome.storage.local.get('monitoring', (monitoring) => {
            monitoring.push(message.monitor);
            chrome.storage.local.set({ monitoring: monitoring })
            chrome.tabs.onCreated.addListener((tab) => {
                if (tab.windowId in monitoring) {
                    chrome.
                }
            })
        });

        sendResponse(message.monitor);
    }
    return true;
});

chrome.storage.local.get('state', (state) => {
    if (state.windows && state.windows.localWindows) {
        state.windows.localWindows.forEach((window) {
           if (window.monitoring) {
                // TODO: monitor window
           }
        });
    }
});



chrome.windows.onCreated.addListener((window) => {
    console.log(chrome.storage);
});
