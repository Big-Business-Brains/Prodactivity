import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import WeekdayView from './WeekdayView';

type WeeklyProps = {
    onChange: (weeklyValues: string[]) => void;
};

/**
 * Displays a list of selectable weekdays
 * @param props
 */
const WeeklyView = (props: WeeklyProps) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);

    /**
     * Adding/removing a selected weekday
     * @param day The day to add/remove
     */
    const onPressWeekday = (day: string) => {
        let updatedValues = selectedDays;

        if (selectedDays.includes(day)) {
            // Removing a weekday
            updatedValues = updatedValues.filter(item => item != day);
        } else {
            // Adding a weekday
            updatedValues = updatedValues.concat([day]);
        }

        setSelectedDays(updatedValues);
        props.onChange(updatedValues);
    };

    return (
        <>
            <View style={styles.container}>
                {weekdays.map(weekday => (
                    <WeekdayView name={weekday} onPress={onPressWeekday} />
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
    },
});

export default WeeklyView;
