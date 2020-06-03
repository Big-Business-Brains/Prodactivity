import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './components/pages/HomePage';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Alert, Text } from 'react-native';
import AddRoutinePage from './components/pages/AddRoutinePage';
import LoginPage from './components/pages/LoginPage';
import SplashPage from './components/pages/SplashPage';
import AuthenticationService from './helpers/AuthenticationService';
import { UserContextProvider, UserContext } from './application/Contexts';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="HomePage"
                component={HomePage}
                options={({ navigation, route }) => ({
                    title: 'Home',
                    headerLeft: () => <Button onPress={() => Alert.alert('This is a button!')} title="Profile" />,
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
        </HomeStack.Navigator>
    );
}

const LoginStack = createStackNavigator();
function LoginStackScreen(setUserId: (userId: string) => void) {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="LoginPage"
                component={LoginPage}
                initialParams={{ passUserId: setUserId }}
                options={({ route, navigation }) => ({
                    title: 'Login',
                })}
            />
        </LoginStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const App: () => React.ReactNode = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [userId, setUserId] = useState<string>('not working');

    const updateUserId = (userId: string) => {
        setUserId(userId);
        console.log(userId);
    };

    useEffect(() => {
        AuthenticationService.authenticateUser().then(authenticated => {
            setIsAuthenticated(false);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <SplashPage />;
    }

    return (
        <>
            <NavigationContainer>
                <UserContext.Provider value={{ user: { userId: userId } }}>
                    {/* <Text> { user.user.userId } </Text>
                <Text> { userId } </Text> */}
                    <UserContext.Consumer>
                        {user =>
                            isAuthenticated ? (
                                <Tab.Navigator>
                                    <Tab.Screen name="Home" component={HomeStackScreen} />
                                    <Tab.Screen name="Events" component={HomeStackScreen} />
                                </Tab.Navigator>
                            ) : (
                                <>
                                    <Text>{user.user.userId}</Text>
                                    {LoginStackScreen(setUserId)}
                                </>
                            )
                        }
                    </UserContext.Consumer>
                </UserContext.Provider>
            </NavigationContainer>
        </>
    );
};

export default App;
