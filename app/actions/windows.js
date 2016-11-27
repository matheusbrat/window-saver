import * as types from '../constants/ActionTypes';
import ChromePromise from 'chrome-promise';
import * as windowsHelpers from '../utils/windows';


export function fetchLocalWindows() {
    return { type: types.FETCH_LOCAL_WINDOWS };
}

export function fetchedLocalWindows(windows) {
    return { type: types.FETCHED_LOCAL_WINDOWS, windows };
}

export function updatedWindow(window) {
    return { type: types.UPDATED_WINDOW, window };
}

export function monitorWindow(window) {
    return { type: types.MONITOR_WINDOW, window };
}

export function monitoringWindow(window) {
    return { type: types.MONITORING_WINDOW, window };
}

export function stopMonitoringWindow(window) {
    return { type: types.STOP_MONITORING_WINDOW, window };
}

// Services:

export function serviceFetchLocalWindows() {
    return dispatch => {
        dispatch(fetchLocalWindows());
        const chromep = new ChromePromise();
        chromep.windows.getAll({ populate: true }).then((windows) => {
            windows = windowsHelpers.convertLocalWindows(windows);
            dispatch(fetchedLocalWindows(windows));
        });
    };
}

export function serviceMonitorWindow(window) {
    return dispatch => {
        dispatch(monitorWindow(window));
        window.monitoring = true;
        dispatch(monitoringWindow(window));
    };
}
