import React, {Component, PropTypes} from 'react';
import Tabs from './Tabs';
import Style from 'react-inline-css';

export default class Window extends Component {

    static defaultProps = {
        name: "Press to set window name",
    }

    constructor(props, context) {
        super(props, context);
        this.state = {editing: false, monitoring: this.props.window.monitoring}
    }

    monitorWindow(window) {
        this.props.wactions.serviceMonitorWindow(window);
        this.setState({monitoring: true});
    }

    buildMonitoringActions() {
        let actions = [];
        actions.push(<a key="save" onClick={this.monitorWindow.bind(this, this.props.window)}><img className="action-image"  src="img/save.png"/></a>)
        return actions
    }

    buildTitle() {
        let title = <h3 className="title">{this.props.name}</h3>
        return title
    }

    render() {
        let title = this.buildTitle();
        let actions;
        actions = this.buildMonitoringActions();

        return (
            <Style stylesheet={WINDOW_STYLE}>
                <div className="window">
                    <div className="actions">
                        {actions}
                    </div>
                    { title }
                    <Tabs tabs={this.props.window.tabs}/>
                </div>
            </Style>
        );
    }
}

const WINDOW_STYLE = `
& .window {
    display: table;
    margin-bottom: 10px;
    width: 100%;
}

& .title {
    margin-top: 0px;
}

& .actions {
    float: right;
    margin-top: 2px;
    margin-right: 5px;
}

& .action-image {
    width: 16px;
    height: 16px;
}

& .edit-name {
    border-color: #FFFFFF;
}
`
