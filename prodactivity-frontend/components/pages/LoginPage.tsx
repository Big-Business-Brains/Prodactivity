import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AuthenticationManager from '../../managers/AuthenticationManager';
import AuthenticationViewModel from '../../models/AuthenticationViewModel';
import { TextField } from 'react-native-material-textfield';
import KeychainHelper from '../../helpers/KeychainHelper';
import { TokenType } from '../../application/Enums';
import AuthenticationService from '../../helpers/AuthenticationService';

export default function LoginPage({ route, navigation }: { route: any; navigation: any }) {
    const [email, onChangeEmail] = useState<string>('Email...');
    const [password, onChangePassword] = useState<string>('Password...');
    const [confirmPassword, onChangeConfirmPassword] = useState<string>('');
    const [firstName, onChangeFirstName] = useState<string>('');
    const [lastName, onChangeLastName] = useState<string>('');
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    var authenticationManager: AuthenticationManager = new AuthenticationManager();

    useEffect(() => {
    }, []);

    const onFinish = async () => {
        const updateUserId = route.params.updateUserId;
        let authenticationResult = isSignUp ? await authenticationManager.signUp(email, password, firstName, lastName) : await authenticationManager.signIn(email, password);
        if (authenticationResult.result?.userId) {
            updateUserId(authenticationResult.result.userId);
        }

        if (authenticationResult.message) {
            authenticationManager.removeAuthenticationTokens();
            return Alert.alert('Error', authenticationResult.message);
        }
    };

    const onCreateAccount = async () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <TextField label="Email" onChangeText={onChangeEmail} error={'Email is a required field'} />
            <TextField label="Password" onChangeText={onChangePassword} />
            {isSignUp ? (
                <>
                <TextField label="Confirm Password" onChangeText={onChangeConfirmPassword} />
                <TextField label="First Name" onChangeText={onChangeFirstName} />
                <TextField label="Last Name" onChangeText={onChangeLastName} />
                </>
            ) : null}
            <Button onPress={onFinish} title={isSignUp ? "Sign Up" : "Sign In"} color="#841584" />
            <Button onPress={onCreateAccount} title={isSignUp ? "Login instead" : "No account? Create one"} color="#841584" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
    },
});
