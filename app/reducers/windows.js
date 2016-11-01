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
    remoteWindows: []
}

export default function windows(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_LOCAL_WINDOWS:
            return Object.assign({}, state, {
                fetchingLocalWindows: true
            });

        case ActionTypes.FETCHED_LOCAL_WINDOWS:
            return Object.assign({}, state, {
                localWindows: action.windows,
                fetchingLocalWindows: false
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
            console.log(index);
            return Object.assign({}, state,
                {
                    remoteWindows:
                        state.remoteWindows.slice(0, index)
                            .concat([
                                action.window
                            ])
                            .concat(state.remoteWindows.slice(index + 1))
                })

        default:
            return state;

    }
}