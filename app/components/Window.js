import React, {Component, PropTypes} from 'react';
import Tabs from './Tabs';
import Style from 'react-inline-css';

export default class Window extends Component {

    static defaultProps = {
        name: "Press to set window name",
        disableClose: false
    }

    constructor(props, context) {
        super(props, context);
        this.state = {editing: false, monitoring: this.props.monitoring}
    }

    changeTitle() {
        this.setState({editing: true});
    }

    _handleKeyPressed(e) {
        if (e.key === 'Enter') {
            this.changedTitle(e.target.value);
        }
    }

    changedTitle(title) {
        this.props.window.name = title;
        this.props.wactions.updatedWindow(this.props.window);
        this.setState({editing: false});
    }

    monitorWindow(window) {
        this.props.wactions.serviceMonitorWindow(window);
    }

    render() {
        let actions = [];
        // if (!this.props.disableClose) {
        //     actions.push(<a key="remove" onClick={this.deleteWindow.bind(this, this.props.window)}><img style={imgStyle} src="img/remove.png"/></a>)
        // }
        actions.push(<a key="save" onClick={this.monitorWindow.bind(this, this.props.window)}><img className="action-image"  src="img/save.png"/></a>)

        let title = <h2 onClick={this.changeTitle.bind(this)} className="title">{this.props.name}</h2>
        if (this.state.editing) {
            title = <input ref={input => input && input.focus()} onKeyUp={this._handleKeyPressed.bind(this)}/>
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
}

& .action-image {
    width: 16px;
    height: 16px;
}
`
