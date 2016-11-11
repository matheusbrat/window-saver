import React, {Component, PropTypes} from 'react';
import Tab from './Tab'

export default class Tabs extends Component {

    constructor(props, context) {
        super(props, context);
    }

    getTabs() {
        if (this.props.tabs != undefined) {
            return this.props.tabs
        }
        return [];
    }

    render() {
        var tabs = []
        for (var i = 0; i < this.getTabs().length; i++) {
            var tab = this.props.tabs[i];
            tabs.push(<Tab key={i} title={tab.title} img={tab.img} link={tab.link}/>);
        }
        return (
            <div>
                {tabs}
            </div>
        );
    }
}
