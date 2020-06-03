import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import RoutineView from '../views/routines/RoutineView';
import RoutineListView from '../views/routines/RoutineListView';
import RoutineManager from '../../managers/RoutineManager';
import RoutineViewModel from '../../models/RoutineViewModel';
import AuthenticationManager from '../../managers/AuthenticationManager';

export default function HomePage() {
    const [routines, setRoutines] = useState<RoutineViewModel[]>([]);
    var routineManager = new RoutineManager();
    var authManager = new AuthenticationManager();

    useEffect(() => {
        authManager.signIn('rileydnorris+10@gmail.com', 'Riley123^').then(authViewModel => {
            console.log(authViewModel);
        });
    }, []);

    return (
        <View style={styles.container}>
            <RoutineListView routines={routines} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
