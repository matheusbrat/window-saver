import {expect} from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import windows from '../../../app/reducers/windows';

describe('todoapp windows reducer', () => {
    it('should handle initial state', () => {
        expect(
            windows(undefined, {})
        ).to.eql({
            fetchingLocalWindows: false,
            fetchingRemoteWindows: false,
            localWindows: [],
            remoteWindows: []
        });
    });

    it('should handle FETCH_LOCAL_WINDOWS', () => {
        expect(
            windows(undefined, {
                type: types.FETCH_LOCAL_WINDOWS,
            })
        ).to.eql({
            fetchingLocalWindows: true,
            fetchingRemoteWindows: false,
            localWindows: [],
            remoteWindows: []
        });
    });

    it('should handle FETCH_REMOTE_WINDOWS', () => {
        expect(
            windows(undefined, {
                type: types.FETCH_REMOTE_WINDOWS
            })
        ).to.eql({
            fetchingLocalWindows: false,
            fetchingRemoteWindows: true,
            localWindows: [],
            remoteWindows: []
        });
    });

    it('should handle FETCHED_LOCAL_WINDOWS', () => {
        expect(
            windows(undefined, {
                type: types.FETCHED_LOCAL_WINDOWS,
                windows: [{}]
            })
        ).to.eql({
            fetchingLocalWindows: false,
            fetchingRemoteWindows: false,
            localWindows: [{}],
            remoteWindows: []
        });
    });

    it('should handle FETCHED_REMOTE_WINDOWS', () => {
        expect(
            windows(undefined, {
                type: types.FETCHED_REMOTE_WINDOWS,
                windows: [{}]
            })
        ).to.eql({
            fetchingLocalWindows: false,
            fetchingRemoteWindows: false,
            localWindows: [],
            remoteWindows: [{}]
        });
    });
});
