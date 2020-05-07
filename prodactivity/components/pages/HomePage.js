import React, { useState, useEffect } from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import RoutineView from '../views/routines/RoutineView';
import RoutineManager from '../../managers/RoutineManager';

export default function HomePage({navigation}) {

    const [routines, setRoutines] = useState([]);
    routineManager = new RoutineManager()

    useEffect(() => {
        routineManager.getRoutine('46AD3ADA-089C-4A9B-93E5-E370774ABD08').then(routine => {
            setRoutines([routine]);
        })
    }, [])
    
    return (
        <View>
        <FlatList
            data={routines}
            renderItem={({ item }) => <RoutineView title={item.name}/>}
            keyExtractor={(item, index) => index.toString()}
        / >
        </View>
    );
}