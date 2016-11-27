import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Windows from '../components/Windows';
import SyncWindow from '../components/SyncWindow';
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
    }

    render() {
        const {windows, todos, actions, wactions} = this.props;

        let monitoringWindows = Object.values(this.props.windows.monitorWindows);
        return (
            <Style stylesheet={APP_STYLE}>
                <div className="normal">
                    <Windows title="Syncing"
                             windows={monitoringWindows}
                             wactions={this.props.wactions}
                             windowType={SyncWindow}
                    />
                    <hr className="separator"/>
                    <Windows title="Opened"
                             windows={this.props.windows.localWindows}
                             wactions={this.props.wactions}
                    />
                </div>
            </Style>
        );
    }
}

const APP_STYLE = `
& .normal {
    background: #fff;
}
& .separator {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #000;
    margin: 1em 0;
    padding: 0; 
}

h2 {
    font-size: 16px;
    font-weight: bold;
}

h3 {
    font-size: 14px;
    font-weight: bold;
}
`
