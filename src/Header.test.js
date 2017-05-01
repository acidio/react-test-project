import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
    it('should return a div with .header className', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('.header')).toHaveLength(1);
    });

    it('should have a title into a h1 tag', () => {
        const wrapper = shallow(<Header title="Title test" />);
        expect(wrapper.find('h1')).toHaveLength(1);
        expect(wrapper.find('h1').text()).toBe('Title test');
    });

    it('should have a class show when show is true', () => {
        const wrapper = shallow(<Header show />);
        expect(wrapper.find('.show')).toHaveLength(1);
    });

    it('should not have a class show when show is false', () => {
        const wrapper = shallow(<Header show={false} />);
        expect(wrapper.find('.show')).toHaveLength(0);
    });
})
