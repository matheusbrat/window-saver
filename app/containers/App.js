import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Windows from '../components/Windows'
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import * as WindowsActions from '../actions/windows';
import style from './App.css';

@connect(
    state => state,
    dispatch => ({
        actions: bindActionCreators(TodoActions, dispatch),
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
                <Windows title="Current opened" windows={this.props.windows.localWindows} wactions={this.props.wactions}/>
                <Windows title="In the cloud" windows={this.props.windows.remoteWindows} wactions={this.props.wactions}/>
                <Header addTodo={actions.addTodo}/>
                <Windows title="" wactions=""/>
                <MainSection todos={todos} actions={actions}/>
            </div>
        );
    }
}


