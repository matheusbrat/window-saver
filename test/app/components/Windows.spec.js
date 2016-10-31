import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Window from '../../../app/components/Window';
import Windows from '../../../app/components/Windows';


function setup() {
    const props = {
        title: 'Title',
        windows: [
            {'alt': 'alternative text', 'img': 'img/icon-16.png', 'link': 'http://www.example.com'},
            {'alt': 'alternative text', 'img': 'img/icon-16.png', 'link': 'http://www.example.com'}
        ]
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Windows {...props} />);
    const output = renderer.getRenderOutput();

    return {props, output, renderer};
}

describe('todoapp Windows component', () => {
    it('should render correctly', () => {
        const {props, output, renderer} = setup();

        expect(output.type).to.equal('div');
        console.log(output.props.children)
        const [h2, windows] = output.props.children;
        expect(h2.type).to.equal('h2');
        expect(h2.props.children).to.equal(props.title);
        windows.forEach(function (window) {
            expect(window.type).to.equal(Window);
        });
    });
});
