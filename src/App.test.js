import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
    it('should have a header', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.render().find('.header')).toHaveLength(1);
    });
})
