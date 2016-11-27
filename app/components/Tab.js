import React, { Component, PropTypes } from 'react';
import Style from 'react-inline-css';

export default class Tab extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let src = this.props.img ? this.props.img : 'img/tab.png';
        return (
            <Style stylesheet={TAB_STYLE}>
                <div className="tab">
                    <a href={this.props.link} title={this.props.title}>
                        <img url={this.props.link} src={src} className="icon" />
                    </a>
                </div>
            </Style>
        );
    }
}

const TAB_STYLE = `
& .tab {
    float: left;
}

& .icon {
    width: 16px;
    height: 16px;
    margin: 2px;
}
`;
