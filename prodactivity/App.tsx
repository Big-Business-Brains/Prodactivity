import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './components/pages/HomePage';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Alert } from 'react-native'
import AddRoutinePage from './components/pages/AddRoutinePage';
import LoginPage from './components/pages/LoginPage';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomePage" component={HomePage} options={({ navigation, route }) => ({
                title: 'Home',
                headerLeft: () => (
                    <Button onPress={() => Alert.alert('This is a button!')} title="Profile" />
                ),
                headerRight: () => (
                    <Button onPress={() => navigation.navigate("AddRoutinePage")} title="+" />
                ),
            })} />
            <HomeStack.Screen name="AddRoutinePage" component={AddRoutinePage} options={{
                title: 'Add Routine',
            }} />
        </HomeStack.Navigator>
    );
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name="LoginPage" component={LoginPage} options={({ navigation, route }) => ({
                title: 'Login',
            })} />
        </LoginStack.Navigator>
    );
}
    
const Tab = createBottomTabNavigator();

const App: () => React.ReactNode = () => {
    return (
        <>
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Login" component={LoginStackScreen} />
                <Tab.Screen name="Home" component={HomeStackScreen} />
                <Tab.Screen name="Events" component={HomeStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
        </>
    );
};
        
 export default App;
        