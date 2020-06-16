import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RoutineView from '../views/routines/RoutineView';
import RoutineListView from '../views/routines/RoutineListView';
import RoutineManager from '../../managers/RoutineManager';
import RoutineViewModel from '../../models/RoutineViewModel';
import AuthenticationManager from '../../managers/AuthenticationManager';

const HomePage = () => {
    const [routines, setRoutines] = useState<RoutineViewModel[]>([]);
    var routineManager = new RoutineManager();
    var authManager = new AuthenticationManager();

    useEffect(() => {}, []);

    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            <RoutineListView routines={routines} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default HomePage;
