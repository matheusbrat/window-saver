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
                localWindows: action.windows
            });
        case ActionTypes.FETCH_REMOTE_WINDOWS:
            return Object.assign({}, state, {
                fetchingRemoteWindows: true
            });
        case ActionTypes.FETCHED_REMOTE_WINDOWS:
            return Object.assign({}, state, {
                remoteWindows: action.windows
            });
        case ActionTypes.SAVE_WINDOW:
            return state
        case ActionTypes.SAVED_WINDOW:
            let remoteWindows = Array().concat(state.remoteWindows, action.window);
            return Object.assign({}, state, {
                remoteWindows: remoteWindows
            });
        // case ActionTypes.UPDATE_WINDOW:
        //     remoteWindows = Array().concat(state.remoteWindows, action.window);
        //     return Object.assign({}, state, {
        //         remoteWindows: remoteWindows
        //     });
        default:
            return state;

    }
}