import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    fetchingLocalWindows: false,
    localWindows: [],
    remoteWindows: [],
    monitorWindows: {}
};

function cleanLocalWindows(monitorWindows, localWindows) {
    let cleanedLocalWindows = localWindows.filter((window) => {
        if (!Object.keys(monitorWindows).includes(window.localId.toString())) {
            return window;
        }
        return;
    });
    return cleanedLocalWindows;
}

export default function windows(state = initialState, action) {
    let monitorWindows;
    switch (action.type) {
        case ActionTypes.FETCH_LOCAL_WINDOWS:
            return Object.assign({}, state, {
                fetchingLocalWindows: true
            });

        case ActionTypes.FETCHED_LOCAL_WINDOWS:
            return Object.assign({}, state, {
                localWindows: cleanLocalWindows(state.monitorWindows, action.windows)
            });

        case ActionTypes.UPDATE_WINDOW:
            return state;

        case ActionTypes.MONITOR_WINDOW:
            return state;

        case ActionTypes.STOP_MONITORING_WINDOW:
            monitorWindows = state.monitorWindows;
            let localWindows = state.localWindows;
            localWindows.push(monitorWindows[action.window.localId]);
            delete monitorWindows[action.window.localId];
            return Object.assign({}, state, {
                monitorWindows,
                localWindows: cleanLocalWindows(monitorWindows, localWindows)
            });

        case ActionTypes.UPDATED_WINDOW:
        case ActionTypes.MONITORING_WINDOW:
            monitorWindows = state.monitorWindows;
            monitorWindows[action.window.localId] = action.window;
            return Object.assign({}, state, {
                monitorWindows,
                localWindows: cleanLocalWindows(monitorWindows, state.localWindows)
            });

        default:
            return state;
    }
}
