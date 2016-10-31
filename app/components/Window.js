import React, {Component, PropTypes} from 'react';
import Tabs from './Tabs'

export default class Window extends Component {

    static defaultProps = {
        name: "Press to set window name"
    }

    constructor(props, context) {
        super(props, context);
    }

    saveWindow(window) {
        this.props.wactions.saveWindow(window);
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
        return (
            <div style={divStyle}>
                <div style={imgDivStyle}>
                    <a onClick={this.saveWindow.bind(this, this.props.window)}><img style={imgStyle}
                                                                                    src="img/remove.png"/></a>
                    <a onClick={this.saveWindow.bind(this, this.props.window)}><img style={imgStyle}
                                                                                    src="img/save.png"/></a>
                </div>
                <h2 style={h2Style}>{this.props.name}</h2>
                <Tabs tabs={this.props.window.tabs}/>
            </div>
        );
    }
}
