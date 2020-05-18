import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import RoutineView from '../views/routines/RoutineView';
import RoutineManager from '../../managers/RoutineManager';
import RoutineViewModel from '../../models/RoutineViewModel';

export default function HomePage() {

    const [routines, setRoutines] = useState<RoutineViewModel[]>([]);
    var routineManager = new RoutineManager()

    useEffect(() => {
        routineManager.getRoutines().then(routines => {
            if (routines) {
                setRoutines(routines);
            }
        })
    }, [])
    
    return (
        <View style={styles.container}>
            <FlatList
                data={routines}
                renderItem={({ item }) => <RoutineView title={item.name}/>}
                keyExtractor={(item, index) => index.toString()}
            / >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});