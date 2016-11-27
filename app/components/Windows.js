import React, { Component, PropTypes } from 'react';
import Window from './Window';
import Style from 'react-inline-css';

export default class Windows extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        wactions: PropTypes.object.isRequired,
        windowType: PropTypes.any.isRequired
    }

    static defaultProps = {
        windows: [],
        windowType: Window
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        var windows = [];
        for (var i = 0; i < this.props.windows.length; i++) {
            let window = this.props.windows[i];
            windows.push(<this.props.windowType key={i} name={window.name} window={window} wactions={this.props.wactions} />);
        }
        return (
            <Style stylesheet={WINDOWS_STYLE}>
                <div>
                    <h2 className="window-title">{this.props.title}</h2>
                    {windows}
                </div>
            </Style>
        );
    }
}

const WINDOWS_STYLE = `
& .window-title {
    text-align: center;
}
`;
