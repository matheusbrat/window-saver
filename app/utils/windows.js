
export function convertLocalWindows(windows) {
    let processedWindows = [];
    for (var x in windows) {
        let processedWindow = convertLocalWindow(windows[x]);
        processedWindows.push(processedWindow);
    }
    return processedWindows;
}

export function convertLocalWindow(window) {
    let processedWindow = { localId: window.id, tabs: convertLocalTabs(window.tabs) };
    processedWindow.width = window.width;
    processedWindow.height = window.height;
    processedWindow.top = window.top;
    processedWindow.left = window.left;
    return processedWindow;
}

export function convertLocalTabs(tabs) {
    let processedTabs = [];
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
