import * as types from '../constants/ActionTypes';
import ChromePromise from 'chrome-promise';

function convertRemoteWindow(body) {
    let data = JSON.parse(body.data);
    data['remoteId'] = body.id;
    return data;
}

function convertLocalWindows(windows) {
    let processedWindows = []
    for (var x in windows) {
        let item = windows[x];
        let processedWindow = {localId: item.id, tabs: convertLocalTabs(item.tabs)}
        processedWindows.push(processedWindow)
    }
    return processedWindows;
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

export function serviceFetchLocalWindows() {
    return dispatch => {
        dispatch(fetchLocalWindows())
        const chromep = new ChromePromise();
        return chromep.windows.getAll({populate: true}).then((windows) => {
            windows = convertLocalWindows(windows);
            dispatch(fetchedLocalWindows(windows));
        });
    }
}

export function fetchLocalWindows() {
    return {type: types.FETCH_LOCAL_WINDOWS}
    // let chromep = ChromePromise();
    // return dispatch => {
    //     dispatch({ type: types.FETCH_LOCAL_WINDOWS })
    //     return chromep.tabs.getAll().then((windows) => {
    //         dispatch(fetchLocalWindows(windows));
    //     })
    // }
    // return dispatch => {
    //     dispatch({ type: types.FETCH_LOCAL_WINDOWS })
    //     return fetch
    // }
}

export function fetchedLocalWindows(windows) {
    return {type: types.FETCHED_LOCAL_WINDOWS, windows: windows};
}

export function fetchRemoteWindows() {
    return {type: types.FETCH_REMOTE_WINDOWS};
}

export function fetchedRemoteWindows(windows) {
    return {type: types.FETCHED_REMOTE_WINDOWS, windows: windows};
}

export function saveWindow(window) {
    // return dispatch => {
    //     dispatch(saveWindow())
    //     const chromep = new ChromePromise();
    //     return chromep.windows.getAll({populate: true}).then((windows) => {
    //         // windows = convertLocalWindows(windows);
    //         dispatch(savedWindow(windows));
    //     });
    // }
    return dispatch => {
        fetch('http://localhost:8000/api/v1/anydata/', {
            headers: {
                authorization: 'Token e46fbe6031dc5532ed9eb89b961abe3558a309b1',
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'name': 'tabs',
                'key': window.localId,
                'data': JSON.stringify(window)
            })
        }).then((response) => {
            return response.json();
        }).then((body) => {
            let window = convertRemoteWindow(body);
            dispatch(savedWindow(window));
        });
    }
}

export function savedWindow(window) {
    return {type: types.SAVED_WINDOW, window: window}
}

export function updateWindow(window) {
    return {type: types.UPDATE_WINDOW}
}