import React from 'react';
import { shallow } from 'enzyme';
import ActionsBar from './ActionsBar';

describe('<ActionsBar />', () => {
    it('should have a div with .actions className', () => {
        const wrapper = shallow(<ActionsBar />);
        expect(wrapper.find('div.actions')).toHaveLength(1);
    });

    it('should receive and show children', () => {
        const wrapper = shallow(<ActionsBar><span>Test</span></ActionsBar>);
        expect(wrapper.find('span')).toHaveLength(1);
    });
})
