import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Tabs from '../../../app/components/Tabs';
import Window from '../../../app/components/Window';

function setup(propOverrides) {
    const props = {
        name: "my current name",
        tabs: [
            {'alt': 'alternative text', 'img': 'img/icon-16.png', 'link': 'http://www.example.com'},
            {'alt': 'alternative text', 'img': 'img/icon-16.png', 'link': 'http://www.example.com'}
        ],
        ...propOverrides
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Window {...props} />);
    const output = renderer.getRenderOutput();

    return {props, output, renderer};
}

describe('todoapp Window component', () => {
    it('should render correctly', () => {
        const {props, output, renderer} = setup();

        expect(output.type).to.equal('div');

        const [h2, tabs] = output.props.children;
        expect(h2.type).to.equal('h2');
        expect(h2.props.children).to.equal(props.name);

        expect(tabs.type).to.equal(Tabs);

    });

    it('should have default name', () => {
        const {props, output, renderer} = setup({name: undefined});

        expect(output.type).to.equal('div');

        const [h2, tabs] = output.props.children;
        expect(h2.type).to.equal('h2');
        expect(h2.props.children).to.equal(Window.defaultProps.name);

        expect(tabs.type).to.equal(Tabs);

    });
});
