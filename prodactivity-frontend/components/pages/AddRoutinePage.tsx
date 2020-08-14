import React from 'react';
import { StyleSheet, View, Button, Text, Pressable } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { WeeklyView, MonthlyView } from '../views';
import RoutineManager from '../../managers/RoutineManager';
import RoutineDTO from '../../models/RoutineDTO';
import { RoutineAddRequest } from '../../models';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-community/picker';
import { ScrollView } from 'react-native-gesture-handler';
import SharedStyles from '../../SharedStyles';

const AddRoutinePage = ({ route, navigation }: { route: any; navigation: any }): JSX.Element => {
    const routineManager: RoutineManager = new RoutineManager();
    const frequencyValues: { [value: string]: string } = { daily: 'Day', weekly: 'Week', monthly: 'Month' };

    const [routineName, setRoutineName] = React.useState<string>('');
    const [routineInterval, setRoutineInterval] = React.useState<number>(1);
    const [routineFrequency, setRoutineFrequency] = React.useState<string>('daily');
    const [selectedDates, setSelectedDates] = React.useState<string[]>([]);

    const onSubmit = async (): Promise<void> => {
        const routineAddRequest: RoutineAddRequest = {
            name: routineName,
            recurrenceRule: {
                dTStart: new Date(),
                freq: routineFrequency,
                interval: 1,
                byMonth: [],
                byMonthDay: routineFrequency === 'monthly' ? selectedDates.map((value) => parseInt(value, 10)) : [],
                byWeekday:
                    routineFrequency === 'weekly' ? selectedDates.map((value) => getWeeklyIntegerValue(value)) : [],
            },
        };

        const response = await routineManager.addRoutine(routineAddRequest);
        console.log(response);
    };

    const getWeeklyIntegerValue = (day: string): number => {
        return (
            ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].findIndex(
                (weekday) => day === weekday.substring(0, 2),
            ) + 1
        );
    };

    const frequencyView = (): JSX.Element => {
        switch (routineFrequency) {
            case 'daily':
                return <></>;
            case 'weekly':
                return <WeeklyView onChange={setSelectedDates} />;
            case 'monthly':
                return <MonthlyView onChange={setSelectedDates} />;
            default:
                return <></>;
        }
    };

    /** Generate list of integer picker items up to specified count */
    const generateIntervalPickerItems = (count: number): JSX.Element[] => {
        return [...Array(count).keys()].map((value) => (
            <Picker.Item label={(value + 1).toString()} value={value + 1} />
        ));
    };

    const getFrequencyTitleText = (type: string): string => {
        return routineInterval === 1 ? frequencyValues[type] : frequencyValues[type] + 's';
    };

    const getSelectedDateTexts = (): string => {
        switch (routineFrequency) {
            case 'daily':
                return ' ';
            case 'weekly':
                return selectedDates.length > 0 ? ' ' : 'Select the days that this routine repeats';
            case 'monthly':
                return selectedDates.length > 0 ? ' ' : 'Select the dates that this routine repeats';
            default:
                return ' ';
        }
    };

    return (
        <View style={styles.container}>
            {/* Necessary padding above scrollview to keep swipe to dismiss */}
            <View style={{ height: 10 }} />
            <ScrollView contentContainerStyle={[styles.scrollView]}>
                <Text style={styles.pageHeader}>Add Routine</Text>
                <TextField containerStyle={styles.textfield} label="Routine name..." onChangeText={setRoutineName} />
                <Text style={styles.subHeader}>Repeat</Text>
                <Text>
                    Every {routineInterval} {getFrequencyTitleText(routineFrequency)}
                    {selectedDates.length !== 0 ? ' on ' + selectedDates.join(', ') : ''}
                </Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={routineInterval}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => {
                            setRoutineInterval(itemValue as number);
                        }}>
                        {generateIntervalPickerItems(30)}
                    </Picker>
                    <Picker
                        selectedValue={routineFrequency}
                        style={styles.picker}
                        itemStyle={{}}
                        onValueChange={(itemValue, itemIndex) => {
                            setRoutineFrequency(itemValue as string);
                            setSelectedDates([]);
                        }}>
                        <Picker.Item label={getFrequencyTitleText('daily')} value="daily" />
                        <Picker.Item label={getFrequencyTitleText('weekly')} value="weekly" />
                        <Picker.Item label={getFrequencyTitleText('monthly')} value="monthly" />
                    </Picker>
                </View>
                <Text>{getSelectedDateTexts()}</Text>
                {frequencyView()}
                <View style={styles.bottomView}>
                    <Text onPress={onSubmit} style={styles.doneButton}>
                        Add Routine
                    </Text>
                    <Button
                        onPress={() => {
                            navigation.goBack();
                        }}
                        title="Cancel"
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const spacingStyle = {
    marginBottom: 30,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flexGrow: 1,
        padding: 30,
    },
    pageHeader: {
        ...SharedStyles.pageHeader,
    },
    subHeader: {
        ...SharedStyles.subHeader,
        marginBottom: 15,
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    textfield: {
        ...spacingStyle,
    },
    pickerContainer: {
        ...spacingStyle,
        flexDirection: 'row',
    },
    picker: {
        flex: 0.5,
    },
    doneButton: {
        height: 40,
        borderRadius: 5,
        backgroundColor: 'rgb(0,150,136)',
        overflow: 'hidden',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default AddRoutinePage;
