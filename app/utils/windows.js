
export function convertLocalWindows(windows) {
    let processedWindows = []
    for (var x in windows) {
        let processedWindow = convertLocalWindow(windows[x]);
        processedWindows.push(processedWindow);
    }
    return processedWindows;
}

export function convertLocalWindow(window) {
    let processedWindow = {localId: window.id, tabs: convertLocalTabs(window.tabs)};
    return processedWindow;
}

export function convertLocalTabs(tabs) {
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