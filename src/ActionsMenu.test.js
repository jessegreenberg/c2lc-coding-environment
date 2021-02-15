// @flow

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ActionsMenu from './ActionsMenu';
import ActionsMenuItem from './ActionsMenuItem';
import ActionsMenuToggle from './ActionsMenuToggle';

import messages from './messages.json';

configure({ adapter: new Adapter()});

const mockAllowedActions = {
    "forward1": true,
    "forward2": true,
    "forward3": true,
    "left45": true,
    "left90": true,
    "left180": true,
    "right45": true,
    "right90": true,
    "right180": true
};

function createActionsMenu(props) {
    const mockChangeHandler = jest.fn();

    const wrapper = mount(
        React.createElement(
            ActionsMenu,
            Object.assign(
                {
                    editingDisabled: false,
                    allowedActions: mockAllowedActions,
                    onChange: mockChangeHandler
                },
                props
            )
        ),
        {
            wrappingComponent: IntlProvider,
            wrappingComponentProps: {
                locale: 'en',
                defaultLocale: 'en',
                messages: messages.en
            }
        }
    );

    return {
        wrapper,
        mockChangeHandler
    };
};

it('Renders withhout crashing.', () => {
    createActionsMenu();
});

it("Can be toggled open.", () => {
    const { wrapper } = createActionsMenu();
    const actionsMenu = wrapper.children().at(0);

    const actionsMenuToggle = actionsMenu.find(ActionsMenuToggle);
    actionsMenuToggle.simulate("click");

    expect(actionsMenu.state("showMenu")).toBe(true);

    const actionMenuItems = wrapper.find(ActionsMenuItem);
    expect(actionMenuItems.length).toBe(9);
});

it("Cannot be toggled open when editing is disabled.", () => {
    const { wrapper } = createActionsMenu({ editingDisabled: true });
    const actionsMenu = wrapper.children().at(0);
    const actionsMenuToggle = wrapper.find(ActionsMenuToggle);

    actionsMenuToggle.simulate("click");

    expect(actionsMenu.state("showMenu")).toBe(false);

    const actionMenuItems = wrapper.find(ActionsMenuItem);
    expect(actionMenuItems.length).toBe(0);
});
