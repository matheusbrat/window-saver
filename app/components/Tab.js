import React, {Component, PropTypes} from 'react';

export default class Tab extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let tabStyle = {
            float: 'left'
        };
        let imgStyle = {
            width: 16,
            height: 16,
            margin: 2
        };
        let src = this.props.img ? this.props.img : 'img/tab.png';
        return (
            <div style={tabStyle}>
                <a href={this.props.link} title={this.props.title}><img url={this.props.link} src={src}
                                                                        style={imgStyle}/></a>
            </div>
        );
    }
}
