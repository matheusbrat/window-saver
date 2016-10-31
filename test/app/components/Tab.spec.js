import {expect} from 'chai';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Tab from '../../../app/components/Tab';

function setup() {
    const props = {
        link: 'http://www.example.com',
        alt: 'alternative text',
        img: 'img/icon-16.png'
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Tab {...props} />);
    const output = renderer.getRenderOutput();

    return {props, output, renderer};
}

describe('todoapp Tab component', () => {
    it('should render correctly', () => {
        const {output} = setup();

        expect(output.type).to.equal('div');

        const a = output.props.children;

        expect(a.type).to.equal('a');
        expect(a.props.children.type).to.equal('img');
    });
});
