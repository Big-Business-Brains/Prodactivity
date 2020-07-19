import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { WeeklyView } from '../views';
import RoutineManager from '../../managers/RoutineManager';
import RoutineDTO from '../../models/RoutineDTO';
import { RoutineAddRequest } from '../../models';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-community/picker';

const AddRoutinePage = ({ route, navigation }: { route: any; navigation: any }) => {
    var routineManager: RoutineManager = new RoutineManager();
    const frequencyValues: { [value: string]: string } = { daily: 'Day', weekly: 'Week', monthly: 'Month' };

    const [routineName, setRoutineName] = React.useState<string>('');
    const [routineInterval, setRoutineInterval] = React.useState<number>(1);
    const [routineFrequency, setRoutineFrequency] = React.useState<string>('daily');
    const [selectedDates, setSelectedDates] = React.useState<string[] | number[]>([]);

    const onSubmit = async () => {
        const routineAddRequest: RoutineAddRequest = {
            name: 'testname',
            recurrenceRule: {
                dTStart: new Date(),
                freq: 'daily',
                interval: 1,
                byMonth: [],
                byMonthDay: [],
                byWeekday: [],
            },
        };

        const response = await routineManager.addRoutine(routineAddRequest);
        console.log(response);
    };

    const frequencyView = () => {
        switch (routineFrequency) {
            case 'daily':
                return <></>;
            case 'weekly':
                return <WeeklyView onChange={setSelectedDates} />;
            case 'monthly':
                return <WeeklyView onChange={setSelectedDates} />;
            default:
                return <WeeklyView onChange={setSelectedDates} />;
        }
    };

    /** Generate list of integer picker items up to specified count */
    const generateIntervalPickerItems = (count: number) => {
        return [...Array(count).keys()].map(value => <Picker.Item label={(value + 1).toString()} value={value + 1} />);
    };

    const getFrequencyTitleText = (type: string) => {
        return routineInterval == 1 ? frequencyValues[type] : frequencyValues[type] + 's';
    };

    const getSelectedDateTexts = () => {
        switch (routineFrequency) {
            case 'daily':
                return ' ';
            case 'weekly':
                return selectedDates.length > 0 ? ' ' : 'Select the days that this routine repeats';
            case 'monthly':
                return ' ';
            default:
                return ' ';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageHeader}>Add Routine</Text>
            <TextField containerStyle={styles.textfield} label="Routine name..." onChangeText={setRoutineName} />
            <Text style={styles.subHeader}>Repeat</Text>
            {/* <View style={styles.divider} /> */}
            <Text>
                Every {routineInterval} {getFrequencyTitleText(routineFrequency)}
                {selectedDates.length != 0 ? ' on ' + selectedDates.join(', ') : ''}
            </Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={routineInterval}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setRoutineInterval(itemValue as number)}>
                    {generateIntervalPickerItems(30)}
                </Picker>
                <Picker
                    selectedValue={routineFrequency}
                    style={styles.picker}
                    itemStyle={{}}
                    onValueChange={(itemValue, itemIndex) => setRoutineFrequency(itemValue as string)}>
                    <Picker.Item label={getFrequencyTitleText('daily')} value="daily" />
                    <Picker.Item label={getFrequencyTitleText('weekly')} value="weekly" />
                    <Picker.Item label={getFrequencyTitleText('monthly')} value="monthly" />
                </Picker>
            </View>
            {/* <View style={styles.divider} /> */}
            <Text>{getSelectedDateTexts()}</Text>
            {frequencyView()}
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                {/* <Pressable onPress={onSubmit}>
                    <Text style={styles.doneButton}>Add Routine</Text>
                </Pressable> */}
            </View>
        </View>
    );
};

const spacingStyle = {
    marginBottom: 30,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: 'white',
    },
    pageHeader: {
        ...spacingStyle,
        fontWeight: 'bold',
        fontSize: 22,
    },
    subHeader: {
        ...spacingStyle,
        fontWeight: 'bold',
        fontSize: 16,
    },
    textfield: {
        ...spacingStyle,
    },
    divider: {
        ...spacingStyle,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    pickerContainer: {
        ...spacingStyle,
        flexDirection: 'row',
    },
    picker: {
        flex: 0.5,
    },
    doneButton: {
        backgroundColor: 'rgb(0,150,136)',
    },
});

export default AddRoutinePage;
