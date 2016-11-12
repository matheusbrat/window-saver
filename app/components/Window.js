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

    changeTitle() {
        this.setState({editing: true});
    }

    _handleKeyPressed(e) {
        if (e.key === 'Enter') {
            this.changeTitleWithEvent(e);
        }
    }

    changeTitleWithEvent(e) {
        this.changedTitle(e.target.value);
    }

    changedTitle(title) {
        this.props.window.name = title;
        this.props.wactions.updatedWindow(this.props.window);
        this.setState({editing: false});
    }

    monitorWindow(window) {
        this.props.wactions.serviceMonitorWindow(window);
        this.setState({monitoring: true});
    }

    stopMonitoring(window) {
        window.monitoring = false;
        this.props.wactions.stopMonitoringWindow(window);
        this.setState({monitoring: false});
    }

    render() {

        let actions = [];
        let title = <h3 className="title">{this.props.name}</h3>
        if (this.state.monitoring) {
            actions.push(<a key="remove" onClick={this.stopMonitoring.bind(this, this.props.window)}><img className="action-image" src="img/remove.png"/></a>)
            title = <h3 onClick={this.changeTitle.bind(this)} className="title">{this.props.name}</h3>
            if (this.state.editing) {
                title = <input className="edit-name" defaultValue={this.props.name} onBlur={this.changeTitleWithEvent.bind(this)} ref={input => input && input.focus()} onKeyUp={this._handleKeyPressed.bind(this)}/>
            }
        }
        if (!this.state.monitoring) {
            actions.push(<a key="save" onClick={this.monitorWindow.bind(this, this.props.window)}><img className="action-image"  src="img/save.png"/></a>)

        }

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
