import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SelectableCircleView } from '..';

interface WeeklyProps {
    onChange: (weeklyValues: string[]) => void;
}

/**
 * Displays a list of selectable weekdays
 * @param props
 */
const WeeklyView = (props: WeeklyProps): JSX.Element => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [selectedDays, setSelectedDays] = React.useState<string[]>([]);

    /**
     * Adding/removing a selected weekday
     * @param day The day to add/remove
     */
    const onPressWeekday = (day: string): void => {
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
                {weekdays.map((weekday) => (
                    <SelectableCircleView
                        style={styles.selectableView}
                        title={weekday.substring(0, 2)}
                        onPress={onPressWeekday}
                    />
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
    selectableView: {
        margin: 10,
    },
});

export default WeeklyView;