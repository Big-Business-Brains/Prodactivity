import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashPage from './components/pages/SplashPage';
import AuthenticationService from './helpers/AuthenticationService';
import { UserContext } from './application/Contexts';
import { TabStackNavigator, LoginStackScreen } from './application/navigation/StackNavigators';

const AppStack = createStackNavigator();
const App: () => React.ReactNode = () => {
    const userContext = React.useContext(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>(userContext.user.userId);

    useEffect(() => {
        AuthenticationService.authenticateUser().then(authenticated => {
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        });
    }, [userId]);

    const updateUserId = (_userId: string) => {
        setUserId(_userId);
    };

    if (isLoading) {
        return <SplashPage />;
    }

    return (
        <>
            <NavigationContainer>
                <UserContext.Provider value={{ user: { userId: userId } }}>
                    <AppStack.Navigator headerMode="none">
                        {isAuthenticated ? (
                            <AppStack.Screen
                                name="Home"
                                component={TabStackNavigator}
                                initialParams={{ updateUserId: updateUserId }}
                            />
                        ) : (
                            <AppStack.Screen
                                name="Login"
                                component={LoginStackScreen}
                                initialParams={{ updateUserId: updateUserId, isAuthenticated: isAuthenticated }}
                            />
                        )}
                    </AppStack.Navigator>
                </UserContext.Provider>
            </NavigationContainer>
        </>
    );
};

export default App;
