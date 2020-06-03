import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AuthenticationManager from '../../managers/AuthenticationManager';
import AuthenticationViewModel from '../../models/AuthenticationViewModel';
import { TextField } from 'react-native-material-textfield';
import KeychainHelper from '../../helpers/KeychainHelper';
import { TokenType } from '../../application/Enums';
import AuthenticationService from '../../helpers/AuthenticationService';

export default function LoginPage({ route, navigation } : {route: any, navigation: any}) {

    const passUserId = route.params.passUserId;
    const [email, onChangeEmail] = useState<string>('Email...');
    const [password, onChangePassword] = useState<string>('Password...');

    var authenticationManager: AuthenticationManager = new AuthenticationManager();

    useEffect(() => {
        AuthenticationService.authenticateUser()
        .then(authenticated => console.log(authenticated));
    }, [])

    const onSaveSubmit = async () => {
        let authenticationResult = await authenticationManager.signIn(email, password);
        passUserId("");
        if (authenticationResult.message) {
            return Alert.alert("Error", authenticationResult.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
            <TextField 
                label='Email'
                onChangeText={onChangeEmail} 
                error={"Email is a required field"}/>
            <TextField 
                label='Password'
                onChangeText={onChangePassword} />
            <Button
                onPress={onSaveSubmit}
                title="Sign In"
                color="#841584" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "white",
    },
});