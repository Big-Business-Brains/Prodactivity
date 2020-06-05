import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import AuthenticationManager from '../../managers/AuthenticationManager';

export default function ProfilePage({ route, navigation }: { route: any; navigation: any }) {
    var authManager = new AuthenticationManager();
    const updateUserId = route.params.updateUserId;

    useEffect(() => {}, []);

    const onLogout = async () => {
        await authManager.removeAuthenticationTokens();
        updateUserId('');
    };

    return (
        <View style={styles.container}>
            <Button onPress={onLogout} title="Sign Out" color="#841584" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
