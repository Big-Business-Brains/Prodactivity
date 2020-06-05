import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import RoutineView from '../views/routines/RoutineView';
import RoutineManager from '../../managers/RoutineManager';
import RoutineViewModel from '../../models/RoutineViewModel';

export default function AddRoutinePage() {
    var routineManager: RoutineManager = new RoutineManager();

    var fieldRef = React.createRef();

    const onSubmit = () => {
        let { current: field } = fieldRef;
    };

    const formatText = (text: string) => {
        return text.replace(/[^+\d]/g, '');
    };

    return (
        <View style={styles.container}>
            <TextField label="Routine Name" onSubmitEditing={onSubmit} ref={fieldRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
