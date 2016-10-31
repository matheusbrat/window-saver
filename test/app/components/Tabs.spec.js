import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Tab from '../../../app/components/Tab';
import Tabs from '../../../app/components/Tabs';

function setup() {
    const props = {
        tabs: [
            {'alt': 'alternative text', 'img': 'img/icon-16.png', 'link': 'http://www.example.com'},
            {'alt': 'alternative text', 'img': 'img/icon-16.png', 'link': 'http://www.example.com'}
        ]
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Tabs {...props} />);
    const output = renderer.getRenderOutput();

    return {props, output, renderer};
}

describe('todoapp Tabs component', () => {
    it('should render correctly', () => {
        const {output} = setup();

        expect(output.type).to.equal('div');

        output.props.children.forEach(function (tab) {
            expect(tab.type).to.equal(Tab);
        });
    });
});
