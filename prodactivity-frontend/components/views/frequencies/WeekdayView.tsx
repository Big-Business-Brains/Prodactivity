import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

type WeekdayProps = {
    name: string;
    onPress: (day: string) => void;
};

/**
 * Displays a single selectable weekday
 * @param props
 */
const WeekdayView = (props: WeekdayProps) => {
    const [isSelected, setIsSelected] = React.useState<boolean>(false);

    const onPressWeekday = () => {
        setIsSelected(!isSelected);
        props.onPress(props.name);
    };

    return (
        <Text
            onPress={onPressWeekday}
            style={[styles.weekday, isSelected ? styles.weekdaySelected : styles.weekdayDeselected]}>
            {props.name.substring(0, 2)}
        </Text>
    );
};

const styles = StyleSheet.create({
    weekday: {
        width: 35,
        height: 35,
        lineHeight: 32,
        marginHorizontal: 10,
        borderRadius: 35 / 2,
        borderColor: 'gray',
        borderWidth: 1,
        overflow: 'hidden',
        textAlign: 'center',
    },
    weekdayDeselected: {},
    weekdaySelected: {
        backgroundColor: 'gray',
    },
});

export default WeekdayView;
