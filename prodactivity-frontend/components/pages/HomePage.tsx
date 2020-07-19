import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import RoutineListView from '../views/routines/RoutineListView';
import RoutineManager from '../../managers/RoutineManager';
import RoutineDTO from '../../models/RoutineDTO';

const HomePage = () => {
    const [routines, setRoutines] = useState<RoutineDTO[]>([]);
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
