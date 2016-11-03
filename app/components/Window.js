import React, {Component, PropTypes} from 'react';
import Tabs from './Tabs'

export default class Window extends Component {

    static defaultProps = {
        name: "Press to set window name",
        disableClose:false
    }

    constructor(props, context) {
        super(props, context);
        this.state = {editing: false}
    }

    componentDidMount() {

    }

    componenWillUnmount() {

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
        alert('dadada')
        this.props.window.name = title;
        this.props.wactions.updatedWindow(this.props.window);
        this.setState({editing: false});
        this.saveWindow(this.props.window);
    }

    saveWindow(window) {
        this.props.wactions.serviceSaveWindow(window);
    }

    monitorWindow(window) {
        this.props.wactions.serviceMonitorWindow(window);
    }

    deleteWindow(window) {
        this.props.wactions.serviceDeleteWindow(window);
    }

    render() {
        console.log(this.props);
        let divStyle = {
            display: 'table',
            marginBottom: 10,
            width: '100%'
        };
        let h2Style = {
            marginTop: 0
        };
        let imgStyle = {
            width: 16,
            height: 16
        };
        let imgDivStyle = {
            float: 'right',
            marginTop: 2
        };

        let actions = [];
        if (!this.props.disableClose) {
            actions.push(<a key="remove" onClick={this.deleteWindow.bind(this, this.props.window)}><img style={imgStyle} src="img/remove.png"/></a>)
        }
        actions.push(<a key="save" onClick={this.monitorWindow.bind(this, this.props.window)}><img style={imgStyle}  src="img/save.png"/></a>)

        let title = <h2 onClick={this.changeTitle.bind(this)} style={h2Style}>{this.props.name}</h2>
        if (this.state.editing) {
            title = <input ref={input => input && input.focus()} onKeyUp={this._handleKeyPressed.bind(this)}/>
        }
        return (
            <div style={divStyle}>
                <div style={imgDivStyle}>
                    {actions}
                </div>
                { title }
                <Tabs tabs={this.props.window.tabs}/>
            </div>
        );
    }
}
