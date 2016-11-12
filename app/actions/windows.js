import * as types from '../constants/ActionTypes';
import ChromePromise from 'chrome-promise';
import * as windowsHelpers from '../utils/windows';

function fetchParams(params) {
    return Object.assign({
        headers: {
            authorization: 'Token e46fbe6031dc5532ed9eb89b961abe3558a309b1',
            'content-type': 'application/json'
        }
    }, params)
}

export function fetchLocalWindows() {
    return {type: types.FETCH_LOCAL_WINDOWS}
}

export function fetchedLocalWindows(windows) {
    return {type: types.FETCHED_LOCAL_WINDOWS, windows: windows};
}

export function newLocalWindow(window) {
    return {type: types.NEW_LOCAL_WINDOW, window: window};
}

export function fetchRemoteWindows() {
    return {type: types.FETCH_REMOTE_WINDOWS};
}

export function fetchedRemoteWindows(windows) {
    return {type: types.FETCHED_REMOTE_WINDOWS, windows: windows};
}

export function saveWindow(window) {
    return {type: types.SAVE_WINDOW }
}

export function savedWindow(window) {
    return {type: types.SAVED_WINDOW, window: window}
}

export function deleteWindow(window) {
    return {type: types.DELETE_WINDOW, window: window}
}

export function deletedWindow(window) {
    return {type: types.DELETED_WINDOW, window: window}
}

export function updatedWindow(window) {
    return {type: types.UPDATED_WINDOW, window: window}
}

export function updateWindow(window) {
    return {type: types.UPDATE_WINDOW};
}

export function monitorWindow(window) {
    return {type: types.MONITOR_WINDOW, window: window};
}

export function monitoringWindow(window) {
    return {type: types.MONITORING_WINDOW, window: window}
}


// Services:

export function serviceFetchLocalWindows() {
    return dispatch => {
        dispatch(fetchLocalWindows());
        const chromep = new ChromePromise();
        chromep.windows.getAll({populate: true}).then((windows) => {
            windows = windowsHelpers.convertLocalWindows(windows);
            dispatch(fetchedLocalWindows(windows));
        });
    }
}

export function serviceFetchRemoteWindows() {
    return dispatch => {
        dispatch(fetchRemoteWindows());
        fetch('http://localhost:8000/api/v1/anydata/', fetchParams({
            query: { name: 'tabs' }
        })).then((response) => {
            return response.json()
        }).then((data) => {
            let convertedData = data.map(windowsHelpers.convertRemoteWindow);
            dispatch(fetchedRemoteWindows(convertedData));
        })
    }
}

export function serviceMonitorWindow(window) {
    return dispatch => {
        dispatch(monitorWindow(window));
        dispatch(monitoringWindow(window));
    }
}

export function serviceSaveWindow(window) {
    return dispatch => {
        dispatch(saveWindow(window));
        if (!window.remoteId) {
            fetch('http://localhost:8000/api/v1/anydata/', fetchParams({
                method: 'POST',
                body: JSON.stringify({
                    'name': 'tabs',
                    'key': window.localId,
                    'data': JSON.stringify(window)
                })
            })).then((response) => {
                return response.json();
            }).then((body) => {
                let window = windowsHelpers.convertRemoteWindow(body);
                dispatch(savedWindow(window));
            });
        } else {
            fetch(`http://localhost:8000/api/v1/anydata/${window.remoteId}/`, fetchParams({
                method: 'PUT',
                body: JSON.stringify({
                    'name': 'tabs',
                    'key': window.remoteId,
                    'data': JSON.stringify(window)
                })
            })).then((response) => {
                return response.json();
            }).then((body) => {
                let window = windowsHelpers.convertRemoteWindow(body);
                dispatch(updatedWindow(window));
            });
        }
    }
}

export function serviceDeleteWindow(window) {
    return dispatch => {
        dispatch(deleteWindow(window));
        if (window.remoteId) {
            fetch(`http://localhost:8000/api/v1/anydata/${window.remoteId}/`, fetchParams({
                method: 'DELETE'
            })).then((response) => {
                dispatch(deletedWindow(window));
            });
        }
    }
}