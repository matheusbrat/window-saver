import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Windows from '../components/Windows';
import * as WindowsActions from '../actions/windows';
import Style from 'react-inline-css';

@connect(
    state => state,
    dispatch => ({
        wactions: bindActionCreators(WindowsActions, dispatch)
    })
)

export default class App extends Component {

    static propTypes = {
        windows: PropTypes.object.isRequired,
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

        let monitoringWindows = Object.values(this.props.windows.monitorWindows);
        return (
            <Style stylesheet={APP_STYLE}>
                <div className="normal">
                    <Windows title="Monitoring"
                             windows={monitoringWindows}
                             wactions={this.props.wactions}
                             disableClose="1"
                    />
                    <Windows title="Opened"
                             windows={this.props.windows.localWindows}
                             wactions={this.props.wactions} />
                </div>
            </Style>
        );
    }
}

const APP_STYLE = `
& .normal {
    background: #fff;
}`
