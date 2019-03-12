import { createSwitchNavigator } from 'react-navigation'
import React, { Component } from 'react';

const AppNavigator = createSwitchNavigator(
    {
        splash: {
            getScreen: () => require('./SplashScreen').default,
        },
        auth: {
            getScreen: () => require('./LoginScreen').default,
        },
        hello: {
            getScreen: () => require('./Hello').default,
        },
    },
    {
        initialRouteName: 'splash',
    },
);
class Navigation extends Component {
    render() {
        return (
            <AppNavigator />
        );
    }
}

export default Navigation;