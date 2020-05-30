import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Button } from 'react-native';
import AuthenticationManager from '../../managers/AuthenticationManager';
import AuthenticationViewModel from '../../models/AuthenticationViewModel';
import { TextField } from 'react-native-material-textfield';
import KeychainHelper from '../../helpers/KeychainHelper';
import { TokenType } from '../../application/Enums';

export default function LoginPage() {

    const [email, onChangeEmail] = useState<string>('Email...');
    const [password, onChangePassword] = useState<string>('Password...');

    var authenticationManager: AuthenticationManager = new AuthenticationManager();

    useEffect(() => {
    }, [])

    const onSaveSubmit = async () => {
        var authenticationViewModel = await authenticationManager.signIn(email, password)
        KeychainHelper.storeToken(authenticationViewModel?.accessToken ?? "", TokenType.AccessToken);
        KeychainHelper.storeToken(authenticationViewModel?.refreshToken ?? "", TokenType.RefreshToken);
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
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
        backgroundColor: "white",
    },
});