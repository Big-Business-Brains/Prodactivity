import React from 'react';
import { Button, Alert } from 'react-native';
import HomePage from '../../components/pages/HomePage';
import { createStackNavigator } from '@react-navigation/stack';
import AddRoutinePage from '../../components/pages/AddRoutinePage';
import LoginPage from '../../components/pages/LoginPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilePage from '../../components/pages/ProfilePage';

/** @returns {JSX.Element} The navigation stack for the tab view */
const Tab = createBottomTabNavigator();
export function TabStackNavigator({ route, navigation }) {
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
}

const HomeStack = createStackNavigator();
export function HomeStackScreen({ route, navigation }) {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="HomePage"
                component={HomePage}
                initialParams={{ updateUserId: route.params.updateUserId }}
                options={() => ({
                    headerLeft: () => <Button onPress={() => navigation.navigate('ProfilePage')} title="Profile" />,
                    headerRight: () => <Button onPress={() => navigation.navigate('AddRoutinePage')} title="+" />,
                })}
            />
            <HomeStack.Screen
                name="AddRoutinePage"
                component={AddRoutinePage}
                options={{
                    title: 'Add Routine',
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
}

const LoginStack = createStackNavigator();
export function LoginStackScreen({ route, navigation }) {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="LoginPage"
                component={LoginPage}
                initialParams={{
                    updateUserId: route.params.updateUserId,
                }}
                options={({ route, navigation }) => ({
                    title: 'Login',
                    animationTypeForReplace: route.params.isAuthenticated ? 'push' : 'pop',
                })}
            />
        </LoginStack.Navigator>
    );
}
