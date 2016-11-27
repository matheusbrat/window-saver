import React from 'react';
import Window from './Window';

export default class SyncWindow extends Window {

    constructor(props, context) {
        super(props, context);
    }

    changeTitle() {
        this.setState({ editing: true });
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
        this.setState({ editing: false });
    }

    stopMonitoring(window) {
        window.monitoring = false;
        window.name = undefined;
        this.props.wactions.stopMonitoringWindow(window);
        this.setState({ monitoring: false });
    }

    openWindow(window) {
        let links = window.tabs.map((tab) => {
            return tab.link;
        });
        let openConfig = {
            url: links,
            width: window.width,
            height: window.height,
            top: window.top,
            left: window.left
        };
        chrome.windows.create(openConfig);
    }

    buildMonitoringActions() {
        let actions = [];
        if (!this.state.monitoring) {
            actions.push(
                <a key="open" onClick={this.openWindow.bind(this, this.props.window)}>
                    <img className="action-image" src="img/open.png" />
                </a>
            );
        }
        actions.push(
            <a key="remove" onClick={this.stopMonitoring.bind(this, this.props.window)}>
                <img className="action-image" src="img/remove.png" />
            </a>
        );
        return actions;
    }

    buildTitle() {
        let title = <h3 onClick={this.changeTitle.bind(this)} className="title">{this.props.name}</h3>;
        if (this.state.editing) {
            title = (
                <input className="edit-name" defaultValue={this.props.name}
                  onBlur={this.changeTitleWithEvent.bind(this)} ref={input => input && input.focus()}
                  onKeyUp={this._handleKeyPressed.bind(this)}
                />);
        }
        return title;
    }

}
