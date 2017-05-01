import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('<Spinner />', () => {
    it('should return div with .loading', () => {
        const wrapper = shallow(<Spinner loading={true} />);
        expect(wrapper.find('.loading')).toHaveLength(1);
    });

    it('should return false when not loading', () => {
        const wrapper = shallow(<Spinner loading={false} />);
        expect(wrapper.find('.loading')).toHaveLength(0);
    });
})
