import {expect} from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/windows';

describe('todoapp windows actions', () => {
    it('fetchLocalWindows should create FETCH_LOCAL_WINDOWS action', () => {
        expect(actions.fetchLocalWindows()).to.eql({
            type: types.FETCH_LOCAL_WINDOWS
        });
    });

    it('fetchedLocalWindows should create FETCHED_LOCAL_WINDOWS action', () => {
        expect(actions.fetchedLocalWindows([{}, {}])).to.eql({
            type: types.FETCHED_LOCAL_WINDOWS,
            windows: [{}, {}]
        });
    });

    it('fetchRemoteWindows should create FETCH_REMOTE_WINDOWS action', () => {
        expect(actions.fetchRemoteWindows()).to.eql({
            type: types.FETCH_REMOTE_WINDOWS
        });
    });

    it('fetchedRemoteWindows should create FETCHED_REMOTE_WINDOWS action', () => {
        expect(actions.fetchedRemoteWindows([{}, {}])).to.eql({
            type: types.FETCHED_REMOTE_WINDOWS,
            windows: [{}, {}]
        });
    });

});
