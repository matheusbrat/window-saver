import React, {Component, PropTypes} from 'react';
import Tabs from './Tabs'

export default class Window extends Component {

    static defaultProps = {
        name: "Press to set window name",
        disableClose:false
    }

    constructor(props, context) {
        super(props, context);
    }

    saveWindow(window) {
        this.props.wactions.serviceSaveWindow(window);
    }

    deleteWindow(window) {
        this.props.wactions.serviceDeleteWindow(window);
    }

    render() {
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
            actions.push(<a onClick={this.deleteWindow.bind(this, this.props.window)}><img style={imgStyle} src="img/remove.png"/></a>)
        }
        actions.push(<a onClick={this.saveWindow.bind(this, this.props.window)}><img style={imgStyle}  src="img/save.png"/></a>)
        return (
            <div style={divStyle}>
                <div style={imgDivStyle}>
                    {actions}
                </div>
                <h2 style={h2Style}>{this.props.name}</h2>
                <Tabs tabs={this.props.window.tabs}/>
            </div>
        );
    }
}
