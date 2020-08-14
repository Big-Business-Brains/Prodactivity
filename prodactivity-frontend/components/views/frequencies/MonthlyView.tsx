import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SelectableCircleView } from '..';

interface MonthlyProps {
    onChange: (weeklyValues: string[]) => void;
}

/**
 * Displays a list of selectable weekdays
 * @param props
 */
const WeeklyView = (props: MonthlyProps): JSX.Element => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);

    /**
     * Adding/removing a selected weekday
     * @param day The day to add/remove
     */
    const onPressDay = (day: string): void => {
        let updatedValues = selectedDays;

        if (selectedDays.includes(day)) {
            // Removing a weekday
            updatedValues = updatedValues.filter((item) => item !== day);
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
                {[...Array(31).keys()].map((value) => (
                    <SelectableCircleView
                        style={styles.selectableView}
                        title={(value + 1).toString()}
                        onPress={onPressDay}
                    />
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        lineHeight: 40,
    },
    selectableView: {
        margin: 10,
    },
});

export default WeeklyView;
