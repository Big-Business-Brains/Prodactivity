import React from 'react';
import { Button, Alert } from 'react-native';
import HomePage from '../../components/pages/HomePage';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AddRoutinePage from '../../components/pages/AddRoutinePage';
import LoginPage from '../../components/pages/LoginPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from '../../components/pages/ProfilePage';

/** @returns {JSX.Element} The navigation stack for the tab view */
const Tab = createBottomTabNavigator();
export const TabStackNavigator = ({ route, navigation }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomePage"
                component={HomeStackScreen}
                initialParams={{ updateUserId: route.params.updateUserId }}
            />
            <Tab.Screen
                name="Adventures"
                component={HomeStackScreen}
                initialParams={{ updateUserId: route.params.updateUserId }}
            />
        </Tab.Navigator>
    );
};

const HomeStack = createStackNavigator();
export const HomeStackScreen = ({ route, navigation }): JSX.Element => {
    return (
        <HomeStack.Navigator mode="modal">
            <HomeStack.Screen
                name="HomePage"
                component={HomePage}
                options={() => ({
                    headerLeft: () => <Button onPress={() => navigation.navigate('ProfilePage')} title="Profile" />,
                    headerRight: () => <Button onPress={() => navigation.navigate('AddRoutinePage')} title="+" />,
                })}
            />
            <HomeStack.Screen
                name="AddRoutinePage"
                component={AddRoutinePage}
                options={{
                    ...TransitionPresets.ModalPresentationIOS,
                    title: 'Add Routine',
                    cardOverlayEnabled: true,
                    headerShown: false,
                    gestureEnabled: true,
                }}
            />
            <HomeStack.Screen
                name="ProfilePage"
                component={ProfilePage}
                initialParams={{ updateUserId: route.params.updateUserId }}
                options={{
                    title: 'Profile',
                }}
            />
        </HomeStack.Navigator>
    );
};

const LoginStack = createStackNavigator();
export const LoginStackScreen = ({ route, navigation }): JSX.Element => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="LoginPage"
                component={LoginPage}
                initialParams={{
                    updateUserId: route.params.updateUserId,
                }}
            />
        </LoginStack.Navigator>
    );
};
