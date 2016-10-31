import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Windows from '../components/Windows'
import style from './App.css';
import * as WindowsActions from '../actions/windows';

@connect(
    state => state,
    dispatch => ({
        wactions: bindActionCreators(WindowsActions, dispatch)
    })
)
export default class App extends Component {

    static propTypes = {
        todos: PropTypes.array.isRequired,
        windows: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        wactions: PropTypes.object.isRequired
    };

    static defaultProps = {
        windows: {'windows': []}
    }

    componentWillMount() {
        this.props.wactions.serviceFetchLocalWindows();
        this.props.wactions.serviceFetchRemoteWindows();
    }

    render() {
        const {windows, todos, actions, wactions} = this.props;
        // let localWindows = windows.windows.filter((window) => {
        //     if (window.localId) {
        //         return window;
        //     }
        // });
        // let remoteWindows = windows.windows.filter((window) => {
        //     if (window.remoteId) {
        //         return window;
        //     }
        // });
        return (
            <div className={style.normal}>
                <Windows title="Current opened"
                         windows={this.props.windows.localWindows}
                         wactions={this.props.wactions}
                         disableClose="1"
                />
                <Windows title="In the cloud"
                         windows={this.props.windows.remoteWindows}
                         wactions={this.props.wactions} />
            </div>
        );
    }
}


