// {
//     fetchingLocalWindows: false
//     fetchingRemoteWindows: false
//     localWindows: [
//
//     ]
//     remoteWindows: [
//         {
//             title: "Some Random Title",
//             windows: [
//                 {
//                     name: 'window name',
//                     tabs: [
//                         {
//                             alt: '',
//                             link: '',
//                             image: '',
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }
import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    fetchingLocalWindows: false,
    fetchingRemoteWindows: false,
    localWindows: [],
    remoteWindows: [],
    monitorWindows: {}
}

function cleanLocalWindows(monitorWindows, localWindows) {
    let cleanedLocalWindows = localWindows.filter((window) => {
        if (!Object.keys(monitorWindows).includes(window.localId.toString())) {
            return window;
        }
    });
    return cleanedLocalWindows;
}

export default function windows(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_LOCAL_WINDOWS:
            return Object.assign({}, state, {
                fetchingLocalWindows: true
            });

        case ActionTypes.NEW_LOCAL_WINDOW:
            var localWindows = Array().concat(state.localWindows, action.window);
            return Object.assign({}, state, {
                localWindows: localWindows
            });

        case ActionTypes.FETCHED_LOCAL_WINDOWS:
            return Object.assign({}, state, {
                localWindows: cleanLocalWindows(state.monitorWindows, action.windows)
            });

        case ActionTypes.FETCH_REMOTE_WINDOWS:
            return Object.assign({}, state, {
                fetchingRemoteWindows: true
            });

        case ActionTypes.FETCHED_REMOTE_WINDOWS:
            return Object.assign({}, state, {
                remoteWindows: action.windows,
                fetchingRemoteWindows: false,
            });

        case ActionTypes.SAVE_WINDOW:
            return state

        case ActionTypes.SAVED_WINDOW:
            var savedRemoteWindows = Array().concat(state.remoteWindows, action.window);
            return Object.assign({}, state, {
                remoteWindows: savedRemoteWindows
            });

        case ActionTypes.DELETE_WINDOW:
            return state;

        case ActionTypes.DELETED_WINDOW:
            var deletedRemoteWindow = Object.assign({}, state, {
                remoteWindows: state.remoteWindows.filter((window) => {
                    if (window.remoteId != action.window.remoteId) {
                        return window;
                    }
                })
            });
            
            return deletedRemoteWindow;

        case ActionTypes.UPDATE_WINDOW:
            return state;

        case ActionTypes.UPDATED_WINDOW:
            let index = state.remoteWindows.findIndex((window) => {
                console.log(window.remoteId == action.window.remoteId);
                return window.remoteId == action.window.remoteId;
            });
            return Object.assign({}, state,
                {
                    remoteWindows:
                        state.remoteWindows.slice(0, index)
                            .concat([
                                action.window
                            ])
                            .concat(state.remoteWindows.slice(index + 1))
                });

        case ActionTypes.MONITOR_WINDOW:
            return state;

        case ActionTypes.MONITORING_WINDOW:
            let monitorWindows = state.monitorWindows;
            monitorWindows[action.window.localId] = action.window;
            return Object.assign({}, state, {
                monitorWindows: monitorWindows,
                localWindows: cleanLocalWindows(monitorWindows, state.localWindows)
            });

        default:
            return state;

    }
}