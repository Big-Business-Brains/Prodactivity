import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import RoutineListView from '../views/routines/RoutineListView';
import RoutineManager from '../../managers/RoutineManager';
import RoutineViewModel from '../../models/RoutineViewModel';

const HomePage = () => {
    const [routines, setRoutines] = useState<RoutineViewModel[]>([]);
    var routineManager = new RoutineManager();

    useEffect(() => {
        routineManager.getRoutines().then(response => {
            if (response.result) {
                setRoutines(response.result);
            } else {
                return Alert.alert('Error', response.message);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
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
