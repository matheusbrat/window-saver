import React, {Component, PropTypes} from 'react';
import Window from './Window'

export default class Windows extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        wactions: PropTypes.object.isRequired
    }

    static defaultProps = {
        windows: []
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        var windows = []
        for (var i = 0; i < this.props.windows.length; i++) {
            let window = this.props.windows[i];
            windows.push(<Window key={i} name={window.name} disableClose={this.props.disableClose} window={window} wactions={this.props.wactions}/>);
        }
        return (
            <div>
                <h2>{this.props.title}</h2>
                {windows}
            </div>
        );
    }
}
