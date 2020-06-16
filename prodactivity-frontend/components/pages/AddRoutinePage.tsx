import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import RoutineView from '../views/routines/RoutineView';
import RoutineManager from '../../managers/RoutineManager';
import RoutineViewModel from '../../models/RoutineViewModel';

const AddRoutinePage = () => {
    var routineManager: RoutineManager = new RoutineManager();
    const [routineName, setRoutineName] = React.useState<string>('');

    const formatText = (text: string) => {
        return text.replace(/[^+\d]/g, '');
    };

    return (
        <View style={styles.container}>
            <TextField label="Routine Name" onChangeText={setRoutineName} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default AddRoutinePage;
